let pointCount = 500;
let lissajousPoints = [];
let freqX = 4;
let freqY = 7;
let phi = 15;

let modFreqX = 3;
let modFreqY = 2;

let lineWeight = 0.2;
let lineColor;
let lineAlpha = 50;

let connectionRadius = 100;
let connectionRamp = 6;

let rotation = 0;

let input, inputB,inputC;
let button,buttonR, buttonSave, buttonTry;
let greeting, greetingB, greetingC;

let canvas;
let isGenerated = false;

function setup() {

  canvas = createCanvas(420, 420);
  canvas.parent('#canvas-container');

  colorMode(RGB, 255, 255, 255, 100);
  noFill();

  lineColor = color(0, 10);

  input = select('#day');
  inputB = select('#month');
  inputC = select('#year');

  button = select('#submit');
  button.mousePressed(updateTattoo);
  buttonR = select('#reset');
  buttonR.mousePressed(resetTattoo);
  buttonSave = select('#save');
  buttonSave.mousePressed(saveTattoo);
  buttonTry = select('#try');
  // buttonTry.mousePressed(saveTattoo);

  textAlign(CENTER);
  textSize(20);

  calculateLissajousPoints();
  drawLissajous();
}

function calculateLissajousPoints() {
  for (let i = 0; i <= pointCount; i++) {
    let angle = map(i, 0, pointCount, 0, TAU);

    // let x = p.sin(angle * freqX + p.radians(phi)) * p.cos(angle * modFreqX);
    // let y = p.sin(angle * freqY - p.radians(phi)) * p.cos(angle * modFreqY);
    let x =
      sin(angle * freqX + radians(phi)) *
      tan(angle * modFreqX) *
      cos(angle * modFreqX);
    let y = sin(angle * freqY - radians(phi)) * tan(angle * modFreqY);
    // let x = p.tan(angle * freqX + p.radians(phi)) * p.sin(angle * modFreqX);
    //  let y = p.tan(angle * freqY - p.radians(phi)) * p.sin(angle * modFreqY);
    x *= width / 2 - 30;
    y *= height / 2 - 30;

    lissajousPoints[i] = createVector(x, y);
  }
}

function drawLissajous() {
  background(255);
  strokeWeight(lineWeight);
  push();
  translate(width / 2, height / 2);
  rotate(rotation);

  beginShape();
  for (let i1 = 0; i1 < pointCount; i1++) {
    for (let i2 = 0; i2 < i1; i2++) {
      let d = lissajousPoints[i1].dist(lissajousPoints[i2]);
      let a = pow(1 / (d / connectionRadius + 1), 6);
      if (d <= connectionRadius) {
        stroke(lineColor, a * lineAlpha);

        // p.line(
        //   lissajousPoints[i1].x,
        //   lissajousPoints[i1].y,
        //   lissajousPoints[i2].x,
        //   lissajousPoints[i2].y
        // );

        //  p.vertex(lissajousPoints[i1].x,
        //   lissajousPoints[i2].y);
        // p.vertex(lissajousPoints[i2].x,
        //   lissajousPoints[i1].y);

        vertex(lissajousPoints[i1].x, lissajousPoints[i1].y);
        vertex(lissajousPoints[i2].x, lissajousPoints[i2].y);

        // p.ellipse(lissajousPoints[i1].x,
        //   lissajousPoints[i2].y,a*10);
      }
    }
  }
  endShape();
  pop();
}

function draw() {
  let data = input.value();
  let data2 = inputB.value();
  let data3 = inputC.value();

  if(data && data2 && data3) {
    button.removeAttribute('disabled');
  } else {
    button.attribute('disabled', '');
  }

  if(isGenerated) {
    buttonSave.removeAttribute('disabled');
    buttonTry.removeAttribute('disabled');
  } else {
    buttonSave.attribute('disabled', '');
    buttonTry.attribute('disabled', '');
  }

  drawTattoo();
  calculateLissajousPoints();
  drawLissajous();
}

function drawTattoo() {
  background(255);
  strokeWeight(lineWeight);
  push();
  translate(width / 2, height / 2);
  rotate(rotation);

  beginShape();
  for (let i1 = 0; i1 < pointCount; i1++) {
    for (let i2 = 0; i2 < i1; i2++) {
      let d = lissajousPoints[i1].dist(lissajousPoints[i2]);
      let a = pow(1 / (d / connectionRadius + 1), 6);
      if (d <= connectionRadius) {
        stroke(lineColor, a * lineAlpha);

        // p.line(
        //   lissajousPoints[i1].x,
        //   lissajousPoints[i1].y,
        //   lissajousPoints[i2].x,
        //   lissajousPoints[i2].y
        // );

        //  p.vertex(lissajousPoints[i1].x,
        //   lissajousPoints[i2].y);
        // p.vertex(lissajousPoints[i2].x,
        //   lissajousPoints[i1].y);

        vertex(lissajousPoints[i1].x, lissajousPoints[i1].y);
        vertex(lissajousPoints[i2].x, lissajousPoints[i2].y);

        // p.ellipse(lissajousPoints[i1].x,
        //   lissajousPoints[i2].y,a*10);
      }
    }
  }
  endShape();
  pop();
}

function updateTattoo() {
  let data = input.value();
  let data2 = inputB.value();
  let data3 = inputC.value();

  if( data && data2 && data3) {
    if (data < 16) {
      freqX = data;
      // modFreqX = data / 2;
    } else if (data >=16) {
      freqY = data / 2;
      //modFreqY = data / 2;
      //drawTattoo();  }
  }
    
    if(data2 <= 6){
      // freqX = -data2 ;
      // modFreqX = -data2 ;
      phi = data2;
    }else if (data2 > 6){
      // freqY = -data2 ;
      // modFreqY = -data2 ;
      phi = -data2;
    }
    
    modFreqX = data3/1000/data;
    modFreqY = data3/1000/data;
  }
  
  isGenerated = true;
}

function resetTattoo() {
  freqX = 4;
  freqY = 7;
  phi = 15;

  modFreqX = 3;
  modFreqY = 2;

  input.value('');
  inputB.value('');
  inputC.value('');
  isGenerated = false;
}

function saveTattoo() {
  let filename = input.value() + "/" + inputB.value() + "/" + inputC.value();
  saveCanvas(filename + ".png");
}

function keyPressed() {
  // if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
  if (key == "s" || key == "S") saveCanvas("png");

  //     if (key == '1') freqX--;
  //     if (key == '2') freqX++;
  //     freqX = max(freqX,1);

  //     if (key == '3') freqY--;
  //     if (key == '4') freqY++;
  //     freqY = max(freqY,1);

  //     if (keyCode == LEFT_ARROW) phi -= 15;
  //     if (keyCode == RIGHT_ARROW) phi += 15;

  //     if (keyCode == UP_ARROW) rotation -= 1;
  //     if (keyCode == DOWN_ARROW) rotation += 1;

  //     if (key == '7') modFreqX--;
  //     if (key == '8') modFreqX++;
  //     modFreqX = max(modFreqX,1);

  //     if (key == '9') modFreqY--;
  //     if (key == '0') modFreqY++;
  //     modFreqY = max(modFreqY,1);

  // calculateLissajousPoints();
  // drawLissajous();

  console.log(
    "freqX: " +
      freqX +
      ", freqY: " +
      freqY +
      ", phi: " +
      phi +
      ", modFreqX: " +
      modFreqX +
      ", modFreqY: " +
      modFreqY +
      ", rotation: " +
      rotation
  );
}
