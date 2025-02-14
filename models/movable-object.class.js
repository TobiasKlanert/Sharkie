class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;
  previousImages = null;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

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
    if(!deltaTime) {
      this.x -= this.speed;
    } else {
      this.x -= this.speed * (deltaTime / 16);
    }
  }

  moveUp(deltaTime) {
    if(!deltaTime) {
      this.y -= this.speed;
    } else {
      this.y -= this.speed * (deltaTime / 16);
    }
  }

  moveDown(deltaTime) {
    if(!deltaTime) {
      this.y += this.speed;
    } else {
      this.y += this.speed * (deltaTime / 16);
    }
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1.5;
  }

  isDead() {
    return this.energy == 0;
  }
}
