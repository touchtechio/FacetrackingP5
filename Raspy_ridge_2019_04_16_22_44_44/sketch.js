// adellelin and mattpinner
// p5 game with face tracking

// declare our face interface (from sketch_face.js)
let face

// create balloon objects to float around (from sketch_point.js)
let balloon = []

// declare targets
// must call checkDistance(x, y) with each balloon
let targetMountain = new Mountain(200, 120)
let targetShrine = new Shrine(1300, 520)
let targetUnicorn = new Unicorn(700, -50)

// for background gradient rendering
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;


function setup() {
  var cnv = createCanvas(1800, 700);

  // html page div for canvas
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

  // create face handler and drawer 
  face = new Face()

  fill(255);
}

function draw() {
  background(255, 255, 255, 1);
  setGradient(0, 0, width, height/2, c2, c1, Y_AXIS);
  fill(c1);
  rect(0, height,width,height/2);
  invite();

  // draw targets
  targetMountain.makeMountain();
  targetShrine.makeShrine();
  targetUnicorn.makeUnicorn();

  // draw all balloons
  for (var i = 0; i <balloon.length; i++) {

    // delete balloon the are out of frame
    if (balloon[i].y < -100) {
      balloon.splice(i,1);
      continue;
    }

    // update balloon position and draw balloon
    balloon[i].speak(face.direction)

    // update distance to balloon within each target
    targetMountain.checkDistance(balloon[i].x, balloon[i].y)
    targetShrine.checkDistance(balloon[i].x, balloon[i].y)
    targetUnicorn.checkDistance(balloon[i].x, balloon[i].y)

  }

  // check face point from camera and draw face
  face.drawFace()

  // if face found and no balloons, add one
  if(face.found) {
    if (balloon.length==0){
      balloon.push(new Point(width/2,height-100));
    }
  }

} // end draw()

function mousePressed() {
    balloon.push(new Point(mouseX, mouseY))
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

// write invite text
// uses targets' state to activate text
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
  if (targetShrine.active) {
    text('You have touched our lives in immeasurable ways and we’ll forever be grateful and want you to be apart of our family', 30, height-100);
  }
  if (targetMountain.active) {
    text('Many people fantasize about going to Japan, we are such people. We have to get very far away from all our computers', 30, height-120);
  }
  if (balloon.length>0){
    text("MOUNTAIN:"+ targetMountain.distance(balloon[0].x, balloon[0].y), 30, height -80);
    text("SHRINE:"+ targetShrine.distance(balloon[0].x, balloon[0].y), 30, height -60);
    //text("SHRINE:"+ balloon[0].shrineDistance(), 30, height -60);
    text("UNICORN:"+ targetUnicorn.distance(balloon[0].x, balloon[0].y), 30, height -40);
  }
}
