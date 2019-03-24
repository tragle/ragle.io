# First, do no harm

#### March 24, 2019

<blockquote>
<p>A user interface should be so simple that a beginner in an emergency can understand it within ten seconds.</a>
<p class="author">Ted Nelson</p>
</blockquote>

Let’s talk about ethics in software development.

Ideally we want developers to continually evaluate the purpose of the things they build, and to not participate in building things that will hurt someone. Really, they should take a more active role, and prevent others from inflicting the damage, if possible, since not everyone will act ethically. But what difference will this make, if another developer will always pick up what the ethical developer refuses to touch?

Consider the Boeing 737 Max 8 airliner. In order to compete with the fuel efficiency of the latest Airbus A320, Boeing added larger, more efficient engines to the 737. The size of the engines requires their placement in front of the wing, which causes the aircraft to pitch up. 

<figure>
  <img src="/img/737_engine.jpg" alt="737 Max 8 Engine" />

  <figcaption>737 Max 8 Engine</figcaption>
</figure>

To counteract this inherent instability, software called the Maneuvering Characteristics Augmentation System (MCAS) automatically pushes the nose down, so that the plane does not stall. Unfortunately, the MCAS makes the decision to push the nose down based solely on the inputs from a pair of sensors, and if those sensors have problems, the MCAS can aggressively point the nose *to the ground*. 

We can write this logic in simple pseudocode:

```
mcas (angle_sensor_a, angle_sensor_b)
  if is_high (angle_sensor_a)
    point_nose_down()
  else if is_high (angle_sensor_b)
    point_nose_down()
  else
    continue
```

Worse, when pilots attempt to manually correct the issue by pulling on the yoke, the system fights them instead of accepting the input as an override. The pilots must identify the MCAS as the source of the problem, and shut it off.

If you rent a car, you can expect it to have a cruise control. And though the cruise control buttons on some cars have a more intuitive design that other cars, in all cases you can disengage the cruise control by tapping on the brake pedal. 

Imagine renting a car with an “augmented cruise control” which you cannot shut off except by pushing a special button on the dashboard. Imagine further that when this new cruise control results in fatal crashes, the manufacturer responds “our hearts go out to the families, but the drivers should have read the manual.” Boeing had a similar response after Lion Air 610 went down.

Because of its poorly-designed flight control system, two 737 Max 8’s have crashed in 6 months, killing hundreds of people. Boeing engineers have unquestionably hurt people. Whatever quality-control processes Boeing has in place, whatever engineering culture they have, one cannot deem adequate by any measure. 

As the largest aircraft manufacturer in the United States and one of the largest companies in the world, Boeing wields enormous wealth and power. The Federal Aviation Administration, which ostensibly ensures that aircraft meet safety standards, allows Boeing to “self-certify” under a special program. The aviation industry has thus achieved complete, and convenient, regulatory capture.

So what can we say about the ethical position of the Boeing software engineer? Because of the corrupting influence of money and power, in which their employer has pursued competitive advantage at the cost of safe design, using their influence in government to get an unsafe product to market quickly, the engineer has done harm — *even if they had nothing to do with the Max 8*. And not only has this engineer contributed to a harmful enterprise, they have contributed to a *shoddy* enterprise.

One can thus see in this disaster and others a direct link between unethical engineering practices and *low-quality products*. And here we see the answer to our question about the ethical developer. They make a difference precisely because they produce better work than their corrupted peers, and the more who follow this example, the less will become available to companies engaged in harming the world for profit. Some brilliant engineers will, no doubt, still serve the dark side. But let them know in full conscience the option they have chosen.

Software developers take no oath before releasing their creations into the world (a software engineering <a href="https://www.computer.org/education/code-of-ethics">Code of Ethics</a> does exist, however), and indeed much software clearly makes the world a worse place. When presented with some new project, I have sometimes asked the person on the other side of the table “would you call this thing a net positive for the world?” I have yet to receive a clear answer. Which begs the question, why bother?

Medicine has the handy rule of thumb, *primum non nocere* — “first, do no harm.” This seems like a low bar, but at least a logical baseline. A quick look at online job postings for software engineers makes me wonder how many companies clear this bar:

- ...“a funded and well-endorsed VR/AR/interactive live sports company.”
- ...“a $90 billion global financial services firm.”
- ...“a company trying to bridge the gap between marketers needs and the latest technology.”
- ...“customer engagement platform that delivers personalized messaging experiences across push, email, apps, and more.”
- ...“a digital engagement provider that helps the world’s leading brands show they care to the people who matter most.”
- ...“a leading equity crowdfunding platform.”

How much harm do the engineers in these companies do? Even the relatively harmless sports VR company probably has a monetization scheme involving augmented advertising of some sort. 

And what about advertising? How much harm to the world does advertising cause? Advertisers don’t makes bombs, right? According to the rule in medicine, it doesn’t matter — advertising definitely does *some* harm (how could polluting the public sphere in order to deceive the population into working for things they do not need in service to profiting others not cause harm?) so it does not clear the bar.

I like this kind of rule. Similar to the <a href="https://en.wikipedia.org/wiki/Bechdel_test">Bechdel test</a>, it gives a clear, unambiguous answer, on the spot. True, plenty of developers will rationalize their choice of employer by emphasizing all the *good* things their company does, or even less convincingly, of how they work with the most cutting-edge technology and with the nicest group of coworkers one could ask for. They will talk about pair coding on machine learning algorithms, but not about how they use them to build a better surveillance platform.

Every programming language has some notion of `true` and `false`. Most languages call these Boolean values, after the English logician George Boole. All logic in a program boils down to tests of values that produce Booleans. Much of the pleasure in programming derives, I think, from the act of constructing a world in which logic matters, where the laws of the program, once established, become unbreakable, lest the program crash.

A few language have a related idea, called an `Option`. If you have an `Option`, it means you must deal with the fact that you will have either `Some` thing, or `None`. This sounds to me a bit like the real world.

Let me tell you a long-winded story about the program that produces this blog. 

I write the articles in this blog using <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">markdown</a>, a simple set of conventions for formatting plain text. Many converters exist for markdown, so that one can produce from this simple text document a PDF file, for example, or an HTML document suitable for the web. 

Initially I wrote the engine that serves the blog using a simple <a href="https://nodejs.org/en/about/">Node</a> script. Every time someone requested a page from the blog, this Node script would take the corresponding markdown file, convert it to HTML, and send that to the browser. The web server thus performed a lot of unnecessary labor, since it had to go through this conversion process and create a new HTML file each time a browser requested a page. 

Additionally, the Node script provided no configuration settings, so every time I wrote a new article I would have to make numerous edits to existing articles, and the script itself, in order for navigation to work. I really wanted a program that would take all my markdown files and produce the entire site, all at once. I could then upload the files to a web server, which would take care of delivering the files to browsers without doing any extra work.

Programs like this definitely exist — search for <a href="https://duckduckgo.com/?q=static+site+generators">“static site generators”</a> — and I could have probably adapted one for my needs. But why not make my own? It would do exactly what I want, and nothing more. It would help me learn, and I would have fun writing it. I could adapt it over time as my needs changed.

I had, in other words, the `Option` to create my own tool. I could have `Some` custom-made static-site generator, or not. If I had `None`, then I’d have to deal with that by either getting a generic one off the shelf, or continue dealing with the Node script. If I had `Some` kind of custom tool, then I’d go down a different path, where I would use and maintain this tool, and share it with others. I chose the latter, wrote an initial implementation over a weekend, and called it <a href="https://www.urbandictionary.com/define.php?term=blarf">blarf</a>.

Rust has the `Option` type, so we can take a look at some code from <a href="https://docs.rs/blarf">blarf</a> (which I wrote in Rust) to see an example.

```
/// Parse title from markdown
///
/// Returns text of first top-level heading (like `# My first post`), or `None`

pub fn get_title(markdown: &str) -> Option<&str> {
    let pattern = "# ";
    let lines: Vec<&str> = markdown.split('\n').collect();
    for line in lines {
        if line.starts_with(&pattern) {
            let (_, title) = &line.split_at(pattern.len());
            return Some(title.trim());
        }
    }
    None
}
```

You can see in the first line of the function that it produces an `Option<&str>`, i.e. either `Some` string slice, or `None`. These two branches appear in the last few lines of the function, which returns either `Some(title.trim())` or `None`. (The `trim` method removes extra whitespace.) Whatever code calls `get_title` must handle both cases. The markdown file may have a title, or it might not.

In life and in code, we must deal in uncertainties. Does the Java consultant at a munitions testing outfit have the option to not write a database-migration job, since doing so would only further enable the ever-bloodier perpetuation of the by now fully entrenched military-industrial complex? If the consultant doesn’t complete the task, the company won’t have the job in a timely manner, and the consultant won’t have a job, period.

```
if Option<Job> == None {
  panic!("Need money!")
}
```

What will become of the Java consultant? They must find other options, but importantly, they have done no harm. And if they find an less obviously evil master, like a social media company, what then? You know the answer. 

Must the ethical programmer resort to writing free, homegrown, static site generators? What if neo-Nazis use the homegrown static site generator? Has the programmer done harm? Only if they have helped the neo-Nazis, which unless they’ve introduced special neo-Nazi features or personally instructed the neo-Nazis on how to use the software, they haven’t, any more than the road crew who paved the road on which the neo-Nazis drive their pickup trucks. 

But when money becomes involved, it becomes more difficult to clear the *primum non nocere* bar. The developer puts tools together to build a platform, and from the platform a business. As time goes on, money flows in, the company becomes larger and more powerful. The engineers put on their best dispassionate, scientific miens, but have become as corrupted as the rest of the company, who stroke their intellectual egos and bestow on them rec room furniture, healthy snacks, and other tacky perks. The distractions work.

```
fn do_something_shady() -> Option<Money> 
```

Boeing engineers undoubtedly have good intentions, and I understand their love of aviation and technology. My grandfather, who I admired and respected greatly, worked as an aeronautical engineer for a defense contractor. I loved to go to work with him, to get behind-the-scenes looks at Air Force bases across the country, to sit in F-16 cockpits, to talk to the pilots, to marvel at the power and grace of these amazing machines. Before age 10 I could identify by sight practically any military aircraft, and most airliners. At one point I dreamed of having a career as an Air Force pilot myself.

<figure>
  <img src="/img/4th_tac.jpg" alt="4th Tactical Fighter Squadron" />

  <figcaption>Patch from the <a href="https://en.wikipedia.org/wiki/4th_Fighter_Squadron">4<sup>th</sup> Tactical Fighter Squadron</a></figcaption>
</figure>

At that young age I didn’t fully understand the implications of going to war, I simply wanted to fly. And now I must reconcile my admiration of my grandfather with his choice to work in the defense industry. 

My family has a long history of military service, and I accept that not everyone has the streak of pacifistic idealism that I hold, but I wonder how attractive the military would look without the technological flash of war machines, and the personal betterment promised by recruiters. Maybe it would look more like a profitable enterprise engaged in mass murder and less like a necessary protector of personal freedom.

The software developer, and indeed each of us, has the same task when evaluating what to work on, and who to work for: to remove technological flash and prospect of growth, to ignore the comforts of the workplace, and ask, “what kind of world will this contribute to?” The option to do no harm exists always, if we look hard enough. 
