let song;
let fft;
let amplitude;
let volume;
let isPlaying = false;
let fontsize = 40;
let sideEllipseDiameter = 10;

const width = window.innerWidth;
const height = window.innerHeight - 200;
const w = width / 64;

function setup() {
	song = loadSound("vai-vedrai.mp3", loaded);

	colorMode(HSB);
	createCanvas(width, height);
	fft = new p5.FFT(0.9, 256);
	amplitude = new p5.Amplitude();
	peakDetect = new p5.PeakDetect();
	textSize(fontsize);
	textAlign(CENTER, CENTER);
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
	// Create random colors
	let randomColor = color(random(256), random(256), random(256));
	let randomColorAlt = color(random(256), random(256), random(256));

	const spectrum = fft.analyze();
	let songVolume = amplitude.getLevel();

	background(0);
	stroke(0);
	peakDetect.update(fft);

	// BARS
	for (let i = 0; i < spectrum.length; i++) {
		var amp = spectrum[i];
		let y = map(amp, 0, 256, height, 0);
		fill(i, 255, 255);
		rect(i * w, y, w - 2, height - y);
	}

	// ELLIPSES
	let centerEllipseDiameter = map(songVolume, 0, 1, 40, 1000);

	if (peakDetect.isDetected) {
		sideEllipseDiameter = 200;
	} else {
		sideEllipseDiameter *= 0.95;
	}

	// Show ellipses only when sound is detected
	if (songVolume !== 0) {
		// Center Ellipse
		fill(randomColor);
		ellipse(
			width / 2,
			height / 2,
			centerEllipseDiameter,
			centerEllipseDiameter,
		);
		// Left Ellipse
		fill(randomColorAlt);
		ellipse(width / 6, height / 2, sideEllipseDiameter, sideEllipseDiameter);
		// Right Ellipse
		ellipse(
			width - width / 6,
			height / 2,
			sideEllipseDiameter,
			sideEllipseDiameter,
		);
	} else {
		// Show message when sound is not detected
		textAlign(CENTER);
		fill(190);
		text("Play a song to start the visual", width * 0.5, 220);
	}
}

// Bellow is the adapted code for react
// on repo https://github.com/zero-to-mastery/visual-music

// import p5 from "p5";
// import "p5/lib/addons/p5.sound";
// import "p5/lib/addons/p5.dom";

// export default function sketch(p) {
// 	let song;
// 	let fft;
// 	let amplitude;
// 	let volume;
// 	let isPlaying = false;
// 	let fontsize = 40;
// 	let sideEllipseDiameter = 10;

// 	const width = window.innerWidth;
// 	const height = window.innerHeight - 200;
// 	const w = width / 64;

// 	p.setup = function() {
// 		p.colorMode(p.HSB);
// 		p.createCanvas(width, height);
// 		fft = new p5.FFT(0.9, 256);
// 		amplitude = new p5.Amplitude();
// 		p.peakDetect = new p5.PeakDetect();
// 		p.textSize(fontsize);
// 		p.textAlign(p.CENTER, p.CENTER);
// 	};

// 	//Custom redraw that will trigger upon state change
// 	p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
// 		if (song) {
// 			if (song.isLoaded()) {
// 				volume = props.volume;
// 				isPlaying = props.isPlaying;

// 				//monitor volume change and toggling of pause/play button
// 				song.setVolume(parseFloat(volume));
// 				p.togglePlaying(song);

// 				//Reinitializes song if a new file is uploaded
// 				if (song.file !== props.uploadedSong) {
// 					song.dispose();
// 					song = p.loadSound(props.uploadedSong);
// 				}
// 			}
// 		} else {
// 			//handles initial song load
// 			if (props.uploadedSong) {
// 				song = p.loadSound(props.uploadedSong);
// 			}
// 		}
// 	};

// 	p.togglePlaying = function(song) {
// 		if (isPlaying && !song.isPlaying()) {
// 			song.play();
// 		} else if (!isPlaying && song.isPlaying()) {
// 			song.pause();
// 		}
// 	};

// 	p.draw = function() {
// 		// Create random colors
// 		let randomColor = p.color(p.random(256), p.random(256), p.random(256));
// 		let randomColorAlt = p.color(p.random(256), p.random(256), p.random(256));

// 		const spectrum = fft.analyze();
// 		let songVolume = amplitude.getLevel();

// 		p.background(0);
// 		p.stroke(0);
// 		p.peakDetect.update(fft);

// 		// BARS
// 		for (let i = 0; i < spectrum.length; i++) {
// 			var amp = spectrum[i];
// 			let y = p.map(amp, 0, 256, height, 0);
// 			p.fill(i, 255, 255);
// 			p.rect(i * w, y, w - 2, height - y);
// 		}

// 		// ELLIPSES
// 		let centerEllipseDiameter = p.map(songVolume, 0, 1, 40, 1000);

// 		if (p.peakDetect.isDetected) {
// 			sideEllipseDiameter = 200;
// 		} else {
// 			sideEllipseDiameter *= 0.95;
// 		}

// 		// Show ellipses only when sound is detected
// 		if (songVolume !== 0) {
// 			// Center Ellipse
// 			p.fill(randomColor);
// 			p.ellipse(
// 				width / 2,
// 				height / 2,
// 				centerEllipseDiameter,
// 				centerEllipseDiameter,
// 			);
// 			// Left Ellipse
// 			p.fill(randomColorAlt);
// 			p.ellipse(
// 				width / 6,
// 				height / 2,
// 				sideEllipseDiameter,
// 				sideEllipseDiameter,
// 			);
// 			// Right Ellipse
// 			p.ellipse(
// 				width - width / 6,
// 				height / 2,
// 				sideEllipseDiameter,
// 				sideEllipseDiameter,
// 			);
// 		} else {
// 			// Show message when sound is not detected
// 			p.textAlign(p.CENTER);
// 			p.fill(190);
// 			p.text("Play a song to start the visual", width * 0.5, 220);
// 		}
// 	};
// }
