/**
 * Represents a barrier object in the game.
 * Barriers are obstacles in the game world that can have different offsets for collision detection.
 * This class extends the `DrawableObject` class.
 */
class BARRIERS extends DrawableObject {
  /**
   * The offset values for the top part of the barrier.
   * These values are used for collision detection.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   * @property {number} bottom - The bottom offset.
   */
  offsetTop = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * The offset values for the bottom part of the barrier.
   * These values are used for collision detection.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   * @property {number} bottom - The bottom offset.
   */
  offsetBottom = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Creates a new barrier object.
   * @param {number} x - The x-coordinate of the barrier.
   * @param {number} y - The y-coordinate of the barrier.
   * @param {number} width - The width of the barrier.
   * @param {number} height - The height of the barrier.
   * @param {string} image - The file path to the barrier's image.
   */
  constructor(x, y, width, height, image) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.loadImage(image);
    this.setBarrierOffset(image);
  }
 
 /**
 * Sets the offset values for the barrier based on the provided image.
 * Different images have different offset values for collision detection.
 * @param {string} image - The file path to the barrier's image.
 */
setBarrierOffset(image) {
  if (image === "graphics/3. Background/Barrier/1.png") {
    this.setOffsets({ top: 0, left: 4, right: 7, bottom: 510 }, { top: 550, left: 0, right: 10, bottom: 0 });
  } else if (image === "graphics/3. Background/Barrier/2.png") {
    this.setOffsets({ top: 70, left: 50, right: 100, bottom: 0 }, { top: 70, left: 50, right: 100, bottom: 0 });
  } else {
    this.setOffsets({ top: 0, left: 30, right: 50, bottom: 10 }, { top: 0, left: 30, right: 50, bottom: 10 });
  }
}

/**
 * Sets the offset values for the top and bottom parts of the barrier.
 * @param {Object} topOffsets - The offset values for the top part of the barrier.
 * @param {number} topOffsets.top - The top offset.
 * @param {number} topOffsets.left - The left offset.
 * @param {number} topOffsets.right - The right offset.
 * @param {number} topOffsets.bottom - The bottom offset.
 * @param {Object} bottomOffsets - The offset values for the bottom part of the barrier.
 * @param {number} bottomOffsets.top - The top offset.
 * @param {number} bottomOffsets.left - The left offset.
 * @param {number} bottomOffsets.right - The right offset.
 * @param {number} bottomOffsets.bottom - The bottom offset.
 */
setOffsets(topOffsets, bottomOffsets) {
  this.offsetTop = topOffsets;
  this.offsetBottom = bottomOffsets;
}
}
