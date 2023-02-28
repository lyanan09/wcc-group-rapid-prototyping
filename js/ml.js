// p5.js
let isShows = false;
let isLips = false;
let lipsimg, faceimg, eyeimg, neckimg, christmasHead, beard, noseimg;

cont = [
  127, 234, 132, 58, 172, 150, 149, 148, 152, 377, 378, 379, 397, 288, 361, 454,
  356,
];
lips = [57, 40, 37, 0, 267, 270, 287, 321, 314, 17, 84, 91];


// // get div
let lipsdiv = document.getElementById("lips");


lipsdiv.onclick = function () {
  if (!isLips) {
    lipsdiv.style.backgroundColor = "yellow";
  } else {
    lipsdiv.style.backgroundColor = "black";
  }
  isLips = !isLips;
  myp5.detectLips();
};


let sketch = function (p) {
  let canvas;

  p.preload = function () {
    lipsimg = p.loadImage("Assets/lips.png");
   
  };
//  filter的范围，尽量与CSS中的canva和video的尺寸一致
  p.setup = function () {
    canvas = p.createCanvas(500, 500);
    canvas.id("canvas");
  };

  p.draw = function () {
    p.clear();

    // detect lips
    if (detections != undefined && isLips) {
      if (
        detections.multiFaceLandmarks != undefined &&
        detections.multiFaceLandmarks.length >= 1
      ) {
        p.detectLips();
      }
    }

    
  };

 
  // detect lips
  p.detectLips = function () {
    let x, y;
    // p.stroke(255, 0, 0);
    // p.strokeWeight(3);
    // p.beginShape(p.POINTS);
    for (let i = 0; i < lips.length; i++) {
      for (let j = 0; j < detections.multiFaceLandmarks[0].length; j++) {
        x = detections.multiFaceLandmarks[0][lips[i]].x * p.width;
        y = detections.multiFaceLandmarks[0][lips[i]].y * p.height;
        // p.vertex(x, y);
      }
    }
    // p.endShape();
    p.image(lipsimg, x -110, y -220);
    lipsimg.resize(220, 120);
  };

 
};

let myp5 = new p5(sketch);
