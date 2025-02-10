class COINS extends DrawableObject {
  IMAGES_COINS = [
    "graphics/4. Marcadores/1. Coins/1.png",
    "graphics/4. Marcadores/1. Coins/2.png",
    "graphics/4. Marcadores/1. Coins/3.png",
    "graphics/4. Marcadores/1. Coins/4.png",
  ];

  constructor(x, y) {
    super().loadImage("graphics/4. Marcadores/1. Coins/1.png");
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 50;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 200);
  }
}
