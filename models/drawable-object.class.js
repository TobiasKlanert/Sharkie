/**
 * Represents a drawable object in the game.
 * This class provides functionality for loading images, drawing objects on the canvas,
 * handling animations, and detecting collisions.
 */
class DrawableObject {
  /**
   * The x-coordinate of the object.
   * @type {number}
   */
  x = 120;

  /**
   * The y-coordinate of the object.
   * @type {number}
   */
  y = 250;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the object.
   * @type {number}
   */
  width = 100;

  /**
   * The current image of the object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * A cache of loaded images for animations.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * The index of the current image in the animation sequence.
   * @type {number}
   */
  currentImage = 0;

  /**
   * Loads a single image for the object.
   * @param {string} path - The file path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images into the image cache for animations.
   * @param {string[]} arr - An array of file paths to the images.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a green frame around the object for debugging purposes.
   * Only applies to specific object types.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Enemy ||
      this instanceof Endboss ||
      this instanceof COINS ||
      this instanceof BOTTLES ||
      this instanceof Bubble
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "green";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right,
        this.height - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  /**
   * Draws a red frame around barriers for debugging purposes.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawBarrierFrame(ctx) {
    if (this instanceof BARRIERS) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offsetTop.left,
        this.y + this.offsetTop.top,
        this.width - this.offsetTop.right,
        this.height - this.offsetTop.bottom
      );
      ctx.rect(
        this.x + this.offsetBottom.left,
        this.y + this.offsetBottom.top,
        this.width - this.offsetBottom.right,
        this.height - this.offsetBottom.bottom
      );
      ctx.stroke();
    }
  }

  /**
   * Plays an animation by cycling through the provided images.
   * @param {string[]} images - An array of file paths to the animation images.
   */
  playAnimation(images) {
    this.proofArr(images);
    let path = images[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
    if (this.currentImage >= images.length) {
      this.currentImage = 0;
    }
  }

  /**
   * Ensures the animation array is consistent and resets the animation if necessary.
   * @param {string[]} images - An array of file paths to the animation images.
   */
  proofArr(images) {
    if (!this.previousImages) {
      this.previousImages = [...images];
      return;
    }

    if (!this.arraysAreEqual(this.previousImages, images)) {
      this.currentImage = 0;
      this.previousImages = [...images];
    }
  }

  /**
   * Compares two arrays for equality.
   * @param {Array} arr1 - The first array.
   * @param {Array} arr2 - The second array.
   * @returns {boolean} True if the arrays are equal, false otherwise.
   */
  arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  }

  /**
   * Checks if this object is colliding with another object.
   * @param {DrawableObject} mo - The other object to check for collision.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.offset.left + (this.width - this.offset.right) >=
        mo.x + mo.offset.left &&
      this.x + this.offset.left <=
        mo.x + mo.offset.left + (mo.width - mo.offset.right) &&
      this.y + this.offset.top + (this.height - this.offset.bottom) >=
        mo.y + mo.offset.top &&
      this.y + this.offset.top <=
        mo.y + mo.offset.top + (mo.height - mo.offset.bottom)
    );
  }

  /**
   * Checks if this object is colliding with the top part of a barrier.
   * @param {BARRIERS} barrier - The barrier to check for collision.
   * @returns {boolean} True if the object is colliding with the top part of the barrier, false otherwise.
   */
  isBarrierCollidingTop(barrier) {
    return (
      this.x + this.offset.left + (this.width - this.offset.right) >=
        barrier.x + barrier.offsetTop.left &&
      this.x + this.offset.left <=
        barrier.x +
          barrier.offsetTop.left +
          (barrier.width - barrier.offsetTop.right) &&
      this.y + this.offset.top + (this.height - this.offset.bottom) >=
        barrier.y + barrier.offsetTop.top &&
      this.y + this.offset.top <=
        barrier.y +
          barrier.offsetTop.top +
          (barrier.height - barrier.offsetTop.bottom)
    );
  }

  /**
   * Checks if this object is colliding with the bottom part of a barrier.
   * @param {BARRIERS} barrier - The barrier to check for collision.
   * @returns {boolean} True if the object is colliding with the bottom part of the barrier, false otherwise.
   */
  isBarrierCollidingBottom(barrier) {
    return (
      this.x + this.offset.left + (this.width - this.offset.right) >=
        barrier.x + barrier.offsetBottom.left &&
      this.x + this.offset.left <=
        barrier.x +
          barrier.offsetBottom.left +
          (barrier.width - barrier.offsetBottom.right) &&
      this.y + this.offset.top + (this.height - this.offset.bottom) >=
        barrier.y + barrier.offsetBottom.top &&
      this.y + this.offset.top <=
        barrier.y +
          barrier.offsetBottom.top +
          (barrier.height - barrier.offsetBottom.bottom)
    );
  }
}
