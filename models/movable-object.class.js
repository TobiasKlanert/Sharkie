class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.00001;
  energy = 100;
  coins = 0;
  coinPercentage = 0;
  bottles = 0;
  lastHit = 0;
  previousImages = null;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  isAboveGround() {
    if (this instanceof Bubble) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  moveRight(deltaTime) {
    if (!deltaTime) {
      this.x += this.speed;
    } else {
      this.x += this.speed * (deltaTime / 16);
    }
  }

  moveLeft(deltaTime) {
    if (!deltaTime) {
      this.x -= this.speed;
    } else {
      this.x -= this.speed * (deltaTime / 16);
    }
  }

  moveUp(deltaTime) {
    if (!deltaTime) {
      this.y -= this.speed;
    } else {
      this.y -= this.speed * (deltaTime / 16);
    }
  }

  moveDown(deltaTime) {
    if (!deltaTime) {
      this.y += this.speed;
    } else {
      this.y += this.speed * (deltaTime / 16);
    }
  }

  hit(damage) {
    if (!this.isHurt()) {
      this.energy -= damage;
      this.lastHit = new Date().getTime();

      if (this.energy < 0) {
        this.energy = 0;
      }
    }
  }

  isHurt() {
    if (!this.lastHit) return false;
    let timePassed = (new Date().getTime() - this.lastHit) / 1000;
    return timePassed < 1.5;
  }

  isDead() {
    return this.energy == 0;
  }

  countCoins() {
    if (this.coins <= 100) {
      this.coins += 1;
      if (this.coins == 25) {
        this.coinPercentage = 100;
      } else if (this.coins >= 20) {
        this.coinPercentage = 80;
      } else if (this.coins >= 15) {
        this.coinPercentage = 60;
      } else if (this.coins >= 10) {
        this.coinPercentage = 40;
      } else if (this.coins >= 5) {
        this.coinPercentage = 20;
      }
    }
  }

  countBottles() {
    if (this.bottles <= 100) {
      this.bottles += 20;
    }
  }
}
