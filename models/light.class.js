class Light extends MovableObject {  y = 0;
  width = 1280;
  height = 720;

  constructor() {
    super().loadImage("graphics/3. Background/Layers/1. Light/1.png");

    this.x = Math.random() * 500;
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
