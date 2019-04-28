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
let val = 5;

let balloon = []
let positionArray = []
let drawPoint = []
let distLeft, distRight;
let notFound;
let direction = 0;

let mountainPos = [200,120]
let shrinePos = [1300,520]
let unicornPos = [700,-50]
let mountainActive = false
let shrineActive = false
let unicornActive = false


function setup() {
  var cnv = createCanvas(1800, 700);
  cnv.parent('sketch-holder');

  cnv.position(0, 0);

  bx = width / 2.0+200;
  by = height / 2.0;
  rectMode(RADIUS);
  strokeWeight(2);
  colorMode(RGB, 255, 255, 255, 1);

    // Define colors
  c1 = color(244, 122, 158, 1); //pink
  c2 = color(0,220,220,1);
  //noLoop();
  // setup camera capture
  var videoInput = createCapture(VIDEO);
  videoInput.size(400, 300);
  //videoInput.position(800, 0);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

  fill(255);

}

function draw() {
  background(255, 255, 255, 1);
  setGradient(0, 0, width, height/2, c2, c1, Y_AXIS);
  fill(c1);
  rect(0, height,width,height/2);
  invite();


  makeMountain(mountainPos[0],mountainPos[1], mountainActive);
  makeShrine(shrinePos[0],shrinePos[1], shrineActive);
  drawUnicorn(unicornPos[0],unicornPos[1], unicornActive);

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
  //
  // //Draw the box
  // rect(bx, by, boxSize, boxSize);
  //   by -= 1/4
  //   if (by < 0) {
  //   by = 400;
  //   }

  // todo : deactivate targets
  //mountainActive = false
  //shrineActive = false
  //unicornActive= false

  // draw all balloons
  for (var i = 0; i <balloon.length; i++) {

    if (balloon[i].y < -100) {
      balloon.splice(i,1);
    }
    else{
      balloon[i].speak()
    }

    if (balloon[i].isNearMountain()) {
      mountainActive = true
    }
    if (balloon[i].isNearShrine()) {
      shrineActive = true
    }
    if (balloon[i].isNearUnicorn()) {
      unicornActive = true
    }
  }

  // get array of face marker positions [x, y] format
  positionArray = ctracker.getCurrentPosition();

  // if should draw new face points
  if (positionArray) {
    drawPoint = positionArray
  }
  for (var i=0; i<drawPoint.length; i++) {

    // draw ellipse at each position point
    ellipse(900-drawPoint[i][0], drawPoint[i][1], val, val);
  }


  if (positionArray) {
    if (notFound) {
      notFound = false
    } else {
      if (balloon.length==0){
        balloon.push(new Point(width/2,height-100));
      }
      distLeft = positionArray[62][0] - positionArray[13][0] //always negative
      distRight = positionArray[62][0] - positionArray[0][0]
      if (-distLeft/distRight < 1){
        direction = -2
      } else {
        direction = 2
      }
      console.log("face", (-distLeft/distRight)); //person looking left (distRight > distLeft), ->0, looking right (distLeft > distRight)->2
    }
  } else {
    // not found
    notFound = true;
  }

  //rect(width/2, 200, distLeft, distRight)


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
    this.x += direction
    this.y -= 0.5*this.noise
    if (this.y < -200) {
      this.y = windowHeight+20;
    }
  }

  distance(x, y) {
    return sqrt(pow(x-this.x, 2) + pow(y-this.y,2))
  }

  isNearMountain() {
    return this.mountainDistance() < 200;
  }
  mountainDistance() {
    return this.distance(mountainPos[0], 100+mountainPos[1]);
  }
  isNearShrine() {
    return this.shrineDistance() < 150;
  }
  shrineDistance() {
    return this.distance(shrinePos[0], shrinePos[1]-100);
  }
  isNearUnicorn() {
    return this.unicornDistance() < 150;
  }
  unicornDistance() {
    return this.distance(unicornPos[0], unicornPos[1]);
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
  // text box
  fill(255,200,255,1);
  stroke(255,200,255,1);
  rect(0, height, width,150)
  textSize(15);
  strokeWeight(1)
  stroke(0,0,5,1);
  fill(0,0,5,1);

  //text('Count:' + balloon.length, 30, height-100);
  if (shrineActive) {
    text('You have touched our lives in immeasurable ways and we’ll forever be grateful and want you to be apart of our family', 30, height-100);
  }
  if (mountainActive) {
    text('Many people fantasize about going to Japan, we are such people. We have to get very far away from all our computers', 30, height-120);
  }
  if (balloon.length>0){
    text("MOUNTAIN:"+ balloon[0].mountainDistance(), 30, height -80);
    text("SHRINE:"+ balloon[0].shrineDistance(), 30, height -60);
    text("UNICORN:"+ balloon[0].unicornDistance(), 30, height -40);
  }
}
