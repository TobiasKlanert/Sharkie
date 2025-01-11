class Endboss extends MovableObject {
    height = 500;
    width = 400;
    y = 0;

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

  constructor() {
    super().loadImage(this.IMAGES_FLOATING[0]);
    this.loadImages(this.IMAGES_FLOATING);
    this.x = 700;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_FLOATING);
    }, 200);
  }
}
