class Character extends MovableObject {
  height = 300;
  width = 300;
  speed = 10;
  idleTime = 0;
  idleInterval;
  animationId;

  lastMoveFrameTime = 0;
  lastAnimateFrameTime = 0;
  moveFrameDuration = 16;
  animateFrameDuration = 125;
  animateIntervalReached = false;
  moveIntervalReached = false;

  y = 150;
  x = 220;

  canMoveRight = true;
  canMoveLeft = true;
  canMoveUp = true;
  canMoveDown = true;

  executeAttack = false;

  offset = {
    top: 140,
    left: 60,
    right: 120,
    bottom: 215,
  };

  enemyType = null;

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
  IMAGES_SWIM = [
    "graphics/1.Sharkie/3.Swim/1.png",
    "graphics/1.Sharkie/3.Swim/2.png",
    "graphics/1.Sharkie/3.Swim/3.png",
    "graphics/1.Sharkie/3.Swim/4.png",
    "graphics/1.Sharkie/3.Swim/5.png",
    "graphics/1.Sharkie/3.Swim/6.png",
  ];
  IMAGES_HURT_POISONED = [
    "graphics/1.Sharkie/5.Hurt/1.Poisoned/1.png",
    "graphics/1.Sharkie/5.Hurt/1.Poisoned/2.png",
    "graphics/1.Sharkie/5.Hurt/1.Poisoned/3.png",
    "graphics/1.Sharkie/5.Hurt/1.Poisoned/4.png",
  ];
  IMAGES_HURT_ELECTRO_SHOCK = [
    "graphics/1.Sharkie/5.Hurt/2.Electric shock/o1.png",
    "graphics/1.Sharkie/5.Hurt/2.Electric shock/o2.png",
  ];
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
  swimming_sound = new Audio("audio/swimming.mp3");

  constructor() {
    super().loadImage("graphics/1.Sharkie/1.IDLE/1.png");
    this.loadImagesToConstructor();
    this.lastMoveFrameTime = performance.now();
    requestAnimationFrame((time) => this.getTimeInterval(time));
    requestAnimationFrame((time) => this.moveCharacter(time));
    requestAnimationFrame(this.characterAttack.bind(this));
    this.animationId = requestAnimationFrame((time) => this.animate(time));
    this.startIdleTimer();
    this.pushToIntervals([this.idleInterval]);
  }

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

  moveCharacter(currentTime) {
    let deltaTime = this.setTimeInterval(currentTime);

    if (deltaTime) {
      this.checkBarrierCollisions();
      this.swimming_sound.pause();
      if (
        this.world.keyboard.RIGHT &&
        this.x < this.world.level.levelEndX &&
        this.canMoveRight
      ) {
        this.moveRight(deltaTime);
        this.handleMovementStart("right");
      }
      if (
        this.world.keyboard.LEFT &&
        this.x > this.world.level.levelStartX &&
        this.canMoveLeft
      ) {
        this.moveLeft(deltaTime);
        this.handleMovementStart("left");
      }
      if (
        this.world.keyboard.UP &&
        this.y > this.world.level.levelStartY &&
        this.canMoveUp
      ) {
        this.moveUp(deltaTime);
        this.handleMovementStart();
      }
      if (
        this.world.keyboard.DOWN &&
        this.y < this.world.level.levelEndY &&
        this.canMoveDown
      ) {
        this.moveDown();
        this.handleMovementStart();
      }
      if (this.idleTime >= 150 && this.y < this.world.level.levelEndY) {
        this.moveDown(deltaTime / 5);
      }
      this.world.cameraX = -this.x + 220;
    }
    requestAnimationFrame((time) => this.moveCharacter(time));
  }

  handleMovementStart(direction) {
    clearInterval(this.gravityInterval);
    this.swimming_sound.play();
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
  }

  checkBarrierCollisions() {
    this.canMoveRight = true;
    this.canMoveLeft = true;
    this.canMoveUp = true;
    this.canMoveDown = true;

    this.world.checkBarrierCollisions();
  }

  characterAttack() {
    if (this.world.keyboard.D || this.world.keyboard.SPACE) {
      this.idleTime = 0;
    }

    requestAnimationFrame(this.characterAttack.bind(this));
  }

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

  startIdleTimer() {
    this.idleInterval = setInterval(() => {
      this.idleTime += 1;
    }, 100);
  }

  getAnimationImages() {
    if (this.isDead()) {
      return this.IMAGES_DEAD_POISONED;
    } else if (this.isHurt()) {
      return this.getHurtImages();
    } else if (this.world.keyboard.D) {
      return this.getBubbleAttackImages();
    } else if (this.world.keyboard.SPACE) {
      this.world.attackDamage = 2;
      return this.IMAGES_ATTACK_FIN_SLAP;
    } else if (
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT ||
      this.world.keyboard.UP ||
      this.world.keyboard.DOWN
    ) {
      return this.IMAGES_SWIM;
    } else {
      if (this.idleTime >= 150 && this.idleTime < 164) {
        return this.IMAGES_FALL_ASLEEP;
      } else if (this.idleTime >= 164) {
        return this.IMAGES_SLEEP;
      } else {
        return this.IMAGES_IDLE;
      }
    }
  }

  collisionWithEnemy(enemy) {
    this.enemyType = enemy.enemyType;
  }

  getHurtImages() {
    switch (this.enemyType) {
      case "pufferFish":
        return this.IMAGES_HURT_POISONED;
      case "endboss":
        return this.IMAGES_HURT_POISONED;
      case "jellyFish":
        return this.IMAGES_HURT_ELECTRO_SHOCK;
    }
  }

  getBubbleAttackImages() {
    if (this.bottles > 0) {
      return this.IMAGES_ATTACK_POISONED_BUBBLES;
    } else {
      return this.IMAGES_ATTACK_BUBBLES;
    }
  }

  animate(currentTime) {
    let imageArray = this.getAnimationImages();

    if (this.animateIntervalReached) {
      this.lastAnimateFrameTime = currentTime;
      this.playAnimation(imageArray);
      this.stopAttackAnimation(imageArray);
    }

    this.animationId = requestAnimationFrame((time) => this.animate(time));
    if (this.isDead()) {
      setTimeout(() => {
        cancelAnimationFrame(this.animationId);
      }, 1000);
    }
  }

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

    requestAnimationFrame((time) => this.getTimeInterval(time));
  }

  setTimeInterval(currentTime) {
    let deltaTime = currentTime - this.lastMoveFrameTime;
    if (this.moveIntervalReached) {
      this.lastMoveFrameTime = currentTime;
      return deltaTime;
    }
    return null;
  }

  stopAttackAnimation(imageArray) {
    if (this.currentImage == imageArray.length - 1) {
      if (this.world.keyboard.D && !this.isHurt()) {
        const { x, y, speed } = this.getCharacterMovement();
        this.world.keyboard.D = false;
        this.world.checkAttacks(x, y, speed, this.getBubbleImages());
        if (this.bottles > 0) {
          this.world.attackDamage = 2;
          this.bottles -= 20;
        } else {
          this.world.attackDamage = 1;
        }
        this.world.statusBarBottles.setPercentage(
          this.bottles,
          this.world.statusBarBottles.IMAGES_BOTTLES
        );
      }
      if (this.world.keyboard.SPACE) {
        this.world.attackDamage = 1;
        this.world.keyboard.SPACE = false;
      }
    }
  }

  getBubbleImages() {
    if (this.bottles > 0) {
      return "poisoned";
    } else {
      return "normal";
    }
  }

  getCharacterMovement() {
    if (this.world.keyboard.RIGHT) {
      return { x: 250, y: 150, speed: 10 };
    } else if (this.world.keyboard.LEFT) {
      return { x: 0, y: 150, speed: -30 };
    } else if (this.otherDirection) {
      return { x: 0, y: 150, speed: -20 };
    }
    return { x: 250, y: 150, speed: 0 };
  }
}
