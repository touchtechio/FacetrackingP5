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

  // isNearMountain() {
  //   return this.mountainDistance() < 200;
  // }
  // mountainDistance() {
  //   return this.distance(mountainPos[0], 100+mountainPos[1]);
  // }
  // isNearShrine() {
  //   return this.shrineDistance() < 150;
  // }
  // shrineDistance() {
  //   return this.distance(shrinePos[0], shrinePos[1]-100);
  // }
  isNearUnicorn() {
    return this.unicornDistance() < 150;
  }
  unicornDistance() {
    return this.distance(unicornPos[0], unicornPos[1]);
  }

} // end class Point
