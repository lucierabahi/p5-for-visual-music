let theta = 0;
let fft;
let amplitude;
let song;
let volume;
let isPlaying = false;

const width = window.innerWidth;
const height = window.innerHeight - 200;

function setup() {
	song = loadSound("vai-vedrai.mp3", loaded);

	createCanvas(width, height, WEBGL);
	fft = new p5.FFT(0.9, 256);
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
	let songVolume = amplitude.getLevel();
	const spectrum = fft.analyze();
	let randomColor = color(random(255), random(255), random(255));

	background(0);
	push();
	rotateZ(theta * songVolume * 0.1);
	rotateX(theta * spectrum[0]);

	if (songVolume) {
		fill(randomColor);
	}

	// SPHERE
	sphere(map(songVolume, 0, 1, 40, 1000));
	pop();
	theta += 0.05;
}

// Bellow is the adapted code for react
// on repo https://github.com/zero-to-mastery/visual-music

// import p5 from "p5";
// import "p5/lib/addons/p5.sound";
// import "p5/lib/addons/p5.dom";

// export default function sketch(p) {
// 	let theta = 0;
// 	let fft;
// 	let amplitude;
// 	let song;
// 	let volume;
// 	let isPlaying = false;

// 	const width = window.innerWidth;
// 	const height = window.innerHeight - 200;

// 	p.setup = function() {
// 		p.createCanvas(width, height, p.WEBGL);
// 		fft = new p5.FFT(0.9, 256);
// 		amplitude = new p5.Amplitude();
// 	};

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
// 		let songVolume = amplitude.getLevel();
// 		const spectrum = fft.analyze();
// 		let randomColor = p.color(p.random(255), p.random(255), p.random(255));

// 		p.background(0);
// 		p.push();
// 		p.rotateZ(theta * songVolume * 0.1);
// 		p.rotateX(theta * spectrum[0]);

// 		if (songVolume) {
// 			p.fill(randomColor);
// 		}

// 		// SPHERE
// 		p.sphere(p.map(songVolume, 0, 1, 40, 1000));
// 		p.pop();
// 		theta += 0.05;
// 	};
// }
