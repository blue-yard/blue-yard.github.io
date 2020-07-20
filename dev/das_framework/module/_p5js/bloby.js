const isDebug = 0;
const fr = 60;
const runForFrames = 666;
const amount = 7;
const phi = 1.6180339887;
const phimajor = 1 / phi;
const phiminor = 1 - 1 / phi;
let spark = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fr);
  ellipseMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  colorMode(HSL);
  //noCursor();
  noStroke();
  //stroke(227,98/3,48/3,1);
  //strokeWeight(.01)
  // Create objects
  for (let i = 0; i < amount; i++) {
    spark.push(new Spark());
  }

  //background(227, 98/2, 48/2);
  debug = createGraphics(100, 100);

}

function draw() {
  if (isDebug == true) {
    showDebug();
  }
  if (frameCount >= runForFrames) {
    noLoop();
  }
  translate(width / 2, height * phiminor);
  for (let i in spark) {
    spark[i].move();
    spark[i].display();
    const span = 16;
    spark[i].rot = (-16 + random(-span, span));
  }
}

function showDebug() {
  debug.background(255);
  debug.textSize(32);
  debug.fill(0, 0, 50);
  debug.text(frameCount, 10, 40);
  image(debug, 0,0);
}

function restart() {
  spark = [];
  setup();
  frameCount = 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  restart();
}

// Spark class2
class Spark {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.minsize = width / 4;
    this.maxsize = width;
    this.stretch = this.maxsize / this.minsize * 4;
    this.size = (random(this.minsize, this.maxsize));
    this.length = this.size;
    this.width = this.size / this.stretch;
    this.speed = noise(0, amount) * 0.005;
    const huespan = 30;
    this.hue = 227 - random(0, huespan);
    this.sat = random(22, 62);
    this.lig = random(22, 62);
    this.alp = random(0.002, 0.004);
    //  const span = 7;
    // this.rot = (-30 + random(-span, span));
  }

  move() {
    const velocity = this.speed;
    const distance = this.length * velocity;
    const frictionx = abs(this.x) * 0.01;
    const frictiony = abs(this.y) * 0.01;
    const incx = velocity + frictionx * distance
    const incy = velocity + frictiony * distance
    //const schwarzschildx = 0;//width / amount;
    const schwarzschildy = height / 100; //height / 32;
    //const hawkingx = incx/5;
    const hawkingy = incy * 10;

    this.x += incx;

    if (abs(this.x) > width) {
      this.x = random(-width, width);
    }


    if (this.y < schwarzschildy && this.y > 0) {
      this.y -= incy;
    } else if (this.y > -schwarzschildy && this.y < 0) {
      this.y += incy;

    } else if (this.y > schwarzschildy) {
      this.y += incy;
    } else {
      this.y -= incy;
    }

    if (abs(this.y) < hawkingy || abs(this.y) > height) {
      this.y = random(-height, height);
    }

  }

  display() {
    rotate(this.rot);
    fill(this.hue, this.sat, this.lig, this.alp);
    ellipse(this.x, this.y, this.length, this.width);
    rotate(-this.rot);
  }
}