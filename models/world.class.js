class World {
  character = new Character();
  level = level1;
  endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusBarLife = new StatusBar("life", 20, 0, 100);
  statusBarBottles = new StatusBar("bottles", 20, 60, 0);
  statusBarCoins = new StatusBar("coins", 20, 120, 0);
  runInterval;
  animationInterval;

  bubbles = [];
  attackDamage = 1;

  gameOverSound = new Audio("audio/game-over.mp3");
  winningSound = new Audio("audio/winning-music.mp3");

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
    if (this.endboss && this.character.x > 23000) {
      this.endboss.firstContact = true;
    }
  }

  checkCharacterCollisions(asset) {
    asset.forEach((element) => {
      if (this.character.isColliding(element)) {
        switch (asset) {
          case this.level.enemies:
            this.character.collisionWithEnemy(element);
            if (
              this.keyboard.SPACE &&
              this.character.enemyType == "pufferFish"
            ) {
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
          this.character.bubbleSound.pause();
          this.character.bubbleSound.currentTime = 0;
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
        if (this.endboss.isDying) {
          currentMusic.pause();
          currentMusic.currentTime = 0;
          soundsEnabled && this.winningSound.play();
          stopGame("winningScreen");
          this.showCollectedCoins();
        }
      }, enemy.enemyDyingImages.length * enemy.animationTime);
    }
  }

  showCollectedCoins() {
    document.getElementById("collectedCoins").innerHTML = this.character.coins + " / 25";
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
    soundsEnabled && this.playSound(this.character.collectCoinSound);
    this.statusBarCoins.setPercentage(
      this.character.coinPercentage,
      this.statusBarCoins.IMAGES_COINS
    );
    this.level.coins = this.level.coins.filter((c) => c !== coin);
  }

  collectBottles(bottle) {
    this.character.countBottles();
    soundsEnabled && this.playSound(this.character.collectBottleSound);
    this.statusBarBottles.setPercentage(
      this.character.bottles,
      this.statusBarBottles.IMAGES_BOTTLES
    );
    this.level.bottles = this.level.bottles.filter((b) => b !== bottle);
  }

  playSound(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
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

    this.level.backgroundObjects.forEach((bg) => {
      bg.drawObject(this.ctx, this.cameraX);
    });

    this.ctx.translate(this.cameraX, 0);

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

    if (mo instanceof Bubble) {
      this.drawRotatedObject(mo);
    } else if (
      mo instanceof Character
    ) {
      this.drawRotatedCharacter(mo);
    } else {
      mo.drawObject(this.ctx);
    }

    /* mo.drawFrame(this.ctx);
    mo.drawBarrierFrame(this.ctx); */

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

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

  drawRotatedCharacter(mo) {
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
