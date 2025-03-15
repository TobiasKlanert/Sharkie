class Light extends MovableObject {  y = 0;
  width = 1280;
  height = 720;

  aimationInterval;

  constructor(path, x, speed = 1.0) {
    super().loadImage(path);

    this.speed = speed;
    this.x = x;
    this.animate();
    pushToIntervals([this.aimationInterval]);
  }

  animate() {
    this.aimationInterval = setInterval(() => {
      this.moveRight();
    }, 1000 / 60);
  }
}
