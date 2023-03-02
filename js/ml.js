// p5.js
let isShows = false;
let isLips = false;
let lipsimg, faceimg, eyeimg;
let isFace = false;
let isEye = false;

cont = [
  127, 234, 132, 58, 172, 150, 149, 148, 152, 377, 378, 379, 397, 288, 361, 454,
  356,
];
lips = [57, 40, 37, 0, 267, 270, 287, 321, 314, 17, 84, 91];
eyes = [33, 160, 158, 133, 153, 144, 362, 385, 387, 263, 373, 380];
face = [10, 234, 152, 454];

// // get div
let lipsdiv = document.getElementById("lips");
let facediv = document.getElementById("face");
let eyediv = document.getElementById("eye");


lipsdiv.onclick = function () {
  if (!isLips) {
    lipsdiv.style.backgroundColor = "yellow";
  } else {
    lipsdiv.style.backgroundColor = "black";
  }
  isLips = !isLips;
  myp5.detectLips();
};
facediv.onclick = function () {
  if (!isFace) {
    facediv.style.backgroundColor = "yellow";
  } else {
    facediv.style.backgroundColor = "black";
  }
  isFace = !isFace;
  myp5.detectface();
};

eyediv.onclick = function () {
  if (!isEye) {
    eyediv.style.backgroundColor = "yellow";
  } else {
    eyediv.style.backgroundColor = "black";
  }
  isEye = !isEye;
  myp5.detectEyes();
};


let sketch = function (p) {
  let canvas;

  p.preload = function () {
    lipsimg = p.loadImage("Assets/lips.png");
    faceimg = p.loadImage("Assets/tattoo10.png");
    eyeimg = p.loadImage("Assets/lips.png");
  };
//  filter的范围，尽量与CSS中的canva和video的尺寸一致
  p.setup = function () {
    canvas = p.createCanvas(500, 500);
    canvas.id("canvas");
    canvas.parent('#cnv-vid-container');
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

    
  
// detect face
if (detections != undefined && isFace) {
  if (
    detections.multiFaceLandmarks != undefined &&
    detections.multiFaceLandmarks.length >= 1
  ) {
    p.detectface();
  }
}

 // detect eyes
 if (detections != undefined && isEye) {
  if (
    detections.multiFaceLandmarks != undefined &&
    detections.multiFaceLandmarks.length >= 1
  ) {
    p.detectEyes();
  }
}
 
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

 //2
 p.detectface = function () {
  let x, y;
  // p.stroke(0, 255, 0);
  // p.strokeWeight(5);
  // p.beginShape(p.POINTS);
  for (let i = 0; i < face.length; i++) {
    for (let j = 0; j < detections.multiFaceLandmarks[0].length; j++) {
      x = detections.multiFaceLandmarks[0][face[i]].x * p.width;
      y = detections.multiFaceLandmarks[0][face[i]].y * p.height;
      // p.vertex(x, y);
    }
  }
  // p.endShape();
  p.image(faceimg, x -240, y - 220);
  faceimg.resize(230, 120);
};
//3
// detect eyes
p.detectEyes = function () {
  let x, y;
  // p.stroke(0, 255, 0);
  // p.strokeWeight(5);
  // p.beginShape(p.POINTS);
  for (let i = 0; i < eyes.length; i++) {
    for (let j = 0; j < detections.multiFaceLandmarks[0].length; j++) {
      x = detections.multiFaceLandmarks[0][eyes[i]].x * p.width;
      y = detections.multiFaceLandmarks[0][eyes[i]].y * p.height;
      // p.vertex(x, y);
    }
  }
  // p.endShape();
  p.image(eyeimg, x - 190, y - 30);
  eyeimg.resize(230, 120);
};

};

};

let myp5 = new p5(sketch);
