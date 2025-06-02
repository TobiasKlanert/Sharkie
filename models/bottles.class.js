/**
 * Represents a bottle object in the game.
 * Bottles are collectible items that can be animated and interact with the player.
 * This class extends the `DrawableObject` class.
 */
class BOTTLES extends DrawableObject {
  /**
   * An array of image paths for the bottle animation.
   * @type {string[]}
   */
  IMAGES_BOTTLES = [
    "graphics/4. Marcadores/Posión/Animada/1.png",
    "graphics/4. Marcadores/Posión/Animada/2.png",
    "graphics/4. Marcadores/Posión/Animada/3.png",
    "graphics/4. Marcadores/Posión/Animada/4.png",
    "graphics/4. Marcadores/Posión/Animada/5.png",
    "graphics/4. Marcadores/Posión/Animada/6.png",
    "graphics/4. Marcadores/Posión/Animada/7.png",
    "graphics/4. Marcadores/Posión/Animada/8.png",
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
    top: 50,
    left: 10,
    right: 20,
    bottom: 50,
  };

  /**
   * The interval ID for the bottle animation.
   * @type {number}
   */
  animationInterval;

  /**
   * Creates a new bottle object.
   * @param {number} x - The x-coordinate of the bottle.
   */
  constructor(x) {
    super().loadImage("graphics/4. Marcadores/Posión/Animada/1.png");
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = x;
    this.y = 500;
    this.height = 170;
    this.width = 98;
    this.animate();
    pushToIntervals([this.animationInterval]);
  }

  /**
   * Animates the bottle by cycling through its images.
   * The animation runs at a fixed interval of 200 milliseconds.
   */
  animate() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 200);
  }
}
