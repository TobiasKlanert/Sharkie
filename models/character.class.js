class Character extends MovableObject {
  height = 300;
  width = 300;
  speed = 10;
  idleTime = 0;

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
  world;
  swimming_sound = new Audio("audio/swimming.mp3");

  constructor() {
    super().loadImage("graphics/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_SWIM);
    this.loadImages(this.IMAGES_HURT_POISONED);
    this.loadImages(this.IMAGES_HURT_ELECTRO_SHOCK);
    this.loadImages(this.IMAGES_DEAD_POISONED);
    this.loadImages(this.IMAGES_DEAD_ELECTRO_SHOCK);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.swimming_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.moveRight();
        this.otherDirection = false;
        this.swimming_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.swimming_sound.play();
      }
      if (this.world.keyboard.UP && this.y > this.world.level.levelEndY) {
        this.moveUp();
        this.swimming_sound.play();
      }
      this.world.cameraX = -this.x;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD_POISONED);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT_POISONED);
        this.idleTime = 0;
      } else if (
        this.world.keyboard.RIGHT ||
        this.world.keyboard.LEFT ||
        this.world.keyboard.UP
      ) {
        this.playAnimation(this.IMAGES_SWIM);
        this.idleTime = 0;
      } else {
        this.setIdleAnimation();
      }
    }, 1000 / 5);
  }

  setIdleAnimation() {
    this.idleTime += 0.2;
    if (this.idleTime > 15) {
      this.playAnimation(this.IMAGES_SLEEP);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }
}
