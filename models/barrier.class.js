class BARRIERS extends DrawableObject {
  offset = {
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
      this.offset = {
        top: 0,
        left: 4,
        right: 7,
        bottom: 330,
      }
      this.offsetBottom = {
        top: 350,
        left: 0,
        right: 10,
        bottom: 0,
      }
    }
  }
}
