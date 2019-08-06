let song, amplitude, fft, fftW;
const prevLevels = new Array(60);

function setup() {
  createCanvas(700, 400);
  song = loadSound("Curls.mp3", loaded);
  amplitude = new p5.Amplitude;
  fft = new p5.FFT(0.9, 1024);
  fftW = new p5.FFT(0.9, 32);
}

function loaded() {
  console.log("loaded");
  button = createButton("play");
  button.mousePressed(togglePlaying);
  song.setVolume(0.2); // note that all amplitude mappings are between 0 - 0.2 because of this.
}

// toggle song on button press
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
  background(30, 30, 30);

  // draw amplitude analysis
  let songVolume = amplitude.getLevel();

  // rectangle variables
  const spacing = 4;
  const w = width / (prevLevels.length * spacing);

  // add new levels to end of the array
  prevLevels.push(songVolume);

  // remove first item in array
  prevLevels.splice(0, 1);

  // loop through all the previous levels
  for (let i = 0; i < prevLevels.length; i++) {

    // map amplitude value to x, y coords of rect corner
    const x = map(i, prevLevels.length, 0, width / 2, width);
    const h = map(prevLevels[i], 0, 0.2, 2, -height + height / 2);

    // map amplitude value to an integer color value for red
    const red = map(h, 2, -height, 0, 455);
    const redInt = Math.floor(red);

    // map amplitude value to an integer color value for blue
    const blue = map(h, 2, -height, 355, 0);
    const blueInt = Math.floor(blue);

    // map amplitude value to opacity value
    const alpha = map(h, 2, -height, 0.5, 2);

    const dinamicFill = `rgba(${redInt}, 70, ${blueInt}, ${alpha})`;
    fill(dinamicFill);
    noStroke();

    rect(x, height / 1.05, w, h);
    rect(width - x, height / 1.05, w, h);
  }

  // draw FFT analysis

  const waveform = fftW.waveform();
  noFill();
  beginShape(QUADS);

    strokeWeight(1);

    // loop over all frequencies
    for (let i = 0; i< waveform.length; i++){

      // map frequency index to rect x position
      const x = map(i, 0, waveform.length, 0, width);

      // map frequency to rect y position
      const y = map(waveform[i], 0, 0.4, height / 2.1, height);
      
      vertex(x, y - 10);
      stroke(y, 50, y / 2);
    }

  endShape();

  const spectrum = fft.analyze();

  const w2 = width / spectrum.length;
  const h2 = (height / 2) / 6;
  noStroke();

  // loop over all frequencies
  for (let i = 0; i < spectrum.length; i++) {

    const amp = spectrum[i];

    // map frequency index to rect x position
    const x = map(i, 0, spectrum.length, 0, width)

    // map frequency to rect y position
    const y = map(amp, 0, 264, height / 2, 0)

    rect(x, y, w2 - 2, h2);
    fill(spectrum[i], 40, 50);
  }
}
