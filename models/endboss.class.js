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
   * An array of image paths for the endboss's introduction animation.
   * @type {string[]}
   */
  IMAGES_INTRODUCE = [
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/1.png",
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/2.png",
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/3.png",
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/4.png",
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/5.png",
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/6.png",
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/7.png",
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/8.png",
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/9.png",
    "graphics/2.Enemy/3 Final Enemy/1.Introduce/10.png",
  ];

  /**
   * An array of image paths for the endboss's floating animation.
   * @type {string[]}
   */
  IMAGES_FLOATING = [
    "graphics/2.Enemy/3 Final Enemy/2.floating/1.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/2.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/3.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/4.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/5.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/6.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/7.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/8.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/9.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/10.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/11.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/12.png",
    "graphics/2.Enemy/3 Final Enemy/2.floating/13.png",
  ];

  /**
   * An array of image paths for the endboss's attack animation.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    "graphics/2.Enemy/3 Final Enemy/Attack/1.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/2.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/3.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/4.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/5.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

  /**
   * An array of image paths for the endboss's hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "graphics/2.Enemy/3 Final Enemy/Hurt/1.png",
    "graphics/2.Enemy/3 Final Enemy/Hurt/2.png",
    "graphics/2.Enemy/3 Final Enemy/Hurt/3.png",
    "graphics/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  /**
   * An array of image paths for the endboss's death animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "graphics/2.Enemy/3 Final Enemy/Dead/0.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/1.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/2.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/3.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/4.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/5.png",
  ];

  /**
   * The images used for the endboss's death animation.
   * Defaults to the `IMAGES_DEAD` array.
   * @type {string[]}
   */
  enemyDyingImages = this.IMAGES_DEAD;

  /**
   * The audio file for the endboss's background music.
   * @type {HTMLAudioElement}
   */
  endbossMusic = new Audio("audio/endboss-music.mp3");

  /**
   * The audio file for the endboss's attack sound.
   * @type {HTMLAudioElement}
   */
  endbossAttackSound = new Audio("audio/endboss-attack.mp3");

  /**
   * The audio file for the endboss's hurt sound.
   * @type {HTMLAudioElement}
   */
  endbossHurtSound = new Audio("audio/poisoned.mp3");

  /**
   * Creates a new instance of the endboss.
   * Loads all necessary images and starts the animation and attack processes.
   */
  constructor() {
    super().loadImage(this.IMAGES_INTRODUCE[0]);
    this.loadImages(this.IMAGES_INTRODUCE);
    this.loadImages(this.IMAGES_FLOATING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
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
    this.playAnimation(this.IMAGES_HURT);
    soundsEnabled && this.endbossHurtSound.play();
  }

  /**
   * Handles the animation based on the endboss's current state.
   * @param {number} i - The current animation index.
   */
  handleStateAnimation(i) {
    if (i < 10 && this.firstContact) {
      soundsEnabled && this.setEndbossMusic();
      this.playAnimation(this.IMAGES_INTRODUCE);
    } else if (i >= 10 && this.executeAttack) {
      this.handleAttackAnimation();
    } else if (i >= 10) {
      this.playAnimation(this.IMAGES_FLOATING);
    }
  }

  /**
   * Handles the attack animation for the endboss.
   * Plays the attack animation and sound if enabled.
   */
  handleAttackAnimation() {
    if (soundsEnabled) {
      this.endbossAttackSound.volume = 0.2;
      this.endbossAttackSound.play();
    }
    this.playAnimation(this.IMAGES_ATTACK);
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
    currentMusic.pause();
    currentMusic.currentTime = 0;
    currentMusic = this.endbossMusic;
    currentMusic.volume = 0.2;
    currentMusic.loop = true;
    currentMusic.play();
  }

  /**
   * Generates a random time for the endboss's attack interval.
   * The time is between 1000ms (1 second) and 4000ms (4 seconds).
   */
  getRandomTime() {
    this.attackTime = Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
  }

  /**
   * Handles the hurt state of the endboss.
   * Resets the `isHurt` flag after the hurt animation finishes.
   */
  handleHurt() {
    setTimeout(() => {
      this.isHurt = false;
    }, this.IMAGES_HURT.length * 150);
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
        this.startMovingLeft();
        this.handleAttack();
      }
    }, this.attackTime);
  }

  /**
   * Starts moving the endboss to the left in an interval.
   * The movement continues as long as the `executeAttack` flag is true.
   * Stops the movement when the attack state ends.
   */
  startMovingLeft() {
    if (this.moveLeftInterval) {
      clearInterval(this.moveLeftInterval);
    }

    this.moveLeftInterval = setInterval(() => {
      if (this.executeAttack) {
        this.moveLeft();
      } else {
        clearInterval(this.moveLeftInterval);
      }
    }, 1000 / 60);
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
    }, this.IMAGES_ATTACK.length * 150);
  }
}
