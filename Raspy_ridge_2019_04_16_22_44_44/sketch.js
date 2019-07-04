// adellelin and mattpinner
// p5 game with face tracking

// declare our face interface (from sketch_face.js)
let face

// balloon list composed of Point objects to float around (from sketch_point.js)
let balloon = []

// declare targets
// must call checkDistance(x, y) with each balloon
let targetMountain = new Mountain(300, 120)
let targetShrine = new Shrine(1300, 500)
let targetUnicorn = new Unicorn(800, -50)
let unicornCloud = new Cloud(800, 320)
let unicornCloud2 = new Cloud(600, 350)

// for background gradient rendering
const Y_AXIS = 1;
const X_AXIS = 2;
let b1, b2, c1, c2;

// stroke color for selected objects
let selRGBA = [255, 200, 255, 1];
let selectDuration = 5000;
let submitted = false

function submit() {

  console.log('YOU ARE coming!')
  //alert('submitted')
  submitted = true
  var url = 'http://54.191.170.5:5000/rsvp'; // A bad URL that will cause errors

//  var url = 'http://localhost:5000/rsvp'; // A bad URL that will cause errors

  //TODO: fill iwth form data from html inputs

  var yes = document.getElementById("yes").value;
  var msg = document.getElementById("message").value;
  var sliderx = document.getElementById("feasibility").value;

  postData = { title: 'YOU ARE coming!', yes:yes, message: msg, slider:sliderx};

  console.log('slider ' + sliderx)
  console.log('msg ' + msg)

  httpPost(
      url,
      'binary',
      postData,
      function(result) {
        console.log('FORM SUBMITTED! ', result)
      },
      function(error) {
        console.log(error.toString());
      }
    );
}

function setup() {
  var cnv = createCanvas(1700, 650);

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
  textSize(18);
  stroke(15,100,150,1);
  fill(15,100,150,1);
  text("TO PLAY: Look left or right to move ballon. Try to visit sites on the page", 30, 30);
  text("NOTES: Make new balloons by clicking on the page. Don't face your screen towards the light", 30, 60);
  if (submitted) text('SUBMITTED')

  // draw targets
  targetMountain.makeMountain();
  targetShrine.makeShrine();
  targetUnicorn.makeUnicorn();
  unicornCloud.makeCloud();
  unicornCloud2.makeCloud();

  // draw all balloons
  for (var i = 0; i <balloon.length; i++) {

    if (balloon[i].x < -10) {
      balloon[i].x = width+10;
    }
    if (balloon[i].x > width+10) {
      balloon[i].x = -10;
    }
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
    text("We're planning to tie the knot in Japan on March 16, 2020. This celebration could not be complete without you.", 30, height+30)
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
  textSize(20);
  strokeWeight(1)
  noStroke();
  fill(15,50,100,1);

  //text('Count:' + balloon.length, 30, height-100);
  if (targetUnicorn.unlocked) {
    text("We're getting married! Our coming together has not been a coincidence but shaped by the wonderful people in our lives - you!", 30, height-105);
  }
  if (targetShrine.unlocked) {
    text('You have touched our lives in immeasurable ways and we’ll forever be grateful and want you to be apart of our family', 30, height-70);
  }
  if (targetMountain.unlocked) {
    text("So we're to taking a short pause to celebrate with a wedding party. Many fantasize about spending time in Japan, we are such people", 30, height-35); //We have to get very far away from all our computers'
  }
}
