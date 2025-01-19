class StatusBar extends DrawableObject {
  IMAGES_BOTTLES = [
    "graphics/4. Marcadores/green/poisoned bubbles/0_ copia 2.png",
    "graphics/4. Marcadores/green/poisoned bubbles/20_ copia 3.png",
    "graphics/4. Marcadores/green/poisoned bubbles/40_ copia 2.png",
    "graphics/4. Marcadores/green/poisoned bubbles/60_ copia 2.png",
    "graphics/4. Marcadores/green/poisoned bubbles/80_ copia 2.png",
    "graphics/4. Marcadores/green/poisoned bubbles/100_ copia 3.png",
  ];

  IMAGES_LIFE = [
    "graphics/4. Marcadores/green/Life/0_  copia 3.png",
    "graphics/4. Marcadores/green/Life/20_ copia 4.png",
    "graphics/4. Marcadores/green/Life/40_  copia 3.png",
    "graphics/4. Marcadores/green/Life/60_  copia 3.png",
    "graphics/4. Marcadores/green/Life/80_  copia 3.png",
    "graphics/4. Marcadores/green/Life/100_  copia 2.png",
  ];

  IMAGES_COINS = [
    "graphics/4. Marcadores/green/Coin/0_  copia 4.png",
    "graphics/4. Marcadores/green/Coin/20_  copia 2.png",
    "graphics/4. Marcadores/green/Coin/40_  copia 4.png",
    "graphics/4. Marcadores/green/Coin/60_  copia 4.png",
    "graphics/4. Marcadores/green/Coin/80_  copia 4.png",
    "graphics/4. Marcadores/green/Coin/100_ copia 4.png",
  ];

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  percentage = 100;

  constructor(type, x, y, percentage) {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGES_LIFE);
    this.loadImages(this.IMAGES_COINS);
    this.x = x;
    this.y = y;
    this.width = 250;
    this.height = 70;
    let imageArr = this.setImageArr(type);
    this.setPercentage(percentage, imageArr);
  }

  setImageArr(type) {
    switch (type) {
      case "bottles":
        return this.IMAGES_BOTTLES;
      case "life":
        return this.IMAGES_LIFE;
      case "coins":
        return this.IMAGES_COINS;
    }
  }

  setPercentage(percentage, imageArr) {
    this.percentage = percentage;
    let imagePath = imageArr[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
