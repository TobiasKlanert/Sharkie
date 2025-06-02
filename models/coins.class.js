/**
 * Represents a coin object in the game.
 * Coins are collectible items that can be animated and interact with the player.
 * This class extends the `DrawableObject` class.
 */
class COINS extends DrawableObject {
  /**
   * An array of image paths for the coin animation.
   * @type {string[]}
   */
  IMAGES_COINS = [
    "graphics/4. Marcadores/1. Coins/1.png",
    "graphics/4. Marcadores/1. Coins/2.png",
    "graphics/4. Marcadores/1. Coins/3.png",
    "graphics/4. Marcadores/1. Coins/4.png",
  ];

  /**
   * The offset values for collision detection.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   * @property {number} bottom - The bottom offset.
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * The interval ID for the coin animation.
   * @type {number}
   */
  animationInterval;

  /**
   * Creates a new coin object.
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
  constructor(x, y) {
    super().loadImage("graphics/4. Marcadores/1. Coins/1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 75;
    this.animate();
    pushToIntervals([this.animationInterval]);
  }

  /**
   * Animates the coin by cycling through its images.
   * The animation runs at a fixed interval of 200 milliseconds.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 200);
  }
}
