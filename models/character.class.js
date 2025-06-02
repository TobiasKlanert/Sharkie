/**
 * Represents the main character in the game.
 * Extends the MovableObject class to provide movement and animation functionality.
 */
class Character extends MovableObject {
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

  world;
  swimmingSound = sounds.characterSwimmingSound;

  /** @type {Audio} The sound effect for snoring. */
  snoringSound = sounds.characterSnoringSound;

  /** @type {Audio} The sound effect for the fin slap attack. */
  slapSound = sounds.finSlapSound;

  /** @type {Audio} The sound effect for an electric shock. */
  electricShockSound = sounds.electricShockSound;

  /** @type {Audio} The sound effect for being poisoned. */
  poisonedSound = sounds.poisonedSound;

  /** @type {Audio} The sound effect for collecting a coin. */
  collectCoinSound = sounds.collectCoinsSound;

  /** @type {Audio} The sound effect for collecting a bottle. */
  collectBottleSound = sounds.collectBottleSound;

  /** @type {Audio} The sound effect for colliding with a barrier. */
  barrierCollisionSound = sounds.collisionSound;

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
    this.loadImages(CHAR_IMAGES_IDLE);
    this.loadImages(CHAR_IMAGES_FALL_ASLEEP);
    this.loadImages(CHAR_IMAGES_SLEEP);
    this.loadImages(CHAR_IMAGES_SWIM);
    this.loadImages(CHAR_IMAGES_HURT_POISONED);
    this.loadImages(CHAR_IMAGES_HURT_ELECTRO_SHOCK);
    this.loadImages(CHAR_IMAGES_DEAD_POISONED);
    this.loadImages(CHAR_IMAGES_DEAD_ELECTRO_SHOCK);
    this.loadImages(CHAR_IMAGES_ATTACK_BUBBLES);
    this.loadImages(CHAR_IMAGES_ATTACK_POISONED_BUBBLES);
    this.loadImages(CHAR_IMAGES_ATTACK_FIN_SLAP);
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
      handleIdleMovement(this, deltaTime);
      this.world.cameraX = -this.x + 220;
    }

    gameRunning && requestAnimationFrame((time) => this.moveCharacter(time));
  }

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
      if (this.barrierCollisionSound) {
        this.barrierCollisionSound.play();
      }
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
      if (soundsEnabled && this.slapSound) {
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
   * Updates the enemy type when the character collides with an enemy.
   * @param {Object} enemy - The enemy object the character collided with.
   */
  collisionWithEnemy(enemy) {
    this.enemyType = enemy.enemyType;
  }

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
