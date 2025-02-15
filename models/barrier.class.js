class BARRIERS extends DrawableObject {
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };


  constructor(x, y, width, height, image) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.loadImage(image);
  }
}
