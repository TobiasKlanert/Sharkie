/**
 * Represents an enemy in the game.
 * Enemies can have different types (e.g., jellyfish, pufferfish) with unique animations, behaviors, and attributes.
 * This class extends the `MovableObject` class.
 */
class Enemy extends MovableObject {
  /**
   * The height of the enemy.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the enemy.
   * @type {number}
   */
  width = 150;

  /**
   * The offset values for collision detection.
   * @type {Object}
   * @property {number} top - The top offset.
   * @property {number} left - The left offset.
   * @property {number} right - The right offset.
   * @property {number} bottom - The bottom offset.
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * The type of enemy (e.g., jellyfish, pufferfish).
   * @type {string|null}
   */
  enemyType = null;

  /**
   * The images used for the enemy's death animation.
   * @type {string[]|null}
   */
  enemyDyingImages = null;

  /**
   * The health of the enemy.
   * @type {number}
   */
  health = 0;

  /**
   * Indicates whether the enemy is in a dying state.
   * @type {boolean}
   */
  isDying = false;

  /**
   * The damage dealt by the enemy on collision.
   * @type {number}
   */
  collisionDamage = 20;

  /**
   * The interval ID for the enemy's movement.
   * @type {number}
   */
  moveInterval;

  /**
   * The interval ID for the enemy's animation.
   * @type {number}
   */
  animationInterval;

  /**
   * The duration of each animation frame in milliseconds.
   * @type {number}
   */
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

  /**
   * Creates a new enemy object.
   * Randomizes the enemy type, loads its images, and starts its movement and animation.
   */
  constructor() {
    super().loadImage(
      "graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png"
    );
    this.x = 1000 + Math.random() * 23000;
    this.y = Math.random() * 450;
    let randomEnemy = this.randomizeEnemy();
    this.getAnimationTime();
    this.getEnemyData();
    this.loadImages(randomEnemy);
    this.moveEnemy();
    this.animate(randomEnemy);
    pushToIntervals([this.moveInterval, this.animationInterval]);
  }

  /**
   * Randomizes the enemy type and returns the corresponding animation images.
   * @returns {string[]} An array of image paths for the enemy's animation.
   */
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

  /**
   * Sets the animation time based on the enemy type.
   */
  getAnimationTime() {
    switch (this.enemyType) {
      case "jellyFish":
        this.animationTime = 120;
        break;
      case "pufferFish":
        this.animationTime = 100;
        break;
      default:
        break;
    }
  }

  /**
   * Retrieves and sets the attributes of the enemy based on its type.
   * Configures the enemy's size, health, speed, and collision offsets.
   */
  getEnemyData() {
    switch (this.enemyType) {
      case "jellyFish":
        this.setEnemyAttributes(150, 150, 1, 1.15 + Math.random() * 0.25, {
          top: 20,
          left: 10,
          right: 25,
          bottom: 50,
        });
        break;
      case "pufferFish":
        this.setEnemyAttributes(300, 300, 2, 0.15 + Math.random() * 0.25, {
          top: 30,
          left: 15,
          right: 80,
          bottom: 120,
        });
        break;
      default:
        break;
    }
  }

  /**
   * Sets the attributes of the enemy.
   * @param {number} width - The width of the enemy.
   * @param {number} height - The height of the enemy.
   * @param {number} health - The health points of the enemy.
   * @param {number} speed - The movement speed of the enemy.
   * @param {Object} offset - The collision offset values for the enemy.
   * @param {number} offset.top - The top collision offset.
   * @param {number} offset.left - The left collision offset.
   * @param {number} offset.right - The right collision offset.
   * @param {number} offset.bottom - The bottom collision offset.
   */
  setEnemyAttributes(width, height, health, speed, offset) {
    this.width = width;
    this.height = height;
    this.health = health;
    this.speed = speed;
    this.offset = offset;
  }

  /**
   * Animates the enemy by cycling through its animation images.
   * @param {string[]} randomEnemy - An array of image paths for the enemy's animation.
   */
  animate(randomEnemy) {
    /* this.getMovement(); */
    this.animationInterval = setInterval(() => {
      this.playAnimation(randomEnemy);
    }, this.animationTime);
  }

  /**
   * Moves the enemy to the left and adjusts its vertical position.
   * Ensures that the `y` position is never less than 50.
   */
  moveEnemy() {
    let time = 0;
    this.moveInterval = setInterval(() => {
      this.moveLeft();
      if (this.enemyType === "jellyFish") {
        this.y += Math.cos(time) * 5; // Adjust vertical movement
        if (this.y < 50) {
          this.y = 50; // Ensure y is not less than 50
        } else if (this.y > 450) {
          this.y = 450;
        }
        time += Math.random() * 0.1;
      }
    }, 1000 / 60);
  }
}