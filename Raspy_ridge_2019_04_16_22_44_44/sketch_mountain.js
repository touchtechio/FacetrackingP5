//let selRGBA = [255, 200, 255, 1];

class Mountain{

  constructor (x, y) {
    this.x = x
    this.y = y
    this.active = false
  }

  makeMountain(){
    push();
    translate(this.x, this.y);
    scale(1.5);
    let x=0
    let y=0
    stroke(selRGBA[0],selRGBA[1],selRGBA[2],selRGBA[3]);
    strokeWeight(0);
    if (this.active) strokeWeight(5);
    fill(15,100,150,1);
    let c_w = 250+x
    let s_p = -140+x
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

  checkDistance(x, y){
    // if balloon is near, reset activeStart time
    if (this.distance(x,y) < 200){
      this.active = true
      // the last frame that balloon is near target
      this.activeStart = millis()
    }
    if ((millis() - this.activeStart) > selectDuration) {
      this.active = false
    }
    return this.active
  }

  distance(x, y) {
    return sqrt(pow(x-this.x, 2) + pow(y-(this.y+100),2))
  }

} // end class Mountian
