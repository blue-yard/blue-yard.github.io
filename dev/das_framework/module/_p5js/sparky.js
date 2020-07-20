const fr = 30;
const amount = 111;
const phi = 1.6180339887;
const phimajor = 1/phi;
const phiminor = 1-1/phi;
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
  // Create objects
  for (let i = 0; i < amount; i++) {
    spark.push(new Spark());
  }
}

function draw() {
  clear();
  translate(width / 2, height * phiminor);
  //background(227, 80, 30,1);
  for (let i in spark) {
    spark[i].move();
    spark[i].display();
    //spark[i].rot -= random(-.02, .1);
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  restart();
}
function restart() {
  spark = [];
  setup();
  frameCount = 0;
}



// Spark class
class Spark {
  constructor() {
    this.x = -width;
    this.y = random(-height/128, height/128);
    this.minsize =  width/128;
    this.maxsize =  width/3;
    this.size =  random(this.minsize, this.maxsize);
    this.length = this.size;
    this.width = 1;
    this.speed = noise(0,amount)*0.02;
    this.hue = 227 + random(-60, 60);
    this.sat = random(100/3, 100);
    this.lig = random(100/2, 100);
    this.alp = 0.5;
    const span = 4;
    this.rot = (-9 + random(-span, span));
  }

  move() {
    const velocity = this.speed;
    const distance = this.length * velocity;
    const frictionx = abs(this.x) * 0.023;
    const frictiony = abs(this.y) * 0.0015;
    const incx = velocity + frictionx * distance
    const incy = velocity + frictiony * distance
    //const schwarzschildx = width / 12;
    const schwarzschildy = height / 32;
    //const hawkingx = incx/5;
    const hawkingy = incy/3;

    this.x += incx;

    if (abs(this.x) > width) {
      this.x = -width;
      this.y = random(-height/8, height/8);
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
      this.x = -width;
      this.y = random(-height, height);
    }
  }

  display() {
    fill(this.hue, this.sat, this.lig, this.alp);
    rotate(this.rot);
    ellipse(this.x, this.y, this.length, this.width);
    rotate(-this.rot);
  }
}