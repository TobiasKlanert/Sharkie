class BARRIERS extends DrawableObject {
  constructor(x, y, width, height, image) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.loadImage(image);
  }
}
