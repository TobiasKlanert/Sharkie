class BARRIERS extends DrawableObject {
  offsetTop = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  offsetBottom = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }

  constructor(x, y, width, height, image) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.loadImage(image);
    this.setBarrierOffset(image)
  }

  setBarrierOffset(image) {
    if (image === "graphics/3. Background/Barrier/1.png") {
      this.offsetTop = {
        top: 0,
        left: 4,
        right: 7,
        bottom: 510,
      }
      this.offsetBottom = {
        top: 550,
        left: 0,
        right: 10,
        bottom: 0,
      }
    } else if (image === "graphics/3. Background/Barrier/2.png") {
      this.offsetTop = {
        top: 70,
        left: 50,
        right: 100,
        bottom: 0,
      }
      this.offsetBottom = {
        top: 70,
        left: 50,
        right: 100,
        bottom: 0,
      }
    } else {
      this.offsetTop = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 10,
      }
      this.offsetBottom = {
        top: 0,
        left: 30,
        right: 50,
        bottom: 10,
      }
    }
  }
}
