// This app is a Audio Spectrum with p5.sound.
// The color will change with a amp volume.
class Lyric{
	constructor(body, t){
		this.body = body;
		this.t = t;
	}
}


let sound;
let fft;
let amplitude;
let lyricList = [];
function preload() {
  sound = loadSound('https://tentouser.github.io/jsonapi/sounds/potato.mp3');
}
function setup() {
  createCanvas(600, 400);
  
	fft = new p5.FFT();
	amplitude = new p5.Amplitude();
	
	lyricList = createLyricList();
}
function draw() {
  background(30);
  let spectrum = fft.analyze();
	
  noStroke();
  fill(255);
	
	let from = color(0, 255, 200);
	let to = color(255, 100, 0);
	let level = map(amplitude.getLevel(), 0, 0.4, 0, 1);
	let c = makeColor(from, to, level);
  for (let i = 0; i < spectrum.length; i++) {
		if(i % 50 == 0){
			
			let x = map(i, 0, spectrum.length, 0, width);
			let per = spectrum[i] / 255;
			let h = per * 100;
			h = max(h, 1);
			let y = 200;
			
			// let c = makeColor(from, to, i / 1024);
			fill(c);
			rect(x, y, width / spectrum.length * 30, h, 0, 0, 5, 5);
			rect(x, y, width / spectrum.length * 30, -h, 0, 0, 5, 5);
		}
  }
	
	textAlign(CENTER, CENTER);
	textSize(16);
	fill(120);
	text(getLyric(lyricList, sound.currentTime()), width/2, height - 50);
}
function mousePressed(){
	if(sound.isPlaying() == false){
		sound.play();
	}
}

function makeColor(from, to, per){
	let diff_r = red(to) - red(from);
	let diff_g = green(to) - green(from);
	let diff_b = blue(to) - blue(from);
	let r = red(from) + per * diff_r;
	let g = green(from) + per * diff_g;
	let b = blue(from) + per * diff_b;
	return color(r, g, b);
}


function getLyric(lyricList, t){
	let lyric = null;
	for(let i=0; i<lyricList.length; i++){
		if(lyricList[i].t < t){
			lyric = lyricList[i];
		}
	}
	if(lyric == null){
		return "";
	}
	return lyric.body;
}

function createLyricList(){
	let list = [];
	list.push(new Lyric("♪ I'm lovin' it - Composed by Hot Dog -", 0));
	list.push(new Lyric("マックのポテト揚げたて食べたい", 17));
	list.push(new Lyric("マックのポテト揚げ直せ", 22));
	list.push(new Lyric("マックのポテト揚げたて食べたい", 26));
	list.push(new Lyric("揚げたてないなら", 30));
	list.push(new Lyric("いらねぇ", 32));
	list.push(new Lyric("バーガーいらねぇ　ポテトを出せ", 34));
	list.push(new Lyric("バーガーいらねぇ　揚げ直せ", 37));
	list.push(new Lyric("バーガーいらねぇ　ポテトを出せ", 41));
	list.push(new Lyric("バーガーいらねぇ　金返せ", 45));
	list.push(new Lyric("fin.", 50));
	return list;
}


