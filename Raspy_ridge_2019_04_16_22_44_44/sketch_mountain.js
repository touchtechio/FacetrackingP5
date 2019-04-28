function makeMountain(x, y){
  push();
  translate(x,y);
  scale(1.5);
  x=0
  y=0
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
  pop();

}
