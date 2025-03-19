/**
 * Represents a status bar in the game.
 * The status bar displays the player's progress for bottles, life, or coins.
 * This class extends the `DrawableObject` class.
 */
class StatusBar extends DrawableObject {
  /**
   * An array of image paths for the bottles status bar.
   * @type {string[]}
   */
  IMAGES_BOTTLES = [
    "graphics/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "graphics/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "graphics/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "graphics/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "graphics/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "graphics/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];

  /**
   * An array of image paths for the life status bar.
   * @type {string[]}
   */
  IMAGES_LIFE = [
    "graphics/4. Marcadores/green/Life/0_  copia 3.png",
    "graphics/4. Marcadores/green/Life/20_ copia 4.png",
    "graphics/4. Marcadores/green/Life/40_  copia 3.png",
    "graphics/4. Marcadores/green/Life/60_  copia 3.png",
    "graphics/4. Marcadores/green/Life/80_  copia 3.png",
    "graphics/4. Marcadores/green/Life/100_  copia 2.png",
  ];

  /**
   * An array of image paths for the coins status bar.
   * @type {string[]}
   */
  IMAGES_COINS = [
    "graphics/4. Marcadores/green/Coin/0_  copia 4.png",
    "graphics/4. Marcadores/green/Coin/20_  copia 2.png",
    "graphics/4. Marcadores/green/Coin/40_  copia 4.png",
    "graphics/4. Marcadores/green/Coin/60_  copia 4.png",
    "graphics/4. Marcadores/green/Coin/80_  copia 4.png",
    "graphics/4. Marcadores/green/Coin/100_ copia 4.png",
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
   * The current percentage value displayed by the status bar.
   * @type {number}
   */
  percentage = 100;

  /**
   * Creates a new status bar object.
   * @param {string} type - The type of status bar ("bottles", "life", or "coins").
   * @param {number} x - The x-coordinate of the status bar.
   * @param {number} y - The y-coordinate of the status bar.
   * @param {number} percentage - The initial percentage value for the status bar.
   */
  constructor(type, x, y, percentage) {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGES_LIFE);
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.width = 250;
    this.height = 70;
    let imageArr = this.setImageArr(type);
    this.setPercentage(percentage, imageArr);
  }

  /**
   * Returns the appropriate image array based on the type of status bar.
   * @param {string} type - The type of status bar ("bottles", "life", or "coins").
   * @returns {string[]} The corresponding image array for the status bar.
   */
  setImageArr(type) {
    switch (type) {
      case "bottles":
        return this.IMAGES_BOTTLES;
      case "life":
        return this.IMAGES_LIFE;
      case "coins":
        return this.IMAGES_COINS;
    }
  }

  /**
   * Sets the percentage value for the status bar and updates the displayed image.
   * @param {number} percentage - The new percentage value.
   * @param {string[]} imageArr - The image array corresponding to the status bar type.
   */
  setPercentage(percentage, imageArr) {
    this.percentage = percentage;
    let imagePath = imageArr[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Resolves the index of the image to display based on the current percentage value.
   * @returns {number} The index of the image in the image array.
   */
  resolveImageIndex() {
    if (this.percentage >= 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
