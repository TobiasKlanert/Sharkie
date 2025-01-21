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

  throwableObjects = [];

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
      this.checkCollisions();
      this.checkAttacks();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarLife.setPercentage(
          this.character.energy,
          this.statusBarLife.IMAGES_LIFE
        );
        if (this.character.isDead(this.character)) {
        }
      }
    });
  }

  checkAttacks() {
    if (this.keyboard.D) {
      let bubble = new ThrowableObject(
        this.character.x + 200,
        this.character.y + 100
      );
      this.throwableObjects.push(bubble);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.lights);

    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarLife);
    this.addToMap(this.statusBarCoins);
    this.ctx.translate(this.cameraX, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.cameraX, 0);

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
