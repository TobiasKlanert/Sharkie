class Endboss extends MovableObject {
  height = 500;
  width = 400;
  y = 0;

  offset = {
    top: 150,
    left: 25,
    right: 52,
    bottom: 215,
  };

  life = 10;
  collisionDamage = 20;
  attackPower = 40;
  firstContact = false;
  enemyType = "endboss";

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

  constructor() {
    super().loadImage(this.IMAGES_INTRODUCE[0]);
    this.loadImages(this.IMAGES_INTRODUCE);
    this.loadImages(this.IMAGES_FLOATING);
    this.x = 13000;
    this.animate();
  }

  animate() {
    let i = 0;
    setInterval(() => {
      if (i < 10 && this.firstContact) {
        this.playAnimation(this.IMAGES_INTRODUCE);
      } else if (i >= 10) {
        this.playAnimation(this.IMAGES_FLOATING);
      }
      i++;
      if (!this.firstContact) {
        i = 0;
      }
    }, 150);
  }
}
