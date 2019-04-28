function makeShrine(x,y){
  push();
  translate(x,y);
  scale(2);
  x=0;
  y=0;
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
  pop();
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
