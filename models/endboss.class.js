class Endboss extends MovableObject {
  height = 720;
  width = 576;
  y = 0;

  offset = {
    top: 330,
    left: 25,
    right: 60,
    bottom: 450,
  };

  health = 10;
  collisionDamage = 20;
  attackPower = 40;
  firstContact = false;
  enemyType = "endboss";
  isHurt = false;
  isDying = false;
  executeAttack = false;
  animationInterval;
  startAttackInterval;
  attackInterval;
  attackTime;
  animationTime = 200;

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

  IMAGES_ATTACK = [
    "graphics/2.Enemy/3 Final Enemy/Attack/1.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/2.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/3.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/4.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/5.png",
    "graphics/2.Enemy/3 Final Enemy/Attack/6.png",
  ];

  IMAGES_HURT = [
    "graphics/2.Enemy/3 Final Enemy/Hurt/1.png",
    "graphics/2.Enemy/3 Final Enemy/Hurt/2.png",
    "graphics/2.Enemy/3 Final Enemy/Hurt/3.png",
    "graphics/2.Enemy/3 Final Enemy/Hurt/4.png",
  ];

  IMAGES_DEAD = [
    "graphics/2.Enemy/3 Final Enemy/Dead/0.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/1.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/2.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/3.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/4.png",
    "graphics/2.Enemy/3 Final Enemy/Dead/5.png",
  ];

  enemyDyingImages = this.IMAGES_DEAD;

  endbossMusic = new Audio("audio/endboss-music.mp3");
  endbossAttackSound = new Audio("audio/endboss-attack.mp3");

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

  animate() {
    let i = 0;
    this.animationInterval = setInterval(() => {
      if (this.isHurt) {
        this.playAnimation(this.IMAGES_HURT);
      } else {
        if (i < 10 && this.firstContact) {
          soundsEnabled && this.setEndbossMusic();
          this.playAnimation(this.IMAGES_INTRODUCE);
        } else if (i >= 10 && this.executeAttack) {
          soundsEnabled && this.endbossAttackSound.play();
          this.playAnimation(this.IMAGES_ATTACK);
        } else if (i >= 10) {
          this.playAnimation(this.IMAGES_FLOATING);
        }
        i++;
        if (!this.firstContact) {
          i = 0;
        }
      }
    }, 150);
  }

  setEndbossMusic() {
    currentMusic.pause();
    currentMusic.currentTime = 0;
    currentMusic = this.endbossMusic;
    currentMusic.volume = 0.2;
    currentMusic.loop = true;
    currentMusic.play();
  }

  getRandomTime() {
    this.attackTime = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
  }

  handleHurt() {
    setTimeout(() => {
      this.isHurt = false;
    }, this.IMAGES_HURT.length * 150);
  }

  startAttack() {
    this.startAttackInterval = setInterval(() => {
      if (this.firstContact) {
        this.attack();
        pushToIntervals([this.attackInterval]);
        clearInterval(this.startAttackInterval);
      }
    }, 150);
  }

  attack() {
    this.attackInterval = setInterval(() => {
      if (!this.isHurt && !this.isDying) {
        this.executeAttack = true;
        this.collisionDamage = 40;
        this.speed = 200 + Math.random() * 200;
        this.moveLeft();
        this.handleAttack();
      }
    }, this.attackTime);
  }

  handleAttack() {
    setTimeout(() => {
      this.executeAttack = false;
      this.collisionDamage = 20;
      this.moveRight();
      this.getRandomTime();
    }, this.IMAGES_ATTACK.length * 150);
  }
}
