class BackgroundObject {
  constructor(imagePath, x, speed = 1.0) {
    this.image = new Image();
    this.image.src = imagePath;
    this.x = x;
    this.speed = speed;
    this.y = 0;
    this.width = 1280;
    this.height = 720;
  }

  drawObject(ctx, cameraX) {
    const adjustedX = this.x + cameraX * this.speed;
    ctx.drawImage(this.image, adjustedX, this.y, this.width, this.height);
  }
}