import {
  handleCollisionsAndSounds,
  handleMovement,
  handleMovementStart,
  handleIdleMovement,
  handleDeathAnimation,
  getAnimationImages,
  getFinSlapImages,
  isMoving,
  getIdleImages,
  getHurtImages,
  getHurtSound,
  getDyingImages,
  getBubbleAttackImages,
} from '../js/character.handler.js';

/**
 * Represents the main character in the game.
 * Extends the MovableObject class to provide movement and animation functionality.
 */
export class Character extends MovableObject {
  /** @type {number} The height of the character. */
  height = 500;

  /** @type {number} The width of the character. */
  width = 407;

  /** @type {number} The movement speed of the character. */
  speed = 10;

  /** @type {number} The idle time counter for the character. */
  idleTime = 0;
  idleInterval;
  timeId;
  moveId;
  attackId;
  animationId;

  lastMoveFrameTime = 0;
  lastAnimateFrameTime = 0;
  moveFrameDuration = 16;
  animateFrameDuration = 125;
  rotation = 0;
  animateIntervalReached = false;
  moveIntervalReached = false;

  y = 150;

  /** @type {number} The X-coordinate of the character. */
  x = 220;

  /** @type {boolean} Indicates if the character can move to the right. */
  canMoveRight = true;

  /** @type {boolean} Indicates if the character can move to the left. */
  canMoveLeft = true;

  /** @type {boolean} Indicates if the character can move upwards. */
  canMoveUp = true;

  /** @type {boolean} Indicates if the character can move downwards. */
  canMoveDown = true;

  /** @type {boolean} Indicates if the character is currently executing an attack. */
  executeAttack = false;

  /** @type {Object} The offset values for collision detection. */
  offset = {
    top: 240,
    left: 80,
    right: 160,
    bottom: 360,
  };

  /** @type {string|null} The type of enemy the character is interacting with. */
  enemyType = null;

  /** @type {number} The timestamp of the last movement frame. */
  lastMoveFrameTime = 0;

  /** @type {number} The timestamp of the last animation frame. */
  lastAnimateFrameTime = 0;

  /** @type {number} The duration between movement frames in milliseconds. */
  moveFrameDuration = 16;

  /** @type {number} The duration between animation frames in milliseconds. */
  animateFrameDuration = 125;

  /** @type {boolean} Indicates if the animation interval has been reached. */
  animateIntervalReached = false;

  /** @type {boolean} Indicates if the movement interval has been reached. */
  moveIntervalReached = false;

  /** @type {number} The rotation angle of the character. */
  rotation = 0;

  /** @type {Array<string>} The image paths for the idle animation. */
  IMAGES_IDLE = [
    "graphics/1.Sharkie/1.IDLE/1.png",
    "graphics/1.Sharkie/1.IDLE/2.png",
    "graphics/1.Sharkie/1.IDLE/3.png",
    "graphics/1.Sharkie/1.IDLE/4.png",
    "graphics/1.Sharkie/1.IDLE/5.png",
    "graphics/1.Sharkie/1.IDLE/6.png",
    "graphics/1.Sharkie/1.IDLE/7.png",
    "graphics/1.Sharkie/1.IDLE/8.png",
    "graphics/1.Sharkie/1.IDLE/9.png",
    "graphics/1.Sharkie/1.IDLE/10.png",
    "graphics/1.Sharkie/1.IDLE/11.png",
    "graphics/1.Sharkie/1.IDLE/12.png",
    "graphics/1.Sharkie/1.IDLE/13.png",
    "graphics/1.Sharkie/1.IDLE/14.png",
    "graphics/1.Sharkie/1.IDLE/15.png",
    "graphics/1.Sharkie/1.IDLE/16.png",
    "graphics/1.Sharkie/1.IDLE/17.png",
    "graphics/1.Sharkie/1.IDLE/18.png",
  ];

  /** @type {Array<string>} The image paths for the "fall asleep" animation. */
  IMAGES_FALL_ASLEEP = [
    "graphics/1.Sharkie/2.Long_IDLE/I1.png",
    "graphics/1.Sharkie/2.Long_IDLE/I2.png",
    "graphics/1.Sharkie/2.Long_IDLE/I3.png",
    "graphics/1.Sharkie/2.Long_IDLE/I4.png",
    "graphics/1.Sharkie/2.Long_IDLE/I5.png",
    "graphics/1.Sharkie/2.Long_IDLE/I6.png",
    "graphics/1.Sharkie/2.Long_IDLE/I7.png",
    "graphics/1.Sharkie/2.Long_IDLE/I8.png",
    "graphics/1.Sharkie/2.Long_IDLE/I9.png",
    "graphics/1.Sharkie/2.Long_IDLE/I10.png",
  ];

  /** @type {Array<string>} The image paths for the sleep animation. */
  IMAGES_SLEEP = [
    "graphics/1.Sharkie/2.Long_IDLE/I11.png",
    "graphics/1.Sharkie/2.Long_IDLE/I11.png",
    "graphics/1.Sharkie/2.Long_IDLE/I12.png",
    "graphics/1.Sharkie/2.Long_IDLE/I12.png",
    "graphics/1.Sharkie/2.Long_IDLE/I13.png",
    "graphics/1.Sharkie/2.Long_IDLE/I13.png",
    "graphics/1.Sharkie/2.Long_IDLE/I14.png",
    "graphics/1.Sharkie/2.Long_IDLE/I14.png",
  ];

  /** @type {Array<string>} The image paths for the swimming animation. */
  IMAGES_SWIM = [
    "graphics/1.Sharkie/3.Swim/1.png",
    "graphics/1.Sharkie/3.Swim/2.png",
    "graphics/1.Sharkie/3.Swim/3.png",
    "graphics/1.Sharkie/3.Swim/4.png",
    "graphics/1.Sharkie/3.Swim/5.png",
    "graphics/1.Sharkie/3.Swim/6.png",
  ];

  /** @type {Array<string>} The image paths for the hurt (poisoned) animation. */
  IMAGES_HURT_POISONED = [
    "graphics/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "graphics/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "graphics/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "graphics/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];

  /** @type {Array<string>} The image paths for the hurt (electric shock) animation. */
  IMAGES_HURT_ELECTRO_SHOCK = [
    "graphics/1.Sharkie/5.Hurt/2.Electric shock/o1.png",
    "graphics/1.Sharkie/5.Hurt/2.Electric shock/o2.png",
  ];

  /** @type {Array<string>} The image paths for the dead (poisoned) animation. */
  IMAGES_DEAD_POISONED = [
    "graphics/1.Sharkie/6.dead/1.Poisoned/1.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/2.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/3.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/4.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/5.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/6.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/7.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/8.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/8.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/10.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/11.png",
    "graphics/1.Sharkie/6.dead/1.Poisoned/12.png",
  ];

  /** @type {Array<string>} The image paths for the dead (electric shock) animation. */
  IMAGES_DEAD_ELECTRO_SHOCK = [
    "graphics/1.Sharkie/6.dead/2.Electro_shock/1.png",
    "graphics/1.Sharkie/6.dead/2.Electro_shock/2.png",
    "graphics/1.Sharkie/6.dead/2.Electro_shock/3.png",
    "graphics/1.Sharkie/6.dead/2.Electro_shock/4.png",
    "graphics/1.Sharkie/6.dead/2.Electro_shock/5.png",
    "graphics/1.Sharkie/6.dead/2.Electro_shock/6.png",
    "graphics/1.Sharkie/6.dead/2.Electro_shock/7.png",
    "graphics/1.Sharkie/6.dead/2.Electro_shock/8.png",
    "graphics/1.Sharkie/6.dead/2.Electro_shock/9.png",
    "graphics/1.Sharkie/6.dead/2.Electro_shock/10.png",
  ];

  /** @type {Array<string>} The image paths for the bubble attack animation. */
  IMAGES_ATTACK_BUBBLES = [
    "graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png",
  ];

  /** @type {Array<string>} The image paths for the poisoned bubble attack animation. */
  IMAGES_ATTACK_POISONED_BUBBLES = [
    "graphics/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png",
    "graphics/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png",
  ];

  /** @type {Array<string>} The image paths for the fin slap attack animation. */
  IMAGES_ATTACK_FIN_SLAP = [
    "graphics/1.Sharkie/4.Attack/Fin slap/1.png",
    "graphics/1.Sharkie/4.Attack/Fin slap/2.png",
    "graphics/1.Sharkie/4.Attack/Fin slap/3.png",
    "graphics/1.Sharkie/4.Attack/Fin slap/4.png",
    "graphics/1.Sharkie/4.Attack/Fin slap/5.png",
    "graphics/1.Sharkie/4.Attack/Fin slap/6.png",
    "graphics/1.Sharkie/4.Attack/Fin slap/7.png",
    "graphics/1.Sharkie/4.Attack/Fin slap/8.png",
  ];
  world;
  swimmingSound = new Audio("audio/swimming.mp3");

  /** @type {Audio} The sound effect for snoring. */
  snoringSound = new Audio("audio/snoring.mp3");

  /** @type {Audio} The sound effect for the fin slap attack. */
  slapSound = new Audio("audio/fin-slap.mp3");

  /** @type {Audio} The sound effect for an electric shock. */
  electricShockSound = new Audio("audio/electric-shock.mp3");

  /** @type {Audio} The sound effect for being poisoned. */
  posionedSound = new Audio("audio/poisoned.mp3");

  /** @type {Audio} The sound effect for collecting a coin. */
  collectCoinSound = new Audio("audio/collect-coins.mp3");

  /** @type {Audio} The sound effect for collecting a bottle. */
  collectBottleSound = new Audio("audio/collect-bottle.mp3");

  /** @type {Audio} The sound effect for colliding with a barrier. */
  barrierCollisionSound = new Audio("audio/collision.mp3");

  /**
   * Initializes a new instance of the Character class.
   */
  constructor() {
    super().loadImage("graphics/1.Sharkie/1.IDLE/1.png");
    this.loadImagesToConstructor();
    this.lastMoveFrameTime = performance.now();
    this.timeId = requestAnimationFrame((time) => this.getTimeInterval(time));
    this.moveId = requestAnimationFrame((time) => this.moveCharacter(time));
    this.attackId = requestAnimationFrame(this.characterAttack.bind(this));
    this.animationId = requestAnimationFrame((time) => this.animate(time));
    this.startIdleTimer();
    gameRunning = true;
    pushToIntervals([this.idleInterval]);
    pushToRequests([this.timeId, this.moveId, this.attackId, this.animationId]);
  }

  /**
   * Loads all necessary images for the character's animations.
   */
  loadImagesToConstructor() {
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_FALL_ASLEEP);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_HURT_POISONED);
    this.loadImages(this.IMAGES_HURT_ELECTRO_SHOCK);
    this.loadImages(this.IMAGES_DEAD_POISONED);
    this.loadImages(this.IMAGES_DEAD_ELECTRO_SHOCK);
    this.loadImages(this.IMAGES_ATTACK_BUBBLES);
    this.loadImages(this.IMAGES_ATTACK_POISONED_BUBBLES);
    this.loadImages(this.IMAGES_ATTACK_FIN_SLAP);
  }

  /**
   * Moves the character based on the current time and keyboard input.
   * @param {number} currentTime - The current timestamp.
   */
  moveCharacter(currentTime) {
    let deltaTime = this.setTimeInterval(currentTime);

    if (deltaTime) {
      handleCollisionsAndSounds(this);
      handleMovement(this, deltaTime);
      handleIdleMovement(this.deltaTime);
      this.world.cameraX = -this.x + 220;
    }

    gameRunning && requestAnimationFrame((time) => this.moveCharacter(time));
  }

  /**
   * Handles collisions and plays appropriate sounds.
   */
/*   handleCollisionsAndSounds() {
    this.checkBarrierCollisions();
    soundsEnabled && this.playCollisionSound();
    this.swimmingSound.pause();
  } */

  /**
   * Handles the character's movement based on keyboard input.
   * @param {number} deltaTime - The time elapsed since the last frame.
   */
/*   handleMovement(deltaTime) {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX && this.canMoveRight) {
      this.moveRight(deltaTime);
      this.handleMovementStart("right");
    }
    if (this.world.keyboard.LEFT && this.x > this.world.level.levelStartX && this.canMoveLeft) {
      this.moveLeft(deltaTime);
      this.handleMovementStart("left");
    }
    if (this.world.keyboard.UP && this.y > this.world.level.levelStartY && this.canMoveUp) {
      this.moveUp(deltaTime);
      this.handleMovementStart();
    }
    if (this.world.keyboard.DOWN && this.y < this.world.level.levelEndY && this.canMoveDown) {
      this.moveDown(deltaTime);
      this.handleMovementStart();
    }
  } */

  /**
   * Handles the character's idle movement when no input is detected.
   * @param {number} deltaTime - The time elapsed since the last frame.
   */
  handleIdleMovement(deltaTime) {
    if (this.idleTime >= 150 && this.y < this.world.level.levelEndY && this.canMoveDown) {
      if (soundsEnabled) {
        this.snoringSound.loop = true;
        this.snoringSound.play();
      }
      this.moveDown(deltaTime / 5);
    }
  }

  /**
   * Handles the start of a movement action and resets idle-related states.
   * @param {string} [direction] - The direction of movement ("right" or "left").
   */
/*   handleMovementStart(direction) {
    clearInterval(this.gravityInterval);
    soundsEnabled && this.swimmingSound.play();
    this.snoringSound.pause();
    this.idleTime = 0;
    switch (direction) {
      case "right":
        this.otherDirection = false;
        break;
      case "left":
        this.otherDirection = true;
        break;
      default:
        break;
    }
  } */

  /**
   * Checks for collisions with barriers and updates movement permissions.
   */
  checkBarrierCollisions() {
    if (!this.isDead()) {
      this.canMoveRight = true;
      this.canMoveLeft = true;
      this.canMoveUp = true;
      this.canMoveDown = true;
    }
    this.world.checkBarrierCollisions();
  }

  /**
   * Plays a collision sound if the character collides with a barrier.
   */
  playCollisionSound() {
    let keyboard = this.world.keyboard;
    if (
      (keyboard.LEFT || keyboard.RIGHT || keyboard.UP || keyboard.DOWN) &&
      (!this.canMoveLeft ||
        !this.canMoveRight ||
        !this.canMoveUp ||
        !this.canMoveDown)
    ) {
      this.barrierCollisionSound.play();
    }
  }

  /**
   * Handles the character's attack actions based on keyboard input.
   */
  characterAttack() {
    if (this.world.keyboard.D) {
      this.idleTime = 0;
    } else if (this.world.keyboard.SPACE) {
      this.idleTime = 0;
      if (soundsEnabled) {
        this.slapSound.currentTime = 0;
        this.slapSound.play();
      }
    }
    gameRunning && requestAnimationFrame(this.characterAttack.bind(this));
  }

  /**
   * Executes an attack on an enemy and reduces its health.
   * @param {Object} enemy - The enemy being attacked.
   */
  attack(enemy) {
    if (
      !this.isHurt() &&
      ((enemy.enemyType == "pufferFish" && this.world.keyboard.SPACE) ||
        ((enemy.enemyType == "jellyFish" || enemy.enemyType == "endboss") &&
          !this.world.keyboard.SPACE))
    ) {
      enemy.health -= this.world.attackDamage;
    }
  }

  /**
   * Updates the status bar for bottles based on the current bottle count.
   */
  updateBottleStatusBar() {
    this.world.statusBarBottles.setPercentage(
      this.bottles,
      this.world.statusBarBottles.IMAGES_BOTTLES
    );
  }

  /**
   * Determines the type of bubble attack based on the number of bottles.
   * @returns {string} The type of bubble attack ("poisoned" or "normal").
   */
  getBubbleImages() {
    if (this.bottles > 0) {
      return "poisoned";
    } else {
      return "normal";
    }
  }

  /**
   * Calculates the character's movement properties based on keyboard input.
   * @returns {Object} An object containing the X-coordinate, Y-coordinate, and speed.
   */
  getCharacterMovement() {
    if (this.world.keyboard.RIGHT) {
      return { x: 300, y: 280, speed: 10 };
    } else if (this.world.keyboard.LEFT) {
      return { x: 0, y: 280, speed: -30 };
    } else if (this.otherDirection) {
      return { x: 0, y: 280, speed: -20 };
    }
    return { x: 300, y: 280, speed: 0 };
  }

  /**
   * Starts a timer to track the idle time of the character.
   * Increments the `idleTime` property every 100 milliseconds.
   */
  startIdleTimer() {
    this.idleInterval = setInterval(() => {
      this.idleTime += 1;
    }, 100);
  }

  /**
   * Retrieves the appropriate animation images based on the character's current state.
   * @returns {Array<string>} The array of image paths for the current animation.
   */
/*   getAnimationImages() {
    if (this.isDead()) return this.getDyingImages();
    if (this.isHurt()) return this.getHurtImages();
    if (this.world.keyboard.D) return this.getBubbleAttackImages();
    if (this.world.keyboard.SPACE) return this.getFinSlapImages();
    if (this.isMoving()) return this.IMAGES_SWIM;
    return this.getIdleImages();
  } */

  /**
   * Retrieves the images for the fin slap attack animation.
   * Sets the attack damage to 2.
   * @returns {Array<string>} The array of image paths for the fin slap attack animation.
   */
  /* getFinSlapImages() {
    this.world.attackDamage = 2;
    return this.IMAGES_ATTACK_FIN_SLAP;
  } */

  /**
   * Checks if the character is currently moving based on keyboard input.
   * @returns {boolean} True if the character is moving, otherwise false.
   */
  /* isMoving() {
    const { RIGHT, LEFT, UP, DOWN } = this.world.keyboard;
    return RIGHT || LEFT || UP || DOWN;
  } */

  /**
   * Retrieves the images for the idle animation based on the idle time.
   * @returns {Array<string>} The array of image paths for the idle animation.
   */
  /* getIdleImages() {
    if (this.idleTime >= 150 && this.idleTime < 164) return this.IMAGES_FALL_ASLEEP;
    if (this.idleTime >= 164) return this.IMAGES_SLEEP;
    return this.IMAGES_IDLE;
  } */

  /**
   * Updates the enemy type when the character collides with an enemy.
   * @param {Object} enemy - The enemy object the character collided with.
   */
  collisionWithEnemy(enemy) {
    this.enemyType = enemy.enemyType;
  }

  /**
   * Retrieves the images for the hurt animation based on the enemy type.
   * @returns {Array<string>} The array of image paths for the hurt animation.
   */
  /* getHurtImages() {
    switch (this.enemyType) {
      case "pufferFish":
        return this.IMAGES_HURT_POISONED;
      case "endboss":
        return this.IMAGES_HURT_POISONED;
      case "jellyFish":
        return this.IMAGES_HURT_ELECTRO_SHOCK;
    }
  } */

  /**
   * Retrieves the sound effect to play when the character is hurt.
   * @returns {Audio} The audio object for the hurt sound effect.
   */
  /* getHurtSound() {
    switch (this.enemyType) {
      case "pufferFish":
        return this.posionedSound;
      case "endboss":
        return this.posionedSound;
      case "jellyFish":
        return this.electricShockSound;
    }
  } */

  /**
   * Retrieves the images for the dying animation based on the enemy type.
   * @returns {Array<string>} The array of image paths for the dying animation.
   */
  /* getDyingImages() {
    switch (this.enemyType) {
      case "pufferFish":
        return this.IMAGES_DEAD_POISONED;
      case "endboss":
        return this.IMAGES_DEAD_POISONED;
      case "jellyFish":
        return this.IMAGES_DEAD_ELECTRO_SHOCK;
    }
  } */

  /**
   * Retrieves the images for the bubble attack animation based on the number of bottles.
   * @returns {Array<string>} The array of image paths for the bubble attack animation.
   */
  /* getBubbleAttackImages() {
    if (this.bottles > 0) {
      return this.IMAGES_ATTACK_POISONED_BUBBLES;
    } else {
      return this.IMAGES_ATTACK_BUBBLES;
    }
  } */

  /**
 * Animates the character's actions based on the current state and time.
 * Handles animations, attack sequences, and death animations.
 * @param {number} currentTime - The current timestamp.
 */
  animate(currentTime) {
    let deltaTime = this.setTimeInterval(currentTime);
    let imageArray = getAnimationImages(this);

    if (this.animateIntervalReached) {
      this.lastAnimateFrameTime = currentTime;
      this.playAnimation(imageArray);
      this.stopAttackAnimation(imageArray);
    }

    handleDeathAnimation(this, deltaTime);
    this.animationId = requestAnimationFrame((time) => this.animate(time));
  }

  /**
   * Handles the death animation for the character.
   * Determines the type of death animation based on the enemy type.
   * @param {number} deltaTime - The time elapsed since the last frame.
   */
/*   handleDeathAnimation(deltaTime) {
    if (this.isDead()) {
      if (this.enemyType === "jellyFish") {
        this.animateJellyFishDeath(deltaTime);
      } else {
        this.animateDefaultDeath(deltaTime);
      }
    }
  }
 */
  /**
   * Animates the death sequence for the character when killed by a jellyfish.
   * Moves the character downward and cancels the animation after a delay.
   * @param {number} deltaTime - The time elapsed since the last frame.
   */
  animateJellyFishDeath(deltaTime) {
    if (this.y < this.world.level.levelEndY - 30) {
      this.moveDown(deltaTime / 5);
    }
    setTimeout(() => cancelAnimationFrame(this.animationId), 1350);
  }

  /**
   * Animates the default death sequence for the character.
   * Moves the character upward and cancels the animation after a delay.
   * @param {number} deltaTime - The time elapsed since the last frame.
   */
  animateDefaultDeath(deltaTime) {
    if (this.y > this.world.level.levelStartY + 100) {
      this.moveUp(deltaTime / 5);
    }
    setTimeout(() => cancelAnimationFrame(this.animationId), 1600);
  }

  /**
   * Calculates the time intervals for movement and animation.
   * Updates the last frame times and determines if intervals have been reached.
   * @param {number} currentTime - The current timestamp.
   */
  getTimeInterval(currentTime) {
    if (!this.lastMoveFrameTime) this.lastMoveFrameTime = currentTime;
    if (!this.lastAnimateFrameTime) this.lastAnimateFrameTime = currentTime;

    let moveDeltaTime = currentTime - this.lastMoveFrameTime;
    let animateDeltaTime = currentTime - this.lastAnimateFrameTime;

    this.moveIntervalReached = moveDeltaTime >= this.moveFrameDuration;
    this.animateIntervalReached = animateDeltaTime >= this.animateFrameDuration;

    if (this.animateIntervalReached) {
      this.lastAnimateFrameTime = currentTime;
    }

    gameRunning && requestAnimationFrame((time) => this.getTimeInterval(time));
  }

  /**
   * Sets the time interval for movement and returns the elapsed time.
   * @param {number} currentTime - The current timestamp.
   * @returns {number|null} The elapsed time if the interval is reached, otherwise null.
   */
  setTimeInterval(currentTime) {
    let deltaTime = currentTime - this.lastMoveFrameTime;
    if (this.moveIntervalReached) {
      this.lastMoveFrameTime = currentTime;
      return deltaTime;
    }
    return null;
  }

  /**
   * Stops the attack animation when the last frame of the animation is reached.
   * Handles bubble and fin slap attacks based on keyboard input.
   * @param {Array} imageArray - The array of images used for the animation.
   */
  stopAttackAnimation(imageArray) {
    if (this.currentImage == imageArray.length - 1) {
      if (this.world.keyboard.D && !this.isHurt()) {
        this.handleBubbleAttack();
      }
      if (this.world.keyboard.SPACE) {
        this.handleFinSlapAttack();
      }
    }
  }

  /**
   * Handles the bubble attack action.
   * Calculates the attack position and damage, and updates the bottle status bar.
   */
  handleBubbleAttack() {
    const { x, y, speed } = this.getCharacterMovement();
    this.world.checkAttacks(x, y, speed, this.getBubbleImages());
    if (this.bottles > 0) {
      this.world.attackDamage = 2;
      this.bottles -= 20;
    } else {
      this.world.attackDamage = 1;
    }
    this.updateBottleStatusBar();
  }

  /**
   * Handles the fin slap attack action.
   * Sets the attack damage and disables the SPACE key input.
   */
  handleFinSlapAttack() {
    this.world.attackDamage = 1;
    this.world.keyboard.SPACE = false;
  }
}
