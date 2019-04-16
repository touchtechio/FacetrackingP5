let bx;
let by;
let boxSize = 75;
let overBox = false;
let locked = false;
let xOffset = 0.0;
let yOffset = 0.0;
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

let balloon = []


function setup() {
  createCanvas(1200, 400);
  bx = width / 2.0+200;
  by = height / 2.0;
  rectMode(RADIUS);
  strokeWeight(2);
  colorMode(RGB, 255, 255, 255, 1);
  
    // Define colors
  c1 = color(244, 122, 158, 1); //pink
  c2 = color(0,220,220,1);
  //noLoop();

}

function draw() {
  background(255, 255, 255, 1);
  setGradient(0, 0, width, height/2-22, c2, c1, Y_AXIS);
  fill(c1);
  rect(0, height,width,220);
  
  make_mountain(200,50);
  makeShrine(500,300);
  // Test if the cursor is over the box
  if (
    mouseX > bx - boxSize &&
    mouseX < bx + boxSize &&
    mouseY > by - boxSize &&
    mouseY < by + boxSize
  ) {
    overBox = true;
    if (!locked) {
      stroke(255);
      fill(255, 122, 15);
    }
  } else {
    stroke(156, 39, 176);
    fill(255, 122, 130);
    overBox = false;
  }

  //Draw the box
  rect(bx, by, boxSize, boxSize);
    by -= 1/4
    if (by < 0) { 
    by = 400; 
    }
  
  for (var i = 0; i <balloon.length; i++) {
    
    if (balloon[i].y < -100) {
      balloon.splice(i,1);
    }
    else{
      balloon[i].speak()
    }
  }
  
  // if ( overBox) {


  /*
  if (locked) {
   // fill(255)
   //strokeWeight(0)
   //textSize(10);
  strokeWeight(255)

  //text('Count:' + balloon.length, 100, 30);
    text('Celebrate in March 2020:' + balloon.length, bx-50, by);
  }
  */
}

function mousePressed() {
  if (overBox) {
    locked = true;
    fill(255, 255, 255);
  } else {
    locked = false;
    print('hi')
    balloon.push(new Point(mouseX, mouseY))
    
  }
  xOffset = mouseX - bx;
  yOffset = mouseY - by;
}

function mouseDragged() {
  if (locked) {
    bx = mouseX - xOffset;
    by = mouseY - yOffset;
  }
}

function mouseReleased() {
  locked = false;
}


function make_balloons(x, y) {
  //fill(255,255,255,1);
  noFill();
  strokeWeight(5)
  stroke(100, 128, 193,.5);//hot air balloon disapears 

  ellipse(x, y, 100, 100)
  arc(x,y,150,150,radians(180),radians(0));//hot air balloon 
  line(x,y+125,x,y-75)//middle line V
  line(x-75,y,x-20,y+125);//left line
  line(x+75,y,x+20,y+125);//right line
  line(x-30,y+100,x+30,y+100);//middle H
  arc(x,y+12,100,175,radians(-90),radians(90));//inside right arc
  arc(x,y+12,100,175,radians(90),radians(270));//inside left arc
  rect(x-0,y+150,20,20);//basket
  

}

function make_mountain(x, y){
  stroke(255,200,255,1);
  strokeWeight(5);
  fill(15,100,150,1);
  c_w = 250+x
  s_p = -140+x
  beginShape();
  curveVertex(s_p-100, 180);
  curveVertex(s_p-100, 180);
  curveVertex(s_p+120, 80);
  curveVertex((c_w-(s_p))/2+(s_p), 50);
  curveVertex(c_w-120, 80);
  curveVertex(c_w+100, 180);
  curveVertex(c_w+100, 180);
  // curveVertex(10, 80);
  endShape();
  
  fill(255,255,255,1);

  c_w = 135+x
  s_p = -25+x
  beginShape();
  curveVertex(s_p, 80);
  curveVertex(s_p, 80);
  curveVertex((c_w-(s_p))/2+(s_p), 40);
  curveVertex(c_w, 80);
  curveVertex(c_w, 80);
  // curveVertex(10, 80);
  endShape();
  
}

function makeShrine(x,y){
  w1=40;
  h1=30;
  //noStroke();
  stroke(255,200,255,1);
  strokeWeight(5);
  fill(255,0,0,1);
  rect(x,y,w1,h1);
  b1 = 10;
  fill(255,255,255,1);
  noStroke();
  rect(x,y,w1-b1,h1-b1);
  
  w2=w1-2;
  h2=h1-5;
  y2 =y-h1*2-10;
  stroke(255,200,255,1);
  fill(255,0,0,1);
  rect(x,y2,w2,h2);
  b1 = 10;
  fill(255,255,255,1);
  noStroke();
  rect(x,y2,w2-b1,h2-b1);
  
  w3=w2-4;
  h3=h2-2;
  y3 =y2-h2*2-15;
  stroke(255,200,255,1);
  fill(255,0,0,1);
  rect(x,y3,w3,h3);
  b1 = 14;
  fill(255,255,255,1);
  noStroke();
  rect(x,y3,w2-b1,h2-b1);
  stroke(255,200,255,1);
  makeRoof(x,y);
  makeRoof(x,y2);
  makeRoof(x,y3+5);
}

function makeRoof(x,y){
    beginShape();
  vertex(x-80,y-25);
  vertex(x-45,y-35);
  vertex(x-35,y-45);
  vertex(x+35,y-45);
  vertex(x+45,y-35);
  vertex(x+80,y-25);
  endShape();
  
}

class Point {
  
  constructor (x, y) {
    this.x = x
    this.y = y
    this.noise = noise(x, y)
  }
 
  speak() {
    //console.log(`${this.name} makes some noise...`)
    make_balloons(this.x, this.y)
    //ellipse(this.x, this.y, 100, 100);
    
    this.y -= 1*this.noise
    if (this.y < -200) { 
    this.y = windowHeight+20; 
    
  } 
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function invite(){
    fill(0)
  strokeWeight(0)
  textSize(15);
  //text('Count:' + balloon.length, 100, 30);
  text('Wokyo:' + balloon.length, bx-20, by-50);
  text('Celebrate in March 2020:', bx-20, by);
}