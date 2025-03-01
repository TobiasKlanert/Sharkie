class DrawableObject {
  x = 120;
  y = 250;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;
  static intervalIds = [];

  pushToIntervals(intervals) {
    intervals.forEach((interval) => {
      DrawableObject.intervalIds.push(interval);
    });
  }

  stopGame(screenType) {
    DrawableObject.intervalIds.forEach(clearInterval);
    document.getElementById("canvas").style.display = "none";
    document.getElementById(screenType).style.display = "flex";
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  drawObject(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Enemy ||
      this instanceof Endboss ||
      this instanceof COINS ||
      this instanceof BOTTLES ||
      this instanceof Bubble
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "green";
      ctx.rect(
        this.x + this.offset.left,
        this.y + this.offset.top,
        this.width - this.offset.right,
        this.height - this.offset.bottom
      );
      ctx.stroke();
    }
  }

  drawBarrierFrame(ctx) {
    if (this instanceof BARRIERS) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(
        this.x + this.offsetTop.left,
        this.y + this.offsetTop.top,
        this.width - this.offsetTop.right,
        this.height - this.offsetTop.bottom
      );
      ctx.rect(
        this.x + this.offsetBottom.left,
        this.y + this.offsetBottom.top,
        this.width - this.offsetBottom.right,
        this.height - this.offsetBottom.bottom
      );
      ctx.stroke();
    }
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
      this.x + this.offset.left + (this.width - this.offset.right) >=
        mo.x + mo.offset.left &&
      this.x + this.offset.left <=
        mo.x + mo.offset.left + (mo.width - mo.offset.right) &&
      this.y + this.offset.top + (this.height - this.offset.bottom) >=
        mo.y + mo.offset.top &&
      this.y + this.offset.top <=
        mo.y + mo.offset.top + (mo.height - mo.offset.bottom)
    );
  }

  isBarrierCollidingTop(barrier) {
    return (
      this.x + this.offset.left + (this.width - this.offset.right) >=
        barrier.x + barrier.offsetTop.left &&
      this.x + this.offset.left <=
        barrier.x +
          barrier.offsetTop.left +
          (barrier.width - barrier.offsetTop.right) &&
      this.y + this.offset.top + (this.height - this.offset.bottom) >=
        barrier.y + barrier.offsetTop.top &&
      this.y + this.offset.top <=
        barrier.y +
          barrier.offsetTop.top +
          (barrier.height - barrier.offsetTop.bottom)
    );
  }

  isBarrierCollidingBottom(barrier) {
    return (
      this.x + this.offset.left + (this.width - this.offset.right) >=
        barrier.x + barrier.offsetBottom.left &&
      this.x + this.offset.left <=
        barrier.x +
          barrier.offsetBottom.left +
          (barrier.width - barrier.offsetBottom.right) &&
      this.y + this.offset.top + (this.height - this.offset.bottom) >=
        barrier.y + barrier.offsetBottom.top &&
      this.y + this.offset.top <=
        barrier.y +
          barrier.offsetBottom.top +
          (barrier.height - barrier.offsetBottom.bottom)
    );
  }
}
