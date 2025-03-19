/**
 * Represents a light object in the game.
 * Light objects are background elements that move to create a parallax effect.
 * This class extends the `MovableObject` class.
 */
class Light extends MovableObject {
  /**
   * The y-coordinate of the light object.
   * @type {number}
   */
  y = 0;

  /**
   * The width of the light object.
   * @type {number}
   */
  width = 1280;

  /**
   * The height of the light object.
   * @type {number}
   */
  height = 720;

  /**
   * The interval ID for the light's animation.
   * @type {number}
   */
  aimationInterval;

  /**
   * Creates a new light object.
   * @param {string} path - The file path to the light image.
   * @param {number} x - The x-coordinate of the light object.
   * @param {number} [speed=1.0] - The speed of the light's movement.
   */
  constructor(path, x, speed = 1.0) {
    super().loadImage(path);

    this.speed = speed;
    this.x = x;
    this.animate();
    pushToIntervals([this.aimationInterval]);
  }

  /**
   * Animates the light object by moving it to the right at a fixed interval.
   */
  animate() {
    this.aimationInterval = setInterval(() => {
      this.moveRight();
    }, 1000 / 60);
  }
}
