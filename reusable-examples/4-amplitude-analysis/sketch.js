let song;
let button;
let amplitude;

function setup() {
  createCanvas(200, 200);
  song = loadSound('mist.mp3', loaded);
  amplitude = new p5.Amplitude();
}

function loaded() {
  console.log("loaded");
  button = createButton("play");   
  button.mousePressed(togglePlaying);  
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

function draw() {
  background(51);

  let songVolume = amplitude.getLevel();
  let ellipseDiameter = map(songVolume, 0, 1, 10, 200); // you need the map() in order to get a big enough ellipse

  fill(255,0,255);
  ellipse(width/2, height/2, ellipseDiameter, ellipseDiameter);
}



/* REFERENCES 
Volume / Amplitude:
There are a lot of things you can do in terms of sound analysis. The simplest thing is just listening to the volume: is the sound loud or not so loud at this particular moment? 

Another word for volume is amplitude, and this has to do with sound being a wave form: the amplitude is the height of the wave, the distance between the top and the bottom of that wave.

---

p5 library:
setVolume() -> Multiply the output volume (amplitude) of a sound file between 0.0 (silence) and 1.0 (full volume). 1.0 is the maximum amplitude of a digital sound, so multiplying by greater than 1.0 may cause digital distortion.

and for Amplitude() -> the volume is also between 0 and 1.
*/
