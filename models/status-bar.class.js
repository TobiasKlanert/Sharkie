class StatusBar extends DrawableObject {
  IMAGES_BOTTLE = [
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

  IMAGES_MAP = {
    "IMAGES_BOTTLE": this.IMAGES_BOTTLE,
    "IMAGES_LIFE": this.IMAGES_LIFE,
    "IMAGES_COINS": this.IMAGES_COINS,
  };

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  percentageBottles = 0;
  percentageLife = 100;
  percentageCoins = 0;

  constructor(statusBarType) {
    super();
    let images = this.IMAGES_MAP[statusBarType];
    this.loadImages(images);
    this.x = 20;
    this.y = 0;
    this.width = 250;
    this.height = 70;
    /* this.setPercentage(0, this.IMAGES_BOTTLE, this.IMAGES_BOTTLE);
    this.setPercentage(100, this.percentageLife, this.IMAGES_LIFE);
    this.setPercentage(0, this.percentageCoins, this.IMAGES_COINS); */
  }

  setPercentage(value, percentage, arr) {
    percentage = value;
    let imagePath = arr[this.resolveImageIndex()];
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
