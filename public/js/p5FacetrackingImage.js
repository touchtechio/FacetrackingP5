var webcam;

//var faces;  // not needed if we're just drawing to a single face
var faceVertices;
var faceRotation;
var faceDataReceived = false;
var faceTrackingStatus = false;

var canvasWidth = 900;
var canvasHeight = 700;

var faceX = canvasWidth / 2 ;
var faceY = canvasHeight / 2 ;

var mode = 0;
var modeMax = 2;


// IMAGE VARIABLE
var smiley;

// function to set up the canvas that will draw the webcam's input
var webcamCanvas = function( p ) {
  p.setup = function() {
    setupCanvas(p);

    // set up the webcam HTML5 video element and make it hidden on the page
    webcam = p.createCapture('VIDEO');
    webcam.size(canvasWidth, canvasHeight);

    webcam.hide();
    webcam.volume(0);
  };

  p.draw = function() {
    p.translate(canvasWidth,0); // move to far corner
    p.scale(-1.0,1.0);
    p.image(webcam, 0, 0, canvasWidth, canvasHeight);
  };
}

// function to set up the canvas that will draw whatever layers we want to place on top of the webcam's input
var drawingCanvas = function( p ) {
  p.setup = function() {
    setupCanvas(p);
    p.imageMode(p.CENTER);
    p.rectMode(p.CENTER);

    //img = p.loadImage("../images/upside-down.png")

    img = p.loadImage("../images/window.jpg")




  };

  p.keyPressed = function() {
    if (keyCode === 32) {
      mode += 1;
      mode %= modeMax;
      console.log('mode:' + mode)
    }


    console.log(keyCode)


  }

  p.mousePressed = function() {
    mode += 1;
    mode %= modeMax;
    console.log('mode:' + mode)

  }

  p.draw = function() {
    // clear the canvas drawing buffer each frame (can easily be turned off)
    p.clear();
    // set the canvas background to transparent (otherwise you won't see the webcam's input)
    p.background(0, 0, 0, 0);
    // set the
    p.fill(0, 0, 0, 0);
    p.stroke(255, 0, 0);

    // only draw if you've received data from the facetracking library
    if (faceDataReceived == true && faceTrackingStatus == true) {
        var x = faceVertices[58]/2
        var y = faceVertices[59]/2
        var size = 250



        var rightHead = faceVertices[16*2];
        var leftHead = faceVertices[0*2];

        // console.log("Right:" +rightHead+ " Left:" +leftHead );
        var headSize = rightHead - leftHead;
        console.log("headsize:" +headSize );



        //p.translate(p.width / 2, p.height / 2);

        //p.rotate(p.PI / 180 * 45);
        faceX = faceVertices[58]/2;
        faceY = faceVertices[59]/2;

        p.image(img, faceX, faceY);


        // p.rect(x-size, y-size, x+size. y+size, size*2);

        p.rect(x, y, headSize/2, headSize/2, 0);

        p.stroke(255, 255, 0);
        p.fill(255, 255, 255);
        showEyes(p);


        p.push()

        //flip canvas
        p.translate(canvasWidth,canvasHeight); // move to far corner
        p.scale(-1.0,-1.0);




        var size = p.map(headSize, 1200, 300, 20, 300, true);


        p.fill(128, 128, 128, 128);

        p.beginShape();
        p.vertex(0, 0);
        p.vertex(x-size/2, y-size/2);
        p.vertex(x-size/2, y+size/2);
        p.vertex(0, canvasHeight);
        p.endShape()

        p.beginShape();
        p.vertex(canvasWidth, 0);
        p.vertex(x+size/2, y-size/2);
        p.vertex(x+size/2, y+size/2);
        p.vertex(canvasWidth, canvasHeight);
        p.endShape()



        p.fill(200, 64, 200, 255);




        p.rect(x, y, size, size, 0);

        p.pop()


        p.stroke(255, 255, 0);
        p.fill(255, 255, 255);
        showEyes(p);


    }

    if (mode === 0 ) {
      //p.image(img, faceX, faceY, img.width/2, img.height/3);
    }

  };
}

var p5Webcam = new p5(webcamCanvas, 'canvasContainer');
var p5Drawing = new p5(drawingCanvas, 'canvasContainer');

function sendFaceDataToP5(faces) {
  if (faceDataReceived == false) {
    faceDataReceived = true;
  }

  faceVertices = faces[0].vertices;
  faceRotation = [faces[0].rotationX, faces[0].rotationY, faces[0].rotationZ];

  // ** FOR MULTI-FACE TRACKING
  // for(var i = 0; i < faces.length; i++) {
  //   var face = faces[i];
  //   faceVertices = face.vertices;
  // }
}

function sendFaceTrackingStatusToP5(trackingStatus) {
  faceTrackingStatus = trackingStatus;
}

function setupCanvas(p) {
  let canvas = p.createCanvas(canvasWidth, canvasHeight);

  // find the div element that contains our canvases and set the p5 canvas to have its position
  // if we don't do this, the canvas will default draw to our window's (0, 0) position,
  // overwriting other elements on the page
  var canvasContainerElement = p.selectAll('.canvasContainerClass');
  let containerElementPositionX = canvasContainerElement[0].elt.offsetLeft;
  let containerElementPositionY = canvasContainerElement[0].elt.offsetTop;
  canvas.position(containerElementPositionX, containerElementPositionY);
}


function showEyes(p) {


  var eyeStart = 36

  p.beginShape();
  for(var k = eyeStart; k < eyeStart+6; k ++) {
    p.vertex(faceVertices[k*2]/2, faceVertices[k*2+1]/2)
  }
  p.endShape()

  eyeStart = 42

  p.beginShape();
  for(var k = eyeStart; k < eyeStart+6; k ++) {
    p.vertex(faceVertices[k*2]/2, faceVertices[k*2+1]/2)
  }
  p.endShape();


}
