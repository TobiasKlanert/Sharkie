class World {
  character = new Character();
  level = level1;
  endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusBarBottles = new StatusBar("bottles", 20, 0, 0);
  statusBarLife = new StatusBar("life", 20, 50, 100);
  statusBarCoins = new StatusBar("coins", 20, 100, 0);
  runInterval;
  animationInterval;

  bubbles = [];
  attackDamage = 1;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.character.pushToIntervals([this.runInterval]);
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.runInterval = setInterval(() => {
      this.checkCharacterPosition();
      this.checkCharacterCollisions(this.level.enemies);
      this.checkCharacterCollisions(this.level.coins);
      this.checkCharacterCollisions(this.level.bottles);
      this.checkBubbleAttackCollisions();
    }, 100);
  }

  checkCharacterPosition() {
    if (this.endboss && this.character.x > 12000) {
      this.endboss.firstContact = true;
    }
  }

  checkCharacterCollisions(asset) {
    asset.forEach((element) => {
      if (this.character.isColliding(element)) {
        switch (asset) {
          case this.level.enemies:
            this.character.collisionWithEnemy(element);
            if (this.keyboard.SPACE && this.character.enemyType == "pufferFish") {
              this.character.executeAttack = true;
              this.character.attack(element);
              this.killEnemy(element);
            } else if (!this.character.executeAttack) {
              this.enemyCollisions(element.collisionDamage);
            }
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
    });
  }

  checkBubbleAttackCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.bubbles.forEach((bubble) => {
        if (enemy.isColliding(bubble)) {
          this.character.attack(enemy);
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

  enemyCollisions(collisionDamage) {
    this.character.hit(collisionDamage);
    this.statusBarLife.setPercentage(
      this.character.energy,
      this.statusBarLife.IMAGES_LIFE
    );
    if (this.character.isDead(this.character)) {
      // TODO: show Game Over screen
      this.character.stopGame();
    }
  }

  killEnemy(enemy) {
    if (enemy.health <= 0 && !enemy.isDying) {
      enemy.isDying = true;
      enemy.loadImages(enemy.enemyDyingImages);
      this.animationInterval = setInterval(() => {
        enemy.playAnimation(enemy.enemyDyingImages);
      }, enemy.animationTime);

      if (enemy.moveInterval) {
        clearInterval(enemy.moveInterval);
      }
      clearInterval(enemy.animationInterval);

      setTimeout(() => {
        clearInterval(this.animationInterval);
        this.level.enemies = this.level.enemies.filter((e) => e !== enemy);
        this.character.executeAttack = false;
      }, enemy.enemyDyingImages.length * enemy.animationTime);
    }
  }

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

  getBarrierCollisionBottom(barrier) {
    return (
      this.character.y + this.character.offset.top <=
        barrier.y +
          barrier.offsetTop.top +
          (barrier.height - barrier.offsetTop.bottom) &&
      this.character.y + this.character.offset.top >
        barrier.y +
          barrier.offsetTop.top +
          (barrier.height - barrier.offsetTop.bottom) -
          10
    );
  }

  collectCoins(coin) {
    this.character.countCoins();
    this.statusBarCoins.setPercentage(
      this.character.coinPercentage,
      this.statusBarCoins.IMAGES_COINS
    );
    this.level.coins = this.level.coins.filter((c) => c !== coin);
  }

  collectBottles(bottle) {
    this.character.countBottles();
    this.statusBarBottles.setPercentage(
      this.character.bottles,
      this.statusBarBottles.IMAGES_BOTTLES
    );
    this.level.bottles = this.level.bottles.filter((b) => b !== bottle);
  }

  checkAttacks(x, y, speed, bubbleType) {
    let bubble = new Bubble(
      this.character.x + x,
      this.character.y + y,
      speed,
      bubbleType
    );
    this.bubbles.push(bubble);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.lights);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.barriers);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.bubbles);

    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarCoins);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.drawObject(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawBarrierFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
