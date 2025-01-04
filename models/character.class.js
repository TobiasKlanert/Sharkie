class Character extends MovableObject {
  height = 300;
  width = 300;
  speed = 10;

  y = 150;
  x = 0;

  IMAGES_IDLE = [
    "graphics/1.Sharkie/1.IDLE/1.png",
    "graphics/1.Sharkie/1.IDLE/2.png",
    "graphics/1.Sharkie/1.IDLE/3.png",
    "graphics/1.Sharkie/1.IDLE/4.png",
    "graphics/1.Sharkie/1.IDLE/5.png",
    "graphics/1.Sharkie/1.IDLE/6.png",
    "graphics/1.Sharkie/1.IDLE/7.png",
    "graphics/1.Sharkie/1.IDLE/8.png",
    "graphics/1.Sharkie/1.IDLE/9.png",
    "graphics/1.Sharkie/1.IDLE/10.png",
    "graphics/1.Sharkie/1.IDLE/11.png",
    "graphics/1.Sharkie/1.IDLE/12.png",
    "graphics/1.Sharkie/1.IDLE/13.png",
    "graphics/1.Sharkie/1.IDLE/14.png",
    "graphics/1.Sharkie/1.IDLE/15.png",
    "graphics/1.Sharkie/1.IDLE/16.png",
    "graphics/1.Sharkie/1.IDLE/17.png",
    "graphics/1.Sharkie/1.IDLE/18.png",
  ];
  IMAGES_SWIM = [
    "graphics/1.Sharkie/3.Swim/1.png",
    "graphics/1.Sharkie/3.Swim/2.png",
    "graphics/1.Sharkie/3.Swim/3.png",
    "graphics/1.Sharkie/3.Swim/4.png",
    "graphics/1.Sharkie/3.Swim/5.png",
    "graphics/1.Sharkie/3.Swim/6.png",
  ];
  world;

  constructor() {
    super().loadImage("graphics/1.Sharkie/1.IDLE/1.png");
    this.loadImages(this.IMAGES_SWIM);
    this.animate();
  }

  animate() {

    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.cameraX = -this.x;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.IMAGES_SWIM.length;
        let path = this.IMAGES_SWIM[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 50);
  }

  jump() {}
}
