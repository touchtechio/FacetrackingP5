var xshift;
var yshift;
var sColorR = 185;
var sColorG = 30;
var sColorGEye = 1;
var sColorB = 75;
var value = 0;

// function preload(){
//   uniFont = loadFont("perfectly_amicable.ttf");
// }

//
// function setup() {
//   //unicorns's face
//   createCanvas(displayWidth, displayHeight);
//   background(10, 200, 200);
//   frameRate(150);
//   push();
//   textAlign(CENTER);
//   //textFont(uniFont);
//   textSize(42 * displayHeight/1440);
//   fill(255, 200, 20);
//   text("move your mouse to play with the unicorn's horn color", displayWidth - displayWidth/3, displayHeight - displayHeight/4.5);
//   pop();
//
// }

function drawUnicorn(x, y, selected) {
  //draw the non-moving parts of the unicorn face
  push();
  translate(x,y);
  scale(0.45);
  //neck
  fill(190, 188, 222);
  noStroke();
  quad(350, 377, 463, 486, 388, 731, 171, 640);
  jaw(0, 0);
  ears();
  face();
  nose(0, 0);
  fill(190, 188, 222);
  eye();
  strokeWeight(2);
  fill(255);
  horn();
  hair(selected);
  pop();
}

// function mouseClicked() {
//   if (value ==0) {
//     fill(190, 188, 222);
//     noStroke();
//     quad(350, 377, 463, 486, 388, 731, 171, 640);
//     stroke(1);
//     jaw(0, 0);
//     value = 1;
//   } else {
//     fill(190, 188, 222);
//     noStroke();
//     quad(350, 377, 463, 486, 388, 731, 171, 640);
//     jaw(0,10);
//     value = 0;
//   }
// }

function jaw(xshift, yshift) {
  stroke(sColorR, sColorG, sColorB);
  beginShape();
  vertex(355, 380 + yshift);
  vertex(480, 425 + yshift);
  vertex(560, 690 + yshift);
  vertex(520, 740 + yshift);
  vertex(475, 725 + yshift);
  vertex(425 + xshift, 612 + yshift);
  vertex(350 + xshift, 538 + yshift);
  vertex(338 + xshift, 447 + yshift);
  vertex(355 + xshift, 380 + yshift);
  endShape();
}

function ears() {
  fill(225, 236, 250);
  noStroke();
  quad(500, 368, 527, 317, 600, 344, 544, 407);
  quad(350, 374, 330, 307, 340, 242, 414, 344)
}

function face() {
  fill(225, 236, 250);
  noStroke();
  beginShape();
  vertex(417, 344);
  vertex(544, 381);
  vertex(564, 445);
  vertex(555, 640);
  vertex(480, 663);
  vertex(422, 490);
  vertex(338, 425);
  vertex(352, 368);
  vertex(417, 344);
  endShape();
}

function nose(xshift, yshift) {
  fill(225, 236, 250);
  beginShape();
  vertex(554 + xshift, 647 - yshift);
  vertex(570 + xshift, 685 - yshift);
  vertex(543 + xshift, 730 - yshift);
  vertex(500 + xshift, 715 + yshift);
  vertex(480 + xshift, 670 + yshift);
  vertex(554 + xshift, 647 - yshift);
  endShape();
  fill(100);
  ellipse(520, 710 - yshift / 2, 15, sin(frameCount) * 20 % 5);
}

function eye() {
  if (mouseX > 300 && mouseY < 500) {
    stroke(sColorR, sColorG, sColorB);
    strokeWeight(1);
    fill(255);
    beginShape();
    vertex(366, 440);
    vertex(390, 440);
    vertex(406, 448);
    vertex(415, 473);
    vertex(400, 480);
    vertex(380, 468);
    vertex(370, 445);
    vertex(366, 440);
    endShape();
    stroke(sColorR, sColorG, sColorB);
    fill(30, sColorGEye % 200, 180);
    ellipse(395, 460, 20, 35);
    sColorGEye += 1;
  } else {
    strokeWeight(3);
    stroke(sColorR, sColorG, sColorB);
    beginShape();
    curveVertex(415, 473);
    curveVertex(400, 480);
    curveVertex(380, 468);
    curveVertex(370, 445);
    curveVertex(366, 440);
    endShape();


  }
}

function horn() {
  //strokeWeight(1);
  noStroke();
  // background(10, 200, 200);
  for (i = 0; i < 10; i++) {
    j = i + 1;
    k = i / 3;
    fill(10 * (mouseX * i / 3) / (mouseY / 20) + 50, 3 * mouseX / (mouseY * i / 3 / 20), 10 * mouseY / (mouseY / 20));
    quad(458 + 70 * k, 364 - 80 * k,
      500 + 70 * k, 314 - 80 * k,
      530 + 60 * k, 355 - 80 * k,
      486 + 60 * k, 407 - 80 * k);
  }
}

function hair(selected) {
  fill(255, 200, 20);
  stroke(sColorR, sColorG, sColorB);
  if (selected){
  strokeWeight(10)
  stroke(255,200,255,1);
} else {
  noStroke();
}
  quad(110, 682, 90, 618, 207, 508, 207, 555);
  quad(147, 600, 206, 558, 260, 731, 220, 744);
  quad(206, 487, 247, 510, 288, 688, 206, 663);
  fill(240, 194, 100);
  quad(220, 483, 254, 460, 304, 609, 260, 660);
  quad(247, 451, 274, 415, 329, 583, 304, 610);
  quad(274, 416, 303, 390, 321, 503, 301, 553);
  quad(290, 400, 330, 370, 340, 490, 340, 520);
  quad(303, 435, 340, 330, 363, 377, 332, 455);
  fill(220, 150, 100);
  quad(590, 407, 590, 460, 560, 460, 550, 394);
  quad(440, 290, 460, 370, 420, 390, 410, 311);
  quad(475, 294, 480, 344, 450, 370, 440, 297);
}
