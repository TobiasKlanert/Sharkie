class DrawableObject {
  x = 120;
  y = 250;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

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
      this instanceof BARRIERS ||
      this instanceof COINS ||
      this instanceof BOTTLES
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
      (this.x + this.offset.left) + (this.width - this.offset.right) >= (mo.x + mo.offset.left) &&
      (this.x + this.offset.left) <= (mo.x + mo.offset.left) + (mo.width - mo.offset.right) &&
      (this.y + this.offset.top) + (this.height - this.offset.bottom) >= (mo.y + mo.offset.top) &&
      (this.y + this.offset.top) <= (mo.y + mo.offset.top) + (mo.height - mo.offset.bottom)
    );
  }
}
