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

  moveUp() {
    this.speedY = 15;
  }

  playAnimation(images) {
    this.proofArr(images);
    let path = images[this.currentImage];
    this.img = this.imageCache[path];
    this.currentImage++;
    if (this.currentImage >= images.length) {
      this.currentImage = 0;
    }
  }

  proofArr(images) {
    if (!this.previousImages) {
      this.previousImages = [...images];
      return;
    }

    if (!this.arraysAreEqual(this.previousImages, images)) {
      this.currentImage = 0;
      this.previousImages = [...images];
    }
  }

  arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((value, index) => value === arr2[index]);
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
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
