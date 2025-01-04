class Enemy extends MovableObject {
    
    height = 150;
    width = 150;
    IMAGES_SWIM = [
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png',
    ];

    constructor() {
        super().loadImage('graphics/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.x = 300 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;
        this.loadImages(this.IMAGES_SWIM);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
          let i = this.currentImage % this.IMAGES_SWIM.length;
          let path = this.IMAGES_SWIM[i];
          this.img = this.imageCache[path];
          this.currentImage++;
        }, 200);
      }
}