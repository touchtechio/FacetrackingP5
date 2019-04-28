class Point {

  constructor (x, y) {
    this.x = x
    this.y = y
    this.noise = noise(x, y)
  }

  speak(direction) {
    //console.log(`${this.name} makes some noise...`)
    make_balloons(this.x, this.y)
    //ellipse(this.x, this.y, 100, 100);
    this.x += direction
    this.y -= 0.5*this.noise
    if (this.y < -200) {
      this.y = windowHeight+20;
    }
  }

  distance(x, y) {
    return sqrt(pow(x-this.x, 2) + pow(y-this.y,2))
  }

} // end class Point
