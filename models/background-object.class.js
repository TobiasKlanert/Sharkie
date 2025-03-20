/**
 * Represents a background object in the game.
 * This class is used to create and render background elements with parallax effects.
 */
class BackgroundObject {
  /**
   * Creates a new BackgroundObject.
   * @param {string} imagePath - The file path to the background image.
   * @param {number} x - The x-coordinate of the background object.
   * @param {number} [speed=1.0] - The parallax speed of the background object. A lower value creates a slower parallax effect.
   */
  constructor(imagePath, x, speed = 1.0) {
    this.image = new Image();
    this.image.src = imagePath;
    this.x = x;
    this.speed = speed;
    this.y = 0;
    this.width = 1281;
    this.height = 720;
  }

  /**
   * Draws the background object on the canvas.
   * The object's position is adjusted based on the camera's x-coordinate and its parallax speed.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   * @param {number} cameraX - The x-coordinate of the camera, used to calculate the parallax effect.
   */
  drawObject(ctx, cameraX) {
    const adjustedX = this.x + cameraX * this.speed;
    ctx.drawImage(this.image, adjustedX, this.y, this.width, this.height);
  }
}
