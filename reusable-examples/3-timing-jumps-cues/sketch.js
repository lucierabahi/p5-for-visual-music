let song;
let button;
let jumpButton;

function setup() {
  createCanvas(200, 200);
  song = loadSound("end-of-the-world.mp3", loaded);
  button = createButton("play");   
  button.mousePressed(togglePlaying); 
  jumpButton = createButton("jump");  //create the jump button
  jumpButton.mousePressed(jumpSong); // callback, when button is pressed 
  background(51);


  // song.addCue(5, changeBackground); // callback, at 5 seconds

  song.addCue(2, changeBackground, color(0, 0, 255)); // can take a third argument
  song.addCue(4, changeBackground, color(255, 0, 0)); // you can chain them for effects
  song.addCue(6, changeBackground, color(0, 255, 0)); 
}

function loaded() {
  console.log("loaded");
}

function togglePlaying() {
  if (!song.isPlaying()) {    
    song.play();             
    button.html("pause");    
  } else {
    song.pause();           
    button.html("play");    
  }
}

// jump() function 
function jumpSong() {
  // let songLength = song.duration();
  // song.jump(songLength / 2);    // jump to the middle of the song

  // let randomTime = random(songLength);
  // console.log(randomTime);
  // song.jump(randomTime);   // jumps to a random moment in the song

  // song.jump(20);   // jumps forward with 20 secondes
}

// currentTime() function
function draw() {
  background(song.currentTime() * 10, 0, 255)
}

// addCue() function
function changeBackground(color) {
  // background(random(255), random(255), random(255));  // if 2 arguments in the callback

  background(color);  // if a third argument in the callback
}


// REFERENCES
// jump()  -> allows you to jump to a particular point of time

// duration()  -> returns a value which is the length of a particular sound file in seconds (so if the song is 1 minute and half a second long, we're gonna get floating points: 60.5)

// currentTime()  -> Return the current position of the p5.SoundFile playhead, in seconds. Time is relative to the normal buffer direction, so if reverseBuffer has been called, currentTime will count backwards.

//song.addCue()  -> I need the time in seconds where I want the thing to happen
//               -> I need a function that gets called at that time in seconds
