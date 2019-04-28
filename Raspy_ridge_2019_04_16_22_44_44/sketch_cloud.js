var xshift;
var yshift;
var sColorR = 185;
var sColorG = 30;
var sColorGEye = 1;
var sColorB = 75;
var value = 0;

class Cloud {

  constructor (x, y) {
    this.x = x
    this.y = y
    this.active = false
  }

  makeCloud() {
    //draw the non-moving parts of the unicorn face
    push();
    translate(this.x,this.y);
    scale(5);
    let size = 1;
    //neck
    let x = 0;
    let y = 0;
  	fill(255, 255, 255);
  	noStroke();
  	arc(x, y, 25 * size, 20 * size, PI + TWO_PI, TWO_PI);
  	arc(x + 10, y, 25 * size, 40 * size, PI + TWO_PI, TWO_PI);
  	arc(x + 25, y, 25 * size, 35 * size, PI + TWO_PI, TWO_PI);
  	arc(x + 40, y, 30 * size, 15 * size, PI + TWO_PI, TWO_PI);

    pop();
  }

  checkDistance(x, y){
    if (this.distance(x,y) < 200){
      this.active = true
    }
    return this.active
  }

  distance(x, y) {
    return sqrt(pow(x-this.x, 2) + pow(y-(this.y+100),2))
  }

}
