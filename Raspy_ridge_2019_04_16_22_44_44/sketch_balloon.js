
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
