/**
 * Represents a bubble object in the game.
 * Bubbles are projectiles that can be thrown by the player and interact with enemies.
 * This class extends the `DrawableObject` class.
 */
class Bubble extends DrawableObject {
  /**
   * The file path for the normal bubble image.
   * @type {string}
   */
  normalBubble = "graphics/1.Sharkie/4.Attack/Bubble trap/Bubble.png";

  /**
   * The file path for the poisoned bubble image.
   * @type {string}
   */
  poisonedBubble =
    "graphics/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";

  /**
   * The interval ID for the bubble's movement.
   * @type {number}
   */
  throwInterval;

  /**
   * The current rotation angle of the bubble in radians.
   * @type {number}
   */
  rotation = 0;

  /**
   * The interval ID for the bubble's rotation animation.
   * @type {number}
   */
  animationInterval;

  /**
   * The offset values for collision detection.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   * @property {number} bottom - The bottom offset.
   */
  offset = {
    top: -37,
    left: -40,
    right: 0,
    bottom: 0,
  };

  /**
   * Creates a new bubble object.
   * @param {number} x - The x-coordinate of the bubble.
   * @param {number} y - The y-coordinate of the bubble.
   * @param {number} speed - The speed of the bubble's movement.
   * @param {string} bubble - The type of bubble ("normal" or "poisoned").
   */
  constructor(x, y, speed, bubble) {
    super();
    this.loadImage(this.getBubbleType(bubble));
    this.x = x;
    this.y = y;
    this.startX = x;
    this.width = 75;
    this.height = 75;
    this.isActive = true;
    this.sound = sounds.bubbleAttackSound;
    if (this.sound && soundsEnabled) {
      this.sound.play();
    }
    this.throw(speed);
    this.animate(5);
    this.checkBubbleRange();
    pushToIntervals([
      this.throwInterval,
      this.animationInterval,
      this.checkRangeInterval,
    ]);
  }

  /**
   * Moves the bubble horizontally and applies a sinusoidal vertical movement.
   * @param {number} [speed=0] - The speed of the bubble's horizontal movement.
   */
  throw(speed = 0) {
    let time = 0;
    this.throwInterval = setInterval(() => {
      this.x += 10 + speed;
      this.y += Math.cos(time) * 7.5;
      time += 0.1;
    }, 1000 / 60);
  }

  /**
   * Returns the file path for the bubble's image based on its type.
   * @param {string} bubble - The type of bubble ("normal" or "poisoned").
   * @returns {string} The file path for the bubble's image.
   */
  getBubbleType(bubble) {
    switch (bubble) {
      case "normal":
        return this.normalBubble;
      case "poisoned":
        return this.poisonedBubble;
    }
  }

  /**
   * Animates the bubble by rotating it at a specified speed.
   * @param {number} [rotationSpeed=5] - The speed of the bubble's rotation in degrees per frame.
   */
  animate(rotationSpeed = 5) {
    let angle = 0;
    this.animationInterval = setInterval(() => {
      angle += rotationSpeed;
      this.rotation = (angle * Math.PI) / 180;
    }, 1000 / 60);
  }

  /**
   * Checks if the bubble has traveled beyond its range and deactivates it if necessary.
   * The range is set to 1000 pixels from its starting position.
   */
  checkBubbleRange() {
    this.checkRangeInterval = setInterval(() => {
      if (this.x >= this.startX + 1000) {
        if (!this.sound.paused) {
          this.sound.pause();
        }
        this.isActive = false;
        this.clearIntervals();
      }
    }, 100);
  }

  /**
   * Clears all active intervals associated with the bubble.
   * This includes the movement, animation, and range-check intervals.
   */
  clearIntervals() {
    clearInterval(this.throwInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.checkRangeInterval);
  }
}
