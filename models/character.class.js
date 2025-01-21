class Character extends MovableObject {
  height = 300;
  width = 300;
  speed = 10;
  idleTime = 0;
  currentAnimationInterval = null;
  currentAnimationImages = null;
  isPlayingAttackAnimation = false;

  y = 50;
  x = 0;

  offset = {
    top: 140,
    left: 60,
    right: 120,
    bottom: 215,
  };

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
  IMAGES_SLEEP = [
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
    "graphics/1.Sharkie/2.Long_IDLE/I11.png",
    "graphics/1.Sharkie/2.Long_IDLE/I12.png",
    "graphics/1.Sharkie/2.Long_IDLE/I13.png",
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
    this.applyGravity();
    this.animate();
    this.startIdleTimer();
  }

  loadImagesToConstructor() {
    this.loadImages(this.IMAGES_IDLE);
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

  animate() {
    setInterval(() => {
      this.swimming_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.moveRight();
        this.otherDirection = false;
        this.swimming_sound.play();
        this.idleTime = 0;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.swimming_sound.play();
        this.idleTime = 0;
      }
      if (this.world.keyboard.UP && this.y > this.world.level.levelEndY) {
        this.moveUp();
        this.swimming_sound.play();
        this.idleTime = 0;
      }
      this.world.cameraX = -this.x;
    }, 1000 / 60);

    this.startAnimationLoop();
  }

  startIdleTimer() {
    setInterval(() => {
      this.idleTime += 1;
    }, 1000);
  }

  startAnimationLoop() {
    setInterval(() => {
      if (this.isPlayingAttackAnimation) return; // Blockiert Animationen, wenn ein Angriff läuft

      if (this.isDead()) {
        this.setAnimation(
          this.IMAGES_DEAD_POISONED,
          (1000 / 60) * this.IMAGES_DEAD_POISONED.length
        );
      } else if (this.isHurt()) {
        this.setAnimation(
          this.IMAGES_HURT_POISONED,
          (1000 / 60) * this.IMAGES_HURT_POISONED.length
        );
        this.idleTime = 0;
      } else if (
        this.world.keyboard.RIGHT ||
        this.world.keyboard.LEFT ||
        this.world.keyboard.UP
      ) {
        this.setAnimation(
          this.IMAGES_SWIM,
          (1000 / 60) * this.IMAGES_SWIM.length
        );
        this.idleTime = 0;
      } else if (this.world.keyboard.D) {
        this.playOneTimeAnimation(this.IMAGES_ATTACK_BUBBLES);
        this.idleTime = 0;
      } else if (this.world.keyboard.SPACE) {
        this.playOneTimeAnimation(this.IMAGES_ATTACK_FIN_SLAP);
        this.idleTime = 0;
      } else {
        if (this.idleTime > 15) {
          this.setAnimation(
            this.IMAGES_SLEEP,
            (1000 / 60) * this.IMAGES_SLEEP.length
          );
        } else {
          this.setAnimation(
            this.IMAGES_IDLE,
            (1000 / 60) * this.IMAGES_IDLE.length
          );
        }
      }
    }, 1000 / 60);
  }

  setAnimation(imageArray, frameRate) {
    if (this.currentAnimationImages === imageArray) return;

    this.currentAnimationImages = imageArray;

    if (this.currentAnimationInterval) {
      clearInterval(this.currentAnimationInterval);
    }

    this.currentAnimationInterval = setInterval(() => {
      this.playAnimation(imageArray);
    }, frameRate);
  }

  playOneTimeAnimation(imageArray) {
    if (this.isPlayingAttackAnimation) return; // Verhindert doppeltes Starten

    this.isPlayingAttackAnimation = true;
    this.currentAnimationImages = imageArray;

    let frameIndex = 0;
    let frameDuration = 1000 / 8; // 125 ms pro Bild für 8 FPS
    let lastFrameTime = performance.now();

    const animateFrame = (currentTime) => {
      if (!this.isPlayingAttackAnimation) return; // Falls Animation gestoppt wird

      let elapsed = currentTime - lastFrameTime;

      if (elapsed >= frameDuration) {
        this.playAnimation(imageArray);
        frameIndex++;
        lastFrameTime = currentTime;
      }

      if (frameIndex < imageArray.length) {
        requestAnimationFrame(animateFrame);
      } else {
        this.isPlayingAttackAnimation = false; // Angriff ist beendet
      }
    };

    requestAnimationFrame(animateFrame);
  }
}
