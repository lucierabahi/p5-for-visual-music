let song;
let sliderVolume;
let button;

function setup() {
  createCanvas(400, 400);
  song = loadSound("flying-horse.mp3", loaded);
  button = createButton("play");   // create the button
  button.mousePressed(togglePlaying);  // callback, toggles if the sound is played or not
  sliderVolume = createSlider(0, 1, 0.5, 0.01)
}

function loaded() {
  console.log("loaded");
}

// The togglePlaying function that is called when the button is pressed
function togglePlaying() {
  if (!song.isPlaying()) {    // if the song isn't playing
    song.play();             // play the song
    button.html("pause");    // change button text to "pause"
  } else {
    song.pause();           // if the song is playing, pause it
    button.html("play");    // change button text to "play"
  }
}

function draw() {
  background(220);
  song.setVolume(sliderVolume.value());
}


// REFERENCES
// isPlaying()  -> returns 'true' if the sound is playing and 'false' if not

// song.pause();  -> allows to pick up the sound from where it paused, when playing again    
//                -> you can replace it by song.stop() but in that case, when you press the play button, the song will start from the beginning 