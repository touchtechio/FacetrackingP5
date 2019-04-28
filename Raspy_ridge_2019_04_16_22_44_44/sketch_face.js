
class Face {

  constructor () {
    this.videoInput = createCapture(VIDEO);
    this.videoInput.size(400, 300);
    //videoInput.position(800, 0);

    // setup tracker
    this.ctracker = new clm.tracker();
    this.ctracker.init(pModel);
    this.ctracker.start(this.videoInput.elt);

    this.drawPoint = []
    this.notFound = true

    this.pointWidth = 5

    this.direction = 0
  }

  drawFace() {

    // get array of face marker positions [x, y] format
    let positionArray = this.ctracker.getCurrentPosition();

    // if should update drawn face points from latest landmark feature positions
    if (positionArray) {
      this.drawPoint = positionArray
    }

    // draw face
    for (var i=0; i<this.drawPoint.length; i++) {
      // draw ellipse at each position point
      ellipse(900-this.drawPoint[i][0], this.drawPoint[i][1], this.pointWidth, this.pointWidth);
    }


    // if not found face in previous frame
    if (positionArray) {
      if (this.found) {

        // add balloon if there are none
        let distLeft = positionArray[62][0] - positionArray[13][0] //always negative
        let distRight = positionArray[62][0] - positionArray[0][0]

        // are you facing left or right
        // todo : make this waaay smarter
        if (-distLeft/distRight < 1){
          this.direction = -2
        } else {
          this.direction = 2
        }

        // debug logging
        console.log("face", (-distLeft/distRight)); //person looking left (distRight > distLeft), ->0, looking right (distLeft > distRight)->2
      }
    }

    // if found new face set found for next frame
    if (positionArray) {
      this.found = true
    } else {
      this.found = false;
    }

  }


} // end class Face
