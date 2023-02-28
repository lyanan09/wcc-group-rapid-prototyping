
let bubble;
let buttonX;
let buttonY;

function preload(){
  bubble = loadImage('bubble.jpg');

}
// create our ball class
class Ball {
  // this constructor is called when we define new Ball(...)
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

    // Display circle at location vector
    let scale = 0.1;
    image(bubble,this.location.x,this.location.y,bubble.width*scale,bubble.height*scale);
    
  }
}

// an array to store the balls
let balls = [];

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch-container"); //move our canvas inside this HTML element

  newBall(0,0);
  // image(bubble,100,100,100,100);
}

function draw() {
  background(0);
  
  // loop through all the balls and animate them each frame by accessing their display function
  for (let ball of balls) {
    ball.display();
  }
  // image(bubble,10,10,100,50);
  
}

function mousePressed() {
  // when we press the mouse we create a new instance of the Ball object and add it to the balls array
  
}

function newBall(x, y) {
  // when we press the mouse we create a new instance of the Ball object and add it to the balls array
  let b = new Ball(x,y);
  balls.push(b);
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}