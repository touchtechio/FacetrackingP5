class Shrine{

  constructor (x, y) {
    this.x = x
    this.y = y
    this.active = false
    this.unlocked = false
  }

  makeShrine(){
    push();
    translate(this.x, this.y);
    scale(2);
    // draw shrine at 0,0
    let x=0;
    let y=0;
    let w1=40;
    let h1=30;
    noStroke();
    stroke(selRGBA[0],selRGBA[1],selRGBA[2],selRGBA[3]);
    strokeWeight(0);

    if (this.active) strokeWeight(5);

    fill(255,0,0,1);
    rect(x,y,w1,h1);
    let b1 = 10;
    fill(255,255,255,1);
    noStroke();
    rect(x,y,w1-b1,h1-b1);

    let w2=w1-2;
    let h2=h1-5;
    let y2 =y-h1*2-10;
    stroke(selRGBA[0],selRGBA[1],selRGBA[2],selRGBA[3]);
    fill(255,0,0,1);
    rect(x,y2,w2,h2);
    b1 = 10;
    fill(255,255,255,1);
    noStroke();
    rect(x,y2,w2-b1,h2-b1);

    let w3=w2-4;
    let h3=h2-2;
    let y3 =y2-h2*2-15;
    stroke(selRGBA[0],selRGBA[1],selRGBA[2],selRGBA[3]);
    fill(255,0,0,1);
    rect(x,y3,w3,h3);
    b1 = 14;
    fill(255,255,255,1);
    noStroke();
    rect(x,y3,w2-b1,h2-b1);
    stroke(selRGBA[0],selRGBA[1],selRGBA[2],selRGBA[3]);
    this.makeRoof(x,y);
    this.makeRoof(x,y2);
    this.makeRoof(x,y3+5);
    pop();
  }

  makeRoof(x,y){
    beginShape();
    vertex(x-80,y-25);
    vertex(x-45,y-35);
    vertex(x-35,y-45);
    vertex(x+35,y-45);
    vertex(x+45,y-35);
    vertex(x+80,y-25);
    endShape();

  }

  checkDistance(x, y){
    // if balloon is near, reset activeStart time
    if (this.distance(x,y) < 200){
      this.active = true
      this.unlocked = true
      // the last frame that balloon is near target
      this.activeStart = millis()
    }
    if ((millis() - this.activeStart) > selectDuration) {
      this.active = false
    }
    return this.active
  }

  distance(x, y) {
    // shrine center is at the base, so shift pos up 200
    return sqrt(pow(x-this.x, 2) + pow(y-(this.y-200),2))
  }

} // end class Shrine
