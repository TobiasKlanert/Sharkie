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
  enemyDyingImages = null;
  health = 0;
  isDying = false;
  collisionDamage = 20;

  moveInterval;
  animationInterval;
  animationTime;

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

  IMAGES_PUFFER_FISH_GREEN_DYING = [
    "graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 3.png",
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

  IMAGES_PUFFER_FISH_ORANGE_DYING = [
    "graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.Dead 1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.Dead 2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.Dead 3.png",
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

  IMAGES_PUFFER_FISH_PINK_DYING = [
    "graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.Dead 1.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.Dead 2.png",
    "graphics/2.Enemy/1.Puffer fish (3 color options)/4.DIE/3.Dead 3.png",
  ];

  IMAGES_JELLY_FISH_LILA = [
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png",
  ];

  IMAGES_JELLY_FISH_LILA_DYING = [
    "graphics/2.Enemy/2 Jelly fish/Dead/Lila/L1.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/Lila/L2.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/Lila/L3.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/Lila/L4.png",
  ];

  IMAGES_JELLY_FISH_YELLOW = [
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png",
    "graphics/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png",
  ];

  IMAGES_JELLY_FISH_YELLOW_DYING = [
    "graphics/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png",
  ];

  IMAGES_JELLY_FISH_GREEN = [
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.png",
  ];

  IMAGES_JELLY_FISH_GREEN_DYING = [
    "graphics/2.Enemy/2 Jelly fish/Dead/green/g1.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/green/g2.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/green/g3.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/green/g4.png",
  ];

  IMAGES_JELLY_FISH_PINK = [
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Pink 1.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Pink 2.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Pink 3.png",
    "graphics/2.Enemy/2 Jelly fish/Súper dangerous/Pink 4.png",
  ];

  IMAGES_JELLY_FISH_PINK_DYING = [
    "graphics/2.Enemy/2 Jelly fish/Dead/Pink/P1.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/Pink/P2.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/Pink/P3.png",
    "graphics/2.Enemy/2 Jelly fish/Dead/Pink/P4.png",
  ];

  constructor() {
    super().loadImage(
      "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.x = 500 + Math.random() * 12000;
    this.y = Math.random() * 350;
    this.speed = 0.15 + Math.random() * 0.25;
    let randomEnemy = this.randomizeEnemy();
    this.getAnimationTime();
    this.getEnemyHealth();
    this.loadImages(randomEnemy);
    this.animate(randomEnemy);
    this.pushToIntervals([this.moveInterval, this.animationInterval]);
  }

  randomizeEnemy() {
    let randomIndex = Math.floor(Math.random() * 7);
    switch (randomIndex) {
      case 0:
        this.enemyType = "jellyFish";
        this.enemyDyingImages = this.IMAGES_JELLY_FISH_GREEN_DYING;
        return this.IMAGES_JELLY_FISH_GREEN;
      case 1:
        this.enemyType = "jellyFish";
        this.enemyDyingImages = this.IMAGES_JELLY_FISH_LILA_DYING;
        return this.IMAGES_JELLY_FISH_LILA;
      case 2:
        this.enemyType = "jellyFish";
        this.enemyDyingImages = this.IMAGES_JELLY_FISH_PINK_DYING;
        return this.IMAGES_JELLY_FISH_PINK;
      case 3:
        this.enemyType = "jellyFish";
        this.enemyDyingImages = this.IMAGES_JELLY_FISH_YELLOW_DYING;
        return this.IMAGES_JELLY_FISH_YELLOW;
      case 4:
        this.enemyType = "pufferFish";
        this.enemyDyingImages = this.IMAGES_PUFFER_FISH_ORANGE_DYING;
        return this.IMAGES_PUFFER_FISH_ORANGE;
      case 5:
        this.enemyType = "pufferFish";
        this.enemyDyingImages = this.IMAGES_PUFFER_FISH_PINK_DYING;
        return this.IMAGES_PUFFER_FISH_PINK;
      case 6:
        this.enemyType = "pufferFish";
        this.enemyDyingImages = this.IMAGES_PUFFER_FISH_GREEN_DYING;
        return this.IMAGES_PUFFER_FISH_GREEN;
      default:
        break;
    }
  }

  getAnimationTime() {
    switch (this.enemyType) {
      case "jellyFish":
        this.animationTime = 120;
        break;
      case "pufferFish":
        this.animationTime = 300;
        break;
      default:
        break;
    }
  }

  getEnemyHealth() {
    switch (this.enemyType) {
      case "jellyFish":
        this.health = 1;
        break;
      case "pufferFish":
        this.health = 2;
        break;
      default:
        break;
    }
  }

  animate(randomEnemy) {
    this.moveInterval = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      this.playAnimation(randomEnemy);
    }, 200);
  }
}
