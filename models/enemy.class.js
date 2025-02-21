class Enemy extends MovableObject {
  height = 150;
  width = 150;

  offset = {
    top: 10,
    left: 5,
    right: 10,
    bottom: 40,
  };

  enemyType = null;
  life = 0;

  IMAGES_PUFFER_FISH_GREEN = [
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png",

    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",

    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/1.bubbleswim5.png",

    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition5.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/1.transition1.png",
  ];

  IMAGES_PUFFER_FISH_ORANGE = [
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/2.swim5.png",

    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",

    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/2.bubbleswim5.png",

    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png",
  ];

  IMAGES_PUFFER_FISH_PINK = [
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/3.swim5.png",

    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",

    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/3.Bubbleeswim/3.bubbleswim5.png",

    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition5.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition4.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition3.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/2.transition/3.transition1.png",
  ];

  IMAGES_JELLY_FISH_LILA = [
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  IMAGES_JELLY_FISH_YELLOW = [
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];

  IMAGES_JELLY_FISH_GREEN = [
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];

  IMAGES_JELLY_FISH_PINK = [
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
    this.getEnemyLife();
    this.loadImages(randomEnemy);
    this.animate(randomEnemy);
  }

  randomizeEnemy() {
    let randomIndex = Math.floor(Math.random() * 6);
    switch (randomIndex) {
      case 0:
        this.enemyType = "jellyFish";
        return this.IMAGES_JELLY_FISH_GREEN;
      case 1:
        this.enemyType = "jellyFish";
        return this.IMAGES_JELLY_FISH_LILA;
      case 2:
        this.enemyType = "jellyFish";
        return this.IMAGES_JELLY_FISH_YELLOW;
      case 3:
        this.enemyType = "pufferFish";
        return this.IMAGES_PUFFER_FISH_ORANGE;
      case 4:
        this.enemyType = "pufferFish";
        return this.IMAGES_PUFFER_FISH_PINK;
      case 5:
        this.enemyType = "pufferFish";
        return this.IMAGES_PUFFER_FISH_GREEN;
      default:
        break;
    }
  }

  getEnemyLife() {
    switch (this.enemyType) {
      case "jellyFish":
        this.life = 1;
        break;
      case "pufferFish":
        this.life = 2;
        break;
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
