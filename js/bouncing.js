
let info;

function preload(){
  info = loadImage('Assets/info.png');
}
// create our ball class
class Ball {
  
  constructor(_x, _y) {
    this.location = new createVector(_x, _y);  // Location of shape
    this.velocity = new createVector(1.5, 2.1);  // Velocity of shape
    this.gravity = new createVector(0, 0.2);   // Gravity acts at the shape's acceleration
    this.friction = new createVector(0, 0); 
  }
  
  display() {
    // Add velocity to the location.
    this.location.add(this.velocity);
    // Add gravity to velocity
    this.velocity.add(this.gravity);

    this.friction.x = this.velocity.x * -1;
    this.friction.y = this.velocity.y * -1;
    this.friction.normalize();
    this.friction.mult(0.01);
    this.velocity.add(this.friction);

    // Bounce off edges
    if (this.location.x > width){
      this.location.x = width;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y = this.velocity.y * -1;
    }
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y = this.velocity.y * -1; 
    }

    // Display 
    let scale = 1;
    image(info,this.location.x,this.location.y,info.width*scale,info.height*scale);

    // noStroke();
    // fill(255);
    // ellipse(this.location.x,this.location.y,48,48);
  }
}


let balls = [];

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  newBall(0,0);
  
}

function draw() {
  background(0);
  
  for (let ball of balls) {
    ball.display();
  }
 
  
}

// function mousePressed() {
  // when we press the mouse we create a new instance of the Ball object and add it to the balls array
  // let b = new Ball(mouseX, mouseY);
  // balls.push(b);
// }

function newBall(x, y) {
  let b = new Ball(x,y);
  balls.push(b);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}