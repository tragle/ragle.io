<h1><a href="/articles/1-my-first-computer">My first computer</a></h1>

#### September 9, 2018

I have liked programming for a long time. I started programming in the early 1980’s, in a middle-school classroom on brown Atari home computers, using a language called Logo. In Logo, you have a cursor called a “turtle” which, by following your instructions, draws geometric figures on the screen. For example, to draw a square, you type this:

```
repeat 4 [forward 50 right 90]
```

I didn’t learn that much about Logo because, without the Atari computer, I didn’t have a way of practicing outside of class. Then, one lucky Christmas, I received a metallic TI-99/4A home computer. It came with a single game cartridge, I think _Defender_. 

<figure>
  <img src="/img/TI99.jpg" alt="TI-99/4A" />
  <figcaption>TI-99/4A</figcaption>
</figure>

I did not have a good home life at this time. My mom had lost custody of me and my younger sister after divorcing my stepfather, and my stepfather had married an abusive and very religious woman. This woman came with a daughter about my age, with whom I did not get along. The daughter also received a TI-99/4A computer for Christmas, but I don’t know what she did with it. I think her system came with _Scrabble_. 

We lived in a little suburban house in Grapevine, Texas. My stepfather converted part of the garage into a bedroom for me, and there I spent a lot of time away from the bad energy of the rest of house, reading _Elfquest_ graphic novels and listening to _Synchronicity_ through a boom box perched behind my head on the shelf of a waterbed. At night I would watch local professional wrestling on a little black and white TV, waiting for the moment when Kevin Von Erich would use the Iron Claw move on his unsuspecting opponent.

I spent summers with my mom. She met a handsome electrical engineer and moved to Colorado with him. He worked in the booming semiconductor industry, and had all sorts of cool engineering textbooks, lots of records, a Mazda sports car, and the popular Atari 2600 game system. Instead of buying game cartridges, he would take discarded memory chips and write data from Atari cartridges onto them. He used a special cartridge with an exposed circuit board that had little sockets to temporarily hold the chips. Some games required a single chip, some required two. To play a game, he would just insert the chips into the sockets and reset the Atari. He had a huge collection of games, and they all fit in a few small plastic cases.

My mom married him, they moved into an A-frame house on the foothills of Pikes Peak, and at age 12 I moved in, too. In my room I had the Atari 2600, the TI-99/4A, the TV, a stereo receiver, turntable, sturdy loft bed, and a bean bag chair. I felt happy, comfortable, and secure, but I hadn’t made many friends yet, so I started to experiment with programming the TI-99/4A. 

To use the TI-99/4A, you have to type commands in a language called BASIC. A line number prefixes each command in a BASIC program, and by using the special `GOTO` command, you can tell the computer to jump to the command on that line. My first BASIC program looked something like this:

```
10 PRINT "TOM IS AWESOME"
20 GOTO 10
RUN
```

This prints a column of `TOM IS AWESOME` all the way down the screen:

```
TOM IS AWESOME
TOM IS AWESOME
TOM IS AWESOME
TOM IS AWESOME
TOM IS AWESOME
TOM IS AWESOME
TOM IS AWESOME
TOM IS AWESOME
```

To stop the `TOM IS AWESOME`, you had to reset the computer. But with this first program, I had learned two important programming concepts — looping and recursion — though I didn’t know those terms at the time.

The TI-99/4A came with an instruction manual listing all the BASIC commands, called _Beginner’s BASIC_, but I didn’t really know how to put the commands together to do more interesting things. However, a magazine called _99’er_ existed for TI-99/4A enthusiasts, and a large portion of each issue of _99’er_ consisted of printed code for small programs. I had a couple of copies of this magazine. 

<figure>
  <img src="/img/Beginners_BASIC.png" alt="Beginner’s BASIC" />
  <figcaption>Beginner’s BASIC</figcaption>
</figure>

To run a program, I would painstakingly transcribe each line of code into the computer. Any mistake in transcription meant the program would fail, and I would have to figure out what went wrong. In this way I learned another important programming concept: debugging.

I don’t remember what these magazine programs did. I think a lot of them helped balance your checkbook. I wanted to do more interesting things. I noticed an example command in _Beginner’s BASIC_:

```
CALL SOUND(1000,440,2)
```

The manual explained that this command plays the note “A” for one second. So now I could use the TI-99/4A to make music, but what’s more, I had learned another programming concept: function calls. In this case, the `CALL SOUND` function has arguments (inside the parentheses) corresponding to controls which make the computer play different sounds. `1000` means “1000 milliseconds (i.e., one second)”, `440` means 440 Hertz, and `2` means “volume level 2.”

Later on in _Beginner’s BASIC_ I saw a section on generating random numbers. What if I could put random numbers into `CALL SOUND`? What noises would come out?

After a lot of experimentation, I wrote a program that looks something like this:

```
10 RANDOMIZE
20 CALL SOUND(RND * 1000, RND * 440 + 110, 2)
30 GOTO 10
```

This would generate a new random number between 0 and 1, assign it to `RND`, then plug that number into the `CALL SOUND` arguments. `CALL SOUND` would thus generate a sound between 1 millisecond and 1 second long, with a frequency between roughly 110 and 550 Hz. Without the `+ 110` in the frequency argument, the program would crash because the TI-99/4A could not generate a sound lower than 110 Hz (low C).

After running the program, the computer sang a wonderfully atonal, 8-bit melody. I showed my creation off, then refined the program further using other features of `CALL SOUND`, like white noise generation and chords.  

Eventually I wanted to create non-random music, and in the appendix of _Beginner’s BASIC_ found a chart listing the frequencies of the notes on a piano. I did not have a piano, but the TI-99/4A has a keyboard, so I wrote a program that maps the letters on the computer keyboard to the notes on a piano, complete with sharps and flats (on the upper row of letters). This program had a lot more than 3 lines, so I needed a way to store it if I wanted to re-run it without typing in all the commands each time.

You could buy really nice peripherals for the TI-99/4A, but they cost a lot of money. Magazine ads showed fully decked-out systems with hard drives, speech synthesizers, and modems. These setups cost thousands of dollars. I didn’t have that kind of money, but I did have a tape recorder and an inexpensive “cassette interface cable.” 

<figure>
  <img src="/img/kevinvonerich.jpg" alt="Kevin Von Erich" />
  <figcaption>Kevin Von Erich</figcaption>
</figure>

To save a program, you would plug the tape recorder into the side of the computer with the cable, follow the on-screen instructions, and hit the RECORD button on the tape recorder. To load the program, you’d do the same thing, but with the PLAY button instead. You could actually listen to the program on the cassette, too — it had a sort of mysterious, staccato hiss. With the tape storage, I thought I had a pretty effective setup, lacking only a modem. 

Eventually my family got a clone of the IBM XT, larger and more powerful than the TI-99/4A. But I didn’t have quite as much fun with the XT. The TI-99/4A had given me that first thrill of discovery, when the program runs without crashing and the computer briefly seems to become a living creature. Over the years I have come back to programming again and again to relive that feeling.

##### TR

<footer>
<a id="contact" href="mailto:tragle@gmail.com">contact</a>
<a id="home" href="/">home</a>
<a href="/articles/2-who-has-not-visited-a-place-like-this">next</a>
</footer>
