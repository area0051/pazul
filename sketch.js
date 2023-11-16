let slotList = [
  -1, -1, -1, -1, -1, -1, -1, -1, -1,
  -1, -1, -1,  1,  1,  1, -1, -1, -1,
  -1, -1, -1,  1,  1,  1, -1, -1, -1,
  -1,  1,  1,  1,  1,  1,  1,  1, -1,
  -1,  1,  1,  1,  0,  1,  1,  1, -1,
  -1,  1,  1,  1,  1,  1,  1,  1, -1,
  -1, -1, -1,  1,  1,  1, -1, -1, -1,
  -1, -1, -1,  1,  1,  1, -1, -1, -1,
  -1, -1, -1, -1, -1, -1, -1, -1, -1,
];

class History{
  constructor(){
    this.slotList = [];
  }
}
let historyList = [];
let bango = -99;

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(255, 200, 0);
    for (let i = 0; i < 81; i++) {
      if(slotList[i] == -1){
        continue;
      }
      let x = 140 + i % 9 * 40;
      let y = 40 + int(i / 9) * 40;
      fill(255, 255, 255);
      ellipse(x, y, 35, 35);
      
      if(slotList[i] == 1){
        fill(0,200,255);
        if(i == bango){
          fill(0,255,255);
        }
        ellipse(x, y, 35, 35);
      }
  }
}

function mousePressed() {
  for (let i = 0; i < 81; i++) {
    if (slotList[i] == -1) {
      continue;
    }
    let x = 140 + (i % 9) * 40;
    let y = 40 + int(i / 9) * 40;
    let kyori = dist(mouseX, mouseY, x, y);
    if (kyori < 20) {
      if (bango == -99) {
        bango = i;
      } else {
        move(bango, i);
        bango = -99;
      }
    }
  }
}

function keyPressed(){
  if(key == 'u'){
    if(historyList.length > 0){
      let history = historyList[historyList.length -1];
      slotList = history.slotList;
      historyList.pop();
    }
  }
}



function move(from, to) {
  let diff = to - from;
  let directions = [-9, 9, 1, -1];
  for (let i = 0; i < 4; i++) {
    let dir = directions[i];  // Corrected index here
    if(diff == dir * 2){
      if (slotList[from + dir] == 1) {
        if (slotList[from + dir * 2] == 0) {
          //現在の配列をきろくさせていく
          let history = new History();
          history.slotList = slotList.slice();
          historyList.push(history)
          
          
          slotList[from] = 0;
          slotList[from + dir] = 0;  // Corrected index here
          slotList[from + dir * 2] = 1;
        }
      }
    }
  }
}
