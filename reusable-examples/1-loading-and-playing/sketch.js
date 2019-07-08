// You can test all of this in your browser by opening the `index.html` file :) 
// To stop playing the song, in the console, you write `song.stop()`


// // OPTION 1
// // `song` has to be a global variable
// let song;

// // The `preload()` built-in p5 function is one way to check the file is loaded before executing the rest of the code
// function preload() {
//   song = loadSound("little-camels.mp3");
// }

// function setup() {
//   createCanvas(400, 400);
//   slider = createSlider(0, 1, 0.5, 0.01)
//   song.play()
// }

// function draw() {
//   background(220);
//   song.setVolume(slider.value());
// }



// OPTION 2 - This is the other way, using a callback function
// you move `song = loadSound("little-camels.mp3");` into `function setup()` and you add an argument that we will call "loaded"
// but you have to move away `song.play()` from `function setup()` and put it in `function loaded()`

let song;

let sliderVolume;
let sliderRate;
let sliderPan;

function setup() {
  createCanvas(400, 400);
  song = loadSound("little-camels.mp3", loaded);
  sliderVolume = createSlider(0, 1, 0.5, 0.01)
  // sliderRate = createSlider(0, 3, 1, 0.01)
  // sliderPan = createSlider(-1, 1, 0, 0.01)
}

function loaded() {
  song.play();
}

function draw() {
  background(220);
  song.setVolume(sliderVolume.value());
  // song.rate(sliderRate.value());
  // song.pan(sliderPan.value());
}


// REFERENCES
// play()  -> to play the song
// loop()  -> will play the song and loop to the beginning when the song is over

// loadSound("file.mp3")    -> loads the song
// setVolume()     -> sets the volume

// createSlider(0, 1, 0.5, 0.01) 
// & 
// song.setVolume(slider.value());   -> create a slider in the canvas to control the volume  

// rate() is the speed at which the song is played.   1 is default value. 0.5 is 2 times slower, etc.    The 2 first arguments are the range.

// pan() is to go from left speaker to right speaker when using it in a slider