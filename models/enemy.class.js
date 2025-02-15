class Enemy extends MovableObject {
  height = 150;
  width = 150;

  offset = {
    top: 10,
    left: 5,
    right: 10,
    bottom: 40,
  };

  IMAGES_PUFFER_FISH_GREEN_SWIM = [
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",
  ];

  IMAGES_PUFFER_FISH_ORANGE_SWIM = [
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",
  ];

  IMAGES_PUFFER_FISH_PINK_SWIM = [
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",
  ];

  IMAGES_JELLY_FISH_LILA_SWIM = [
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  IMAGES_JELLY_FISH_YELLOW_SWIM = [
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];

  IMAGES_JELLY_FISH_GREEN_SWIM = [
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];

  IMAGES_JELLY_FISH_PINK_SWIM = [
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  constructor() {
    super().loadImage(
      "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.x = 500 + Math.random() * 12000;
    this.y = Math.random() * 350;
    this.speed = 0.15 + Math.random() * 0.25;
    let randomEnemy = this.randomizeEnemy();
    this.loadImages(randomEnemy);
    this.animate(randomEnemy);
  }

  randomizeEnemy() {
    let randomIndex = Math.floor(Math.random() * 7);
    switch (randomIndex) {
      case 0:
        return this.IMAGES_JELLY_FISH_GREEN_SWIM;
      case 1:
        return this.IMAGES_PUFFER_FISH_ORANGE_SWIM;
      case 2:
        return this.IMAGES_PUFFER_FISH_PINK_SWIM;
      case 3:
        return this.IMAGES_JELLY_FISH_LILA_SWIM;
      case 4:
        return this.IMAGES_JELLY_FISH_YELLOW_SWIM;
      case 5:
        return this.IMAGES_PUFFER_FISH_GREEN_SWIM;
      case 6:
        return this.IMAGES_PUFFER_FISH_PINK_SWIM;
      default:
        break;
    }
  }

  animate(randomEnemy) {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setInterval(() => {
      this.playAnimation(randomEnemy);
    }, 200);
  }
}
