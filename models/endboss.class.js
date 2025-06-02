/**
 * Represents the endboss in the game.
 * The endboss is a powerful enemy with multiple states, animations, and behaviors.
 * This class extends the `MovableObject` class.
 */
class Endboss extends MovableObject {
  /**
   * The height of the endboss.
   * @type {number}
   */
  height = 720;

  /**
   * The width of the endboss.
   * @type {number}
   */
  width = 576;

  /**
   * The y-coordinate of the endboss.
   * @type {number}
   */
  y = 0;

  /**
   * The offset values for collision detection.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   * @property {number} bottom - The bottom offset.
   */
  offset = {
    top: 330,
    left: 25,
    right: 60,
    bottom: 450,
  };

  /**
   * The health of the endboss.
   * @type {number}
   */
  health = 10;

  /**
   * The damage dealt by the endboss on collision.
   * @type {number}
   */
  collisionDamage = 20;

  /**
   * The attack power of the endboss.
   * @type {number}
   */
  attackPower = 40;

  /**
   * Indicates whether the endboss has made first contact with the player.
   * @type {boolean}
   */
  firstContact = false;

  /**
   * The type of enemy (endboss).
   * @type {string}
   */
  enemyType = "endboss";

  /**
   * Indicates whether the endboss is in a hurt state.
   * @type {boolean}
   */
  isHurt = false;

  /**
   * Indicates whether the endboss is in a dying state.
   * @type {boolean}
   */
  isDying = false;

  /**
   * Indicates whether the endboss is currently executing an attack.
   * @type {boolean}
   */
  executeAttack = false;

  /**
   * Indicates wether the endboss is moving left or right
   * @type {string}
   */
  moveDirection;

  /**
   * The interval ID for the animation loop.
   * @type {number}
   */
  animationInterval;

  /**
   * The interval ID for starting the attack process.
   * @type {number}
   */
  startAttackInterval;

  /**
   * The interval ID for the attack process.
   * @type {number}
   */
  attackInterval;

  /**
   * The time interval for the endboss's attack in milliseconds.
   * @type {number}
   */
  attackTime;

  /**
   * The duration of each animation frame in milliseconds.
   * @type {number}
   */
  animationTime = 200;

  /**
   * The images used for the endboss's death animation.
   * Defaults to the `IMAGES_DEAD` array.
   * @type {string[]}
   */
  enemyDyingImages = ENDBOSS_IMAGES_DEAD;

  /**
   * The audio file for the endboss's background music.
   * @type {HTMLAudioElement}
   */
  endbossMusic = sounds.endbossMusic;

  /**
   * The audio file for the endboss's attack sound.
   * @type {HTMLAudioElement}
   */
  endbossAttackSound = sounds.endbossAttackSound;

  /**
   * The audio file for the endboss's hurt sound.
   * @type {HTMLAudioElement}
   */
  endbossHurtSound = sounds.poisonedSound;

  /**
   * Creates a new instance of the endboss.
   * Loads all necessary images and starts the animation and attack processes.
   */
  constructor() {
    super().loadImage(ENDBOSS_IMAGES_INTRODUCE[0]);
    this.loadImages(ENDBOSS_IMAGES_INTRODUCE);
    this.loadImages(ENDBOSS_IMAGES_FLOATING);
    this.loadImages(ENDBOSS_IMAGES_HURT);
    this.loadImages(ENDBOSS_IMAGES_ATTACK);
    this.x = 24000;
    this.animate();
    this.getRandomTime();
    this.startAttack();
    pushToIntervals([this.animationInterval, this.startAttackInterval]);
  }

  /**
   * Animates the endboss by determining its current state and playing the appropriate animation.
   */
  animate() {
    let i = 0;
    this.animationInterval = setInterval(() => {
      if (this.isHurt) {
        this.handleHurtAnimation();
      } else {
        this.handleStateAnimation(i);
        i = this.updateAnimationIndex(i);
      }
    }, 150);
  }

  /**
   * Handles the hurt animation for the endboss.
   * Plays the hurt animation and sound if enabled.
   */
  handleHurtAnimation() {
    this.playAnimation(ENDBOSS_IMAGES_HURT);
    if (soundsEnabled && this.endbossHurtSound) {
      this.endbossHurtSound.play();
    }
  }

  /**
   * Handles the animation based on the endboss's current state.
   * @param {number} i - The current animation index.
   */
  handleStateAnimation(i) {
    if (i < 10 && this.firstContact) {
      soundsEnabled && this.setEndbossMusic();
      this.playAnimation(ENDBOSS_IMAGES_INTRODUCE);
    } else if (i >= 10 && this.executeAttack) {
      this.handleAttackAnimation();
    } else if (i >= 10) {
      this.playAnimation(ENDBOSS_IMAGES_FLOATING);
    }
  }

  /**
   * Handles the attack animation for the endboss.
   * Plays the attack animation and sound if enabled.
   */
  handleAttackAnimation() {
    if (soundsEnabled && this.endbossAttackSound) {
      this.endbossAttackSound.volume = 0.2;
      this.endbossAttackSound.play();
    }
    this.playAnimation(ENDBOSS_IMAGES_ATTACK);
  }

  /**
   * Updates the animation index based on the endboss's state.
   * Resets the index if the first contact is not established.
   * @param {number} i - The current animation index.
   * @returns {number} The updated animation index.
   */
  updateAnimationIndex(i) {
    i++;
    if (!this.firstContact) {
      i = 0;
    }
    return i;
  }

  /**
   * Sets the endboss music.
   * Pauses the current music, resets it, and plays the endboss music in a loop.
   */
  setEndbossMusic() {
    if (!currentMusic.paused) {
      currentMusic.pause();
    }
    if (currentMusic) {
      currentMusic.currentTime = 0;
      currentMusic = this.endbossMusic;
      currentMusic.volume = 0.2;
      currentMusic.loop = true;
      currentMusic.play();
    }
  }

  /**
   * Generates a random time for the endboss's attack interval.
   * The time is between 1000ms (1 second) and 4000ms (4 seconds).
   */
  getRandomTime() {
    this.attackTime = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
  }

  /**
   * Handles the hurt state of the endboss.
   * Resets the `isHurt` flag after the hurt animation finishes.
   */
  handleHurt() {
    setTimeout(() => {
      this.isHurt = false;
    }, ENDBOSS_IMAGES_HURT.length * 150);
  }

  /**
   * Starts the attack process for the endboss.
   * Waits for the first contact and then initiates the attack sequence.
   */
  startAttack() {
    this.startAttackInterval = setInterval(() => {
      if (this.firstContact) {
        this.attack();
        pushToIntervals([this.attackInterval]);
        clearInterval(this.startAttackInterval);
      }
    }, 150);
  }

  /**
   * Executes the attack behavior of the endboss.
   * Moves the endboss left, increases its speed, and handles the attack logic.
   */
  attack() {
    this.attackInterval = setInterval(() => {
      if (!this.isDying) {
        this.executeAttack = true;
        this.collisionDamage = 40;
        this.speed = 5 + Math.random() * 5;
        this.moveEndboss();
        this.handleAttack();
      }
    }, this.attackTime);
  }

  /**
   * Starts moving the endboss to the left in an interval.
   * The movement continues as long as the `executeAttack` flag is true.
   * Stops the movement when the attack state ends.
   */
  moveEndboss() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
    }
    this.moveInterval = setInterval(() => {
      if (this.executeAttack) {
        this.getEndbossMovement();
      } else {
        clearInterval(this.moveInterval);
      }
    }, 1000 / 60);
  }

  /**
   * Determines the movement direction of the endboss and updates its position.
   * Moves the endboss to the left or right based on the `moveDirection` property.
   * Also updates the `otherDirection` flag to reflect the current direction.
   */
  getEndbossMovement() {
    switch (this.moveDirection) {
      case "left":
        this.moveLeft();
        this.otherDirection = false;
        break;
      case "right":
        this.moveRight();
        this.otherDirection = true;
      default:
        break;
    }
  }

  /**
   * Handles the attack logic for the endboss.
   * Resets the attack state after the attack animation finishes and moves the endboss back to the right.
   */
  handleAttack() {
    setTimeout(() => {
      this.executeAttack = false;
      this.collisionDamage = 20;
      this.getRandomTime();
    }, ENDBOSS_IMAGES_ATTACK.length * 150);
  }
}
