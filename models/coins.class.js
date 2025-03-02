class COINS extends DrawableObject {
  IMAGES_COINS = [
    "graphics/4. Marcadores/1. Coins/1.png",
    "graphics/4. Marcadores/1. Coins/2.png",
    "graphics/4. Marcadores/1. Coins/3.png",
    "graphics/4. Marcadores/1. Coins/4.png",
  ];

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  animationInterval;

  constructor(x, y) {
    super().loadImage("graphics/4. Marcadores/1. Coins/1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 75;
    this.animate();
    this.pushToIntervals([this.animationInterval]);
  }

  animate() {
    this.animationInterval = setInterval(() => {
      /* console.log("coins"); */
      this.playAnimation(this.IMAGES_COINS);
    }, 200)
  }
}
