let song, amplitude, fft, fftW;
const prevLevels = new Array(60);

function setup() {
  createCanvas(700, 400);
  song = loadSound("Curls.mp3", loaded);
  amplitude = new p5.Amplitude;
  fft = new p5.FFT(0.9, 1024);
  fftW = new p5.FFT(0.9, 32);
  // noStroke();
  // rectMode();
}

function loaded() {
  console.log("loaded");
  button = createButton("play");
  button.mousePressed(togglePlaying);
  song.setVolume(0.2); // note that all amplitude mappings are between 0 - 0.2 because of this.
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

    // stroke(255,0,0);

    strokeWeight(3);
    for (let i = 0; i< waveform.length; i++){
      const x = map(i, 0, waveform.length, 0, width);
      const y = map(waveform[i], 0, 0.4, height / 2.1, height);
      // smooth(0.9);
      vertex(x, y - 10);
      stroke(y, 50, y / 2);
    }

  endShape();

  const spectrum = fft.analyze();

  // const sortedSpectrum = [...spectrum.sort((a,b) => a - b), ...spectrum.reverse().slice(1)]

  // spectrum.sort((a, b) => b - a),
  //   sortedSpectrum = Array
  //     .from(spectrum.keys())
  //     .sort((a, b) => b % 2 - a % 2 || (a % 2 ? b - a : a - b))
  //     .map(i => spectrum[i]);

  const w2 = width / spectrum.length;
  const h2 = (height / 2) / 6;
  noStroke();
  // console.log(spectrum);

  for (let i = 0; i < spectrum.length; i++) {
    const amp = spectrum[i];
    const x = map(i, 0, spectrum.length, 0, width)
    const y = map(amp, 0, 264, height / 2, 0)
    rect(x, y, w2 - 2, h2);
    // stroke(255);
    // noFill();
    fill(spectrum[i], 40, 50);
  }
}
