<h1><a href="/articles/5-world-simulator">World Simulator</a></h1>

#### January 24, 2019

<blockquote>
<p>All things must pass.</p>
<p class="author">George Harrison</p>
</blockquote>


Recently I thought: _I’d like to make something that simulates the world_. A computer program, but one simple enough that I could write it in a short time. Maybe this would help me to understand a little about how the world works. So I thought about the rules of the world which my simulator should follow. 

First, as a simulation of the whole world, it must represent **all things**.

Second, as a simulation of how the world changes, it must represent the **passing of those things**.

Then I wrote a simple program, called the _world simulator_, which obeys these rules. You can see it at [w04ld.com](http://w04ld.com), and it works like this:

* Every time someone views the world simulator, it moves another step towards its destruction.

* The world simulator starts with its memory uninitialized, so it displays nothing to its first viewer. You may think of this output as emptiness and void, like the beginning of the universe. 

* After this, the world simulator loads a file from disk. The file contains a shuffled list of all, or almost all, nouns in the English language. This represents all things that will ever exist.

* The next viewer sees the word at the top of the list, representing the life of that thing. The world simulator deletes this word from the file, representing its destruction. This process repeats, consuming things from the list one by one.

* The list has no duplicate items, so each viewer becomes the first and last person to see that thing. The world simulator imposes no limits on how many things a single person may view and destroy. It produces a new thing each time, and it produces it exactly once.

* When the list of things has nothing left on it, the world simulator crashes.

I also wanted to write the program in a language that has strong opinions on when and how data in a program exists, so I chose Rust. One could write a similar program in other languages, but Rust enforces a certain style and correctness that seems appropriate for this task. You can read the full source code for the world-simulator [here](https://github.com/tragle/world-simulator).

Let’s look at `main.rs` line-by-line.

```rust
extern crate actix_web;

use actix_web::{http, server, App, HttpRequest, HttpResponse};
use std::fs::File;
use std::io::prelude::*;
use std::io::{self, BufReader, SeekFrom};
use std::sync::{mpsc, Arc, Mutex};
use std::{env, fs, thread};
```

First, we set up library imports. All but Actix Web come from the standard library. Actix gives us a simple web server with which the world simulator will interface with people in the real world.


```rust
struct AppState {
    channel: mpsc::Sender<usize>,
    word: Arc<Mutex<String>>,
}
```

Actix responds to requests from the web asynchronously using an actor-based model. The `AppState` struct contains global data that each Actix worker will have available to it. 

The `channel` field holds a one-way messaging message channel through which Actix will communicate to another thread. 

The `word` field holds the next word that the world simulator will display. In order to prevent multiple areas of the code from attempting to access the word simultaneously, a mutex holds the word behind a lock, and in order to give multiple areas of the code memory-safe access to the mutex, an Arc holds the mutex. The Arc (atomic reference count) will keep track of references to the mutex across all threads, so the program can free memory when references go out of scope.

Next comes the request handler for the Actix server process.

```rust
fn index(req: &HttpRequest<AppState>) -> HttpResponse {
    let channel = &req.state().channel;
    channel.send(1).unwrap();
```

Each time a visitor looks at the world simulator, Actix sends the network request into a copy of this function, and the function returns a response which Actix will serve back to the visitor. The request contains a reference to the `AppState` struct described earlier, and from that, the handler function will get a reference to the messaging channel, and send the number `1` through it. Later we’ll inspect the other end of the channel, and see where the `1` goes.

```rust
  let word = &req.state().word.lock().unwrap().clone();
  let style = "body { 
      font-family: 'Charter', Palatino, serif; 
      font-size: 72px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin: 0;
  }";
  let html = format!(
      "<html>
          <head>
              <title>world simulator</title>
              <style>{}</style>
          </head>
      <body>
          {}
      </body>",
      style, word
  );
  HttpResponse::Ok().body(html)
}
```

After the handler has sent its message on the global messaging channel, it constructs a response. First, it attempts to retrieve the current word from the `AppData` struct by unlocking the mutex holding the word. Then it constructs an HTML response with the word inserted in the `body` of the markup, along with some styling to display the word on the center of the page. Then it returns this HTML string as the body of an HTTP response.

```rust

fn main() -> io::Result<()> {
  let filename = env::args()
    .nth(1)
    .unwrap_or_else(|| "world.txt".to_string());
  let port = env::args()
    .nth(2)
    .unwrap_or_else(|| "3000".to_string())
    .parse()
    .expect("Could not parse port");
  let world = filename.clone();
```

Next comes the `main` function, the entry point to the program. First, we get the location of the world file and the port to serve HTTP responses from via command-line arguments, supplying default values if the program starts without parameters passed in. 

```
let mutex = Arc::new(Mutex::new("".to_owned()));
let mutex_copy = mutex.clone();
let (tx, rx) = mpsc::channel();
```

We instantiate the mutex which will hold the current word, initializing it to an empty string. We then create the channel from which the request handler will send messages, with references to both the transmitting and receiving ends of the channel.

```rust
thread::spawn(move || loop {
  let _r = rx.recv().unwrap();
  let mut contents = vec![];
```

Now we spin up a new thread to handle accessing and updating the world file. The thread takes a closure function, which runs a block of code in a loop each time it receives a message on the `rx` end of the messaging channel. In this way, the Actix handler function can signal (by sending the number `1`, or any value at all) that the program should destroy the last word and generate a new one. The `contents` variable will act as a temporary area to hold the contents of the world file before updating it.

```rust
{
  let source = File::open(&world).expect("No world");
  let mut file_reader = BufReader::new(&source);
  let mut line_buf = String::new();
  let _ = file_reader.read_line(&mut line_buf);
  let len = &line_buf.len();
```

At this point we start reading the world file, and so we open a new block to ensure that Rust automatically drops the file handle when the reference to it goes out of scope, allowing us to immediately write to the file after dropping the handle. We create a `line_buf` variable to buffer the current line, and get the length of the buffer so we know how far to advance through the file to reach the next word. 

```rust
if line_buf.is_empty() {
    fs::remove_file(&world).expect("Can't remove world");
    panic!();
}
```

If the buffer contains nothing, we have reached the end of the file. We delete the world file and crash the program.

```rust
*(mutex_copy.lock().unwrap()) = line_buf;
```

Otherwise, we unlock the mutex holding the current word, and replace it with the contents of the buffer.

```rust
  file_reader
      .seek(SeekFrom::Start(*len as u64))
      .expect("Can't seek world");
  file_reader
      .read_to_end(&mut contents)
      .expect("Can't read world");
}
```

Now we complete file-reading operations, saving the contents of the file starting from the end of the first line to the end of the file, into the `contents` variable we set up earlier, effectively chopping off the first line.

```rust
  let mut destination = File::create(&world).expect("Can't create world");
  let _ = destination.write(&contents);
});
```

Finally we overwrite the world file with the new contents.

```rust
  println!("Starting with {} on port {}", filename, port);

  server::new(move || {
      let sender = mpsc::Sender::clone(&tx);
      App::with_state(AppState {
          channel: sender,
          word: mutex.clone(),
      })
      .resource("/", |r| r.method(http::Method::GET).f(index))
  })
  .bind(("0.0.0.0", port))
  .expect("Could not bind to port")
  .run();

  Ok(())
}
```

Back in the main thread we can start the web server, passing in the handler, instantiating an initial `AppState` struct, and binding to the network `port` provided in the arguments.

Rust’s safety features will ensure that the program, once started, will continue to run unless one of the error conditions explicitly called out in the code, such as filesystem I/O errors, occurs. It will handle concurrent access to mutable data, and updating a single file from multiple requests, in a predictable manner. If everything goes well, it will crash explicitly and intentionally at the end of the world’s life.

##### TR

<footer>
<a href="/articles/4-post-mortem">previous</a>
<a id="contact" href="mailto:tragle@gmail.com">contact</a>
</footer>
