/**
 * Represents a movable object in the game.
 * This class extends the `DrawableObject` class and provides functionality for movement, collision detection, and state management.
 */
class MovableObject extends DrawableObject {
  /**
   * The horizontal movement speed of the object.
   * @type {number}
   */
  speed = 0.15;

  /**
   * Indicates whether the object is facing the opposite direction.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * The vertical speed of the object.
   * @type {number}
   */
  speedY = 0;

  /**
   * The acceleration applied to the object.
   * @type {number}
   */
  acceleration = 0.00001;

  /**
   * The energy level of the object.
   * @type {number}
   */
  energy = 100;

  /**
   * The number of coins collected by the object.
   * @type {number}
   */
  coins = 0;

  /**
   * The percentage of coins collected.
   * @type {number}
   */
  coinPercentage = 0;

  /**
   * The number of bottles collected by the object.
   * @type {number}
   */
  bottles = 0;

  /**
   * The timestamp of the last hit the object received.
   * @type {number}
   */
  lastHit = 0;

  /**
   * The previously loaded images for animations.
   * @type {string[]|null}
   */
  previousImages = null;

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
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof Bubble) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Moves the object to the right.
   * @param {number} [deltaTime] - The time delta for frame-based movement.
   */
  moveRight(deltaTime) {
    if (!deltaTime) {
      this.x += this.speed;
    } else {
      this.x += this.speed * (deltaTime / 16);
    }
  }

  /**
   * Moves the object to the left.
   * @param {number} [deltaTime] - The time delta for frame-based movement.
   */
  moveLeft(deltaTime) {
    if (!deltaTime) {
      this.x -= this.speed;
    } else {
      this.x -= this.speed * (deltaTime / 16);
    }
  }

  /**
   * Moves the object upward.
   * @param {number} [deltaTime] - The time delta for frame-based movement.
   */
  moveUp(deltaTime) {
    if (!deltaTime) {
      this.y -= this.speed;
    } else {
      this.y -= this.speed * (deltaTime / 16);
    }
  }

  /**
   * Moves the object downward.
   * @param {number} [deltaTime] - The time delta for frame-based movement.
   */
  moveDown(deltaTime) {
    if (!deltaTime) {
      this.y += this.speed;
    } else {
      this.y += this.speed * (deltaTime / 16);
    }
  }

  /**
   * Reduces the object's energy when it is hit.
   * @param {number} damage - The amount of damage to apply.
   */
  hit(damage) {
    if (!this.isHurt()) {
      this.energy -= damage;
      this.lastHit = new Date().getTime();

      if (this.energy < 0) {
        this.energy = 0;
      }
    }
  }

  /**
   * Checks if the object is currently in a hurt state.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    if (!this.lastHit) return false;
    let timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed < 1.5;
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} True if the object's energy is 0, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Increases the number of coins collected by the object and updates the coin percentage.
   */
  countCoins() {
    if (this.coins <= 100) {
      this.coins += 1;
      if (this.coins == 25) {
        this.coinPercentage = 100;
      } else if (this.coins >= 20) {
        this.coinPercentage = 80;
      } else if (this.coins >= 15) {
        this.coinPercentage = 60;
      } else if (this.coins >= 10) {
        this.coinPercentage = 40;
      } else if (this.coins >= 5) {
        this.coinPercentage = 20;
      }
    }
  }

  /**
   * Increases the number of bottles collected by the object.
   */
  countBottles() {
    if (this.bottles <= 100) {
      this.bottles += 20;
    }
  }
}
