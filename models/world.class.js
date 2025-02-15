class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  cameraX = 0;
  statusBarBottles = new StatusBar("bottles", 20, 0, 0);
  statusBarLife = new StatusBar("life", 20, 50, 100);
  statusBarCoins = new StatusBar("coins", 20, 100, 0);

  bubbles = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions(this.level.enemies);
      this.checkCollisions(this.level.barriers);
      this.checkCollisions(this.level.coins);
      this.checkCollisions(this.level.bottles);
      /* this.checkAttacks(); */
    }, 200);
  }

  checkCollisions(asset) {
    asset.forEach((element) => {
      if (this.character.isColliding(element)) {
        switch (asset) {
          case this.level.enemies:
            this.enemyCollisions();
            break;
          case this.level.barriers:
            this.barrierCollisions();
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

  enemyCollisions() {
    this.character.hit();
    this.statusBarLife.setPercentage(
      this.character.energy,
      this.statusBarLife.IMAGES_LIFE
    );
    if (this.character.isDead(this.character)) {
    }
  }

  barrierCollisions() {
    console.log("kabumm");
  }

  collectCoins(coin) {
    this.character.countCoins();
    this.statusBarCoins.setPercentage(
      this.character.coins,
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

  checkAttacks(x, y, speed) {
    let bubble = new Bubble(this.character.x + x, this.character.y + y, speed);
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
