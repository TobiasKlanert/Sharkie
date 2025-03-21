/**
 * Represents the game world, including the character, enemies, items, and interactions.
 */
class World {
  /** @type {Character} The main character in the game. */
  character = new Character();

  /** @type {Object} The level configuration, including enemies, barriers, and items. */
  level = level1;

  /** @type {Endboss|null} The end boss of the level, if present. */
  endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);

  /** @type {HTMLCanvasElement} The canvas element used for rendering the game. */
  canvas;

  /** @type {CanvasRenderingContext2D} The rendering context for the canvas. */
  ctx;

  /** @type {Object} The keyboard input handler. */
  keyboard;

  /** @type {number} The X-coordinate of the camera. */
  cameraX = 0;

  /** @type {StatusBar} The status bar for the character's life. */
  statusBarLife = new StatusBar("life", 20, 0, 100);

  /** @type {StatusBar} The status bar for the character's bottles. */
  statusBarBottles = new StatusBar("bottles", 20, 60, 0);

  /** @type {StatusBar} The status bar for the character's coins. */
  statusBarCoins = new StatusBar("coins", 20, 120, 0);

  /** @type {number} The interval ID for the game loop. */
  runInterval;

  /** @type {number} The interval ID for animations. */
  animationInterval;

  /** @type {Array<Bubble>} The list of active bubbles in the game. */
  bubbles = [];

  /** @type {number} The damage dealt by the character's attacks. */
  attackDamage = 1;

  /** @type {Audio} The sound effect for the game over screen. */
  gameOverSound = new Audio("audio/game-over.mp3");

  /** @type {Audio} The sound effect for the winning screen. */
  winningSound = new Audio("audio/winning-music.mp3");

  /**
   * Initializes the game world.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
   * @param {Object} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.gameOverSound.volume = 0.2;
    this.draw();
    this.setWorld();
    this.run();
    checkTouchEvents();
    pushToIntervals([this.runInterval]);
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the game loop, checking for character position, collisions, and bubble attacks.
   */
  run() {
    this.runInterval = setInterval(() => {
      this.checkCharacterPosition();
      this.checkCharacterCollisions(this.level.enemies);
      this.checkCharacterCollisions(this.level.coins);
      this.checkCharacterCollisions(this.level.bottles);
      this.checkBubbleAttackCollisions();
      this.checkCharacterDeath();
      this.bubbles = this.bubbles.filter((bubble) => bubble.isActive);
    }, 100);
  }

  /**
   * Checks the character's position and triggers the end boss encounter if applicable.
   */
  checkCharacterPosition() {
    if (this.endboss && this.character.x > 23000) {
      this.endboss.firstContact = true;
    }
  }

  /**
   * Checks for collisions between the character and a given set of assets.
   * @param {Array<Object>} asset - The list of assets to check for collisions.
   */
  checkCharacterCollisions(asset) {
    asset.forEach((element) => {
      if (this.character.isColliding(element)) {
        this.handleCollision(asset, element);
      }
    });
  }

  /**
   * Checks whether character is dead, if yes, movement is stopped
   */
  checkCharacterDeath() {
    if (this.character.isDead()) {
      this.character.canMoveDown = false;
      this.character.canMoveUp = false;
      this.character.canMoveLeft = false;
      this.character.canMoveRight = false;
    }
  }

  /**
   * Handles collisions between the character and a specific asset.
   * @param {Array<Object>} asset - The list of assets.
   * @param {Object} element - The specific asset the character collided with.
   */
  handleCollision(asset, element) {
    switch (asset) {
      case this.level.enemies:
        this.handleEnemyCollision(element);
        break;
      case this.level.coins:
        this.collectCoins(element);
        break;
      case this.level.bottles:
        this.collectBottles(element);
        break;
      default:
        break;
    }
  }

  /**
   * Handles collisions between the character and an enemy.
   * @param {Object} enemy - The enemy the character collided with.
   */
  handleEnemyCollision(enemy) {
    this.character.collisionWithEnemy(enemy);
    if (this.keyboard.SPACE && this.character.enemyType == "pufferFish") {
      this.character.executeAttack = true;
      this.character.attack(enemy);
      this.killEnemy(enemy);
    } else if (!this.character.executeAttack) {
      this.enemyCollisions(enemy.collisionDamage);
    }
  }

  /**
   * Checks for collisions between bubbles and enemies.
   * Removes bubbles and damages enemies if a collision occurs.
   */
  checkBubbleAttackCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.bubbles.forEach((bubble) => {
        if (enemy.isColliding(bubble)) {
          this.character.attack(enemy);
          bubble.sound.pause();
          bubble.sound.currentTime = 0;
          if (enemy instanceof Endboss) {
            enemy.isHurt = true;
            enemy.handleHurt();
          }
          this.killEnemy(enemy);
          this.bubbles = this.bubbles.filter((b) => b !== bubble);
        }
      });
    });
  }

  /**
   * Handles collisions between the character and an enemy.
   * Applies damage to the character and updates the life status bar.
   * Plays the hurt sound if sounds are enabled.
   * @param {number} collisionDamage - The amount of damage caused by the collision.
   */
  enemyCollisions(collisionDamage) {
    let hurtSound = this.character.getHurtSound();
    this.character.hit(collisionDamage);
    soundsEnabled && hurtSound.play();
    this.statusBarLife.setPercentage(
      this.character.energy,
      this.statusBarLife.IMAGES_LIFE
    );
    if (this.character.isDead(this.character)) {
      currentMusic.pause();
      currentMusic.currentTime = 0;
      setTimeout(() => {
        soundsEnabled && this.gameOverSound.play();
        stopGame("gameoverScreen");
      }, 2000);
    }
  }

  /**
   * Handles the logic for killing an enemy.
   * Starts the death sequence and cleans up the enemy after death.
   * @param {Object} enemy - The enemy to be killed.
   */
  killEnemy(enemy) {
    if (enemy.health <= 0 && !enemy.isDying) {
      this.startEnemyDeathSequence(enemy);
      this.cleanupEnemyAfterDeath(enemy);
    }
  }

  /**
   * Starts the death animation sequence for an enemy.
   * Stops any ongoing movement or animation intervals for the enemy.
   * @param {Object} enemy - The enemy to start the death sequence for.
   */
  startEnemyDeathSequence(enemy) {
    enemy.isDying = true;
    enemy.getDyingInterval(enemy);
    enemy.loadImages(enemy.enemyDyingImages);
    this.animationInterval = setInterval(() => {
      enemy.playAnimation(enemy.enemyDyingImages);
    }, enemy.animationTime);

    if (enemy.moveInterval) {
      clearInterval(enemy.moveInterval);
    }
    clearInterval(enemy.animationInterval);
  }

  /**
   * Cleans up the enemy after its death animation is complete.
   * Removes the enemy from the level and handles endboss-specific logic.
   * @param {Object} enemy - The enemy to be cleaned up.
   */
  cleanupEnemyAfterDeath(enemy) {
    setTimeout(() => {
      clearInterval(this.animationInterval);
      this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
      this.character.executeAttack = false;
      if (this.endboss.isDying) {
        this.handleEndbossDeath();
      }
    }, enemy.enemyDyingImages.length * enemy.animationTime);
  }

  /**
   * Handles the logic for when the endboss is defeated.
   * Stops the current music, plays the winning sound, and shows the winning screen.
   */
  handleEndbossDeath() {
    currentMusic.pause();
    currentMusic.currentTime = 0;
    soundsEnabled && this.winningSound.play();
    stopGame("winningScreen");
    this.showCollectedCoins();
  }

  /**
   * Displays the number of coins collected by the character.
   */
  showCollectedCoins() {
    document.getElementById("collectedCoins").innerHTML = this.character.coins + " / 25";
  }

  /**
   * Checks for collisions between the character and barriers.
   * Updates the character's movement permissions based on the collision direction.
   */
  checkBarrierCollisions() {
    this.level.barriers.forEach((barrier) => {
      if (
        this.character.isBarrierCollidingTop(barrier) ||
        this.character.isBarrierCollidingBottom(barrier)
      ) {
        this.barrierCollisions(barrier);
      }
    });
  }

  /**
   * Determines the direction of a barrier collision and updates movement permissions.
   * @param {Object} barrier - The barrier the character collided with.
   */
  barrierCollisions(barrier) {
    let fromLeft = this.getBarrierCollisionLeft(barrier);
    let fromRight = this.getBarrierCollisionRight(barrier);
    let fromTop = this.getBarrierCollisionTop(barrier);
    let fromBottom = this.getBarrierCollisionBottom(barrier);

    if (fromLeft) {
      this.character.canMoveRight = false;
    }
    if (fromRight) {
      this.character.canMoveLeft = false;
    }
    if (fromTop) {
      this.character.canMoveDown = false;
    }
    if (fromBottom) {
      this.character.canMoveUp = false;
    }
  }

  /**
   * Checks if the character collides with the left side of a barrier.
   * @param {Object} barrier - The barrier to check.
   * @returns {boolean} True if a collision occurs, otherwise false.
   */
  getBarrierCollisionLeft(barrier) {
    return (
      this.character.x +
      this.character.offset.left +
      (this.character.width - this.character.offset.right) >=
      barrier.x + barrier.offsetTop.left &&
      this.character.x +
      this.character.offset.left +
      (this.character.width - this.character.offset.right) <
      barrier.x + barrier.width + barrier.offsetTop.left - 50
    );
  }

  /**
   * Checks if the character collides with the right side of a barrier.
   * @param {Object} barrier - The barrier to check.
   * @returns {boolean} True if a collision occurs, otherwise false.
   */
  getBarrierCollisionRight(barrier) {
    return (
      this.character.x + this.character.offset.left <=
      barrier.x +
      barrier.offsetTop.left +
      (barrier.width - barrier.offsetTop.right) &&
      this.character.x + this.character.offset.left >
      barrier.x + barrier.offsetTop.left + 50
    );
  }

  /**
   * Checks if the character collides with the top side of a barrier.
   * @param {Object} barrier - The barrier to check.
   * @returns {boolean} True if a collision occurs, otherwise false.
   */
  getBarrierCollisionTop(barrier) {
    return (
      (this.character.y +
        this.character.offset.top +
        (this.character.height - this.character.offset.bottom) >=
        barrier.y + barrier.offsetTop.top &&
        this.character.y +
        this.character.offset.top +
        (this.character.height - this.character.offset.bottom) <
        barrier.y + barrier.offsetTop.top + 10) ||
      (this.character.y +
        this.character.offset.top +
        (this.character.height - this.character.offset.bottom) >=
        barrier.y + barrier.offsetBottom.top &&
        this.character.y +
        this.character.offset.top +
        (this.character.height - this.character.offset.bottom) <
        barrier.y + barrier.offsetBottom.top + 10)
    );
  }

  /**
   * Checks if the character collides with the bottom side of a barrier.
   * @param {Object} barrier - The barrier to check.
   * @returns {boolean} True if a collision occurs, otherwise false.
   */
  getBarrierCollisionBottom(barrier) {
    return (
      this.character.y + this.character.offset.top <=
      barrier.y +
      barrier.offsetTop.top +
      (barrier.height - barrier.offsetTop.bottom) &&
      this.character.y + this.character.offset.top >
      barrier.y +
      barrier.offsetTop.top +
      (barrier.height - barrier.offsetTop.bottom) - 10
    );
  }

  /**
   * Handles the logic for collecting coins.
   * Updates the coin count, plays the coin collection sound, and updates the status bar.
   * @param {Object} coin - The coin object being collected.
   */
  collectCoins(coin) {
    this.character.countCoins();
    soundsEnabled && this.playSound(this.character.collectCoinSound);
    this.statusBarCoins.setPercentage(
      this.character.coinPercentage,
      this.statusBarCoins.IMAGES_COINS
    );
    this.level.coins = this.level.coins.filter((c) => c !== coin);
  }

  /**
   * Handles the logic for collecting bottles.
   * Updates the bottle count, plays the bottle collection sound, and updates the status bar.
   * @param {Object} bottle - The bottle object being collected.
   */
  collectBottles(bottle) {
    this.character.countBottles();
    soundsEnabled && this.playSound(this.character.collectBottleSound);
    this.statusBarBottles.setPercentage(
      this.character.bottles,
      this.statusBarBottles.IMAGES_BOTTLES
    );
    this.level.bottles = this.level.bottles.filter((b) => b !== bottle);
  }

  /**
   * Plays a sound effect.
   * Resets the sound's playback position and starts playing it.
   * @param {Audio} sound - The sound object to be played.
   */
  playSound(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }

  /**
   * Handles the logic for bubble attacks.
   * Creates a new bubble, adds it to the game, and resets the attack state.
   * @param {number} x - The X-offset for the bubble's position.
   * @param {number} y - The Y-offset for the bubble's position.
   * @param {number} speed - The speed of the bubble.
   * @param {string} bubbleType - The type of bubble (e.g., "poisoned").
   */
  checkAttacks(x, y, speed, bubbleType) {
    this.deleteBubbles();
    let bubble = new Bubble(
      this.character.x + x,
      this.character.y + y,
      speed,
      bubbleType
    );
    this.bubbles.push(bubble);
    this.character.executeAttack = false;
    setTimeout(() => (this.keyboard.D = false), 100);
  }

  /**
   * Deletes all active bubbles and stops their sound effects.
   */
  deleteBubbles() {
    this.bubbles.forEach((bubble) => bubble.sound.pause());
    this.bubbles = [];
  }

  /**
   * Draws the game world, including background objects, assets, and status bars.
   * Clears the canvas and updates the camera position.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.level.backgroundObjects.forEach((bg) => {
      bg.drawObject(this.ctx, this.cameraX);
    });

    this.ctx.translate(this.cameraX, 0);
    this.drawAssets();
    this.ctx.translate(-this.cameraX, 0);

    this.drawStatusBars();

    gameRunning && requestAnimationFrame(() => this.draw());
  }

  /**
   * Draws all game assets, including the character, enemies, coins, and bubbles.
   */
  drawAssets() {
    this.addObjectsToMap(this.level.lights);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.barriers);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.bubbles);
  }

  /**
   * Draws the status bars for life, bottles, and coins.
   */
  drawStatusBars() {
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarCoins);
  }

  /**
   * Adds multiple objects to the map by iterating through the array of objects.
   * Calls `addToMap` for each object in the array.
   * @param {Array<Object>} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single object to the map.
   * Handles flipping, rotation, and drawing of the object based on its type.
   * @param {Object} mo - The movable object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    if (mo instanceof Bubble) {
      this.drawRotatedObject(mo);
    } else if (mo instanceof Character) {
      this.drawRotatedCharacter();
    } else {
      mo.drawObject(this.ctx);
    }
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Draws a rotated object on the canvas.
   * Saves the current canvas state, applies rotation, and draws the object.
   * @param {Object} mo - The object to be rotated and drawn.
   */
  drawRotatedObject(mo) {
    this.ctx.save();

    this.ctx.translate(mo.x, mo.y);
    this.ctx.rotate(mo.rotation);

    this.ctx.drawImage(
      mo.img,
      -mo.width / 2,
      -mo.height / 2,
      mo.width,
      mo.height
    );

    this.ctx.restore();
  }

  /**
   * Draws the character with rotation based on keyboard input.
   * Saves the current canvas state, applies rotation, and draws the character.
   */
  drawRotatedCharacter() {
    this.ctx.save();

    this.ctx.translate(
      this.character.x + this.character.width / 2,
      this.character.y + this.character.height / 2
    );

    if (this.keyboard.UP) {
      this.ctx.rotate(-Math.PI / 4);
    } else if (this.keyboard.DOWN) {
      this.ctx.rotate(Math.PI / 4);
    }

    this.ctx.drawImage(
      this.character.img,
      -this.character.width / 2,
      -this.character.height / 2,
      this.character.width,
      this.character.height
    );

    this.ctx.restore();
  }

  /**
   * Flips an image horizontally by scaling the canvas context.
   * Saves the current canvas state and applies the flip transformation.
   * @param {Object} mo - The movable object to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the original position of a flipped image.
   * Reverts the horizontal flip transformation and restores the canvas state.
   * @param {Object} mo - The movable object to be restored.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
