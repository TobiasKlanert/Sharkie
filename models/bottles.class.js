class BOTTLES extends DrawableObject {
  IMAGES_BOTTLES = [
    "graphics/4. Marcadores/Posión/Animada/1.png",
    "graphics/4. Marcadores/Posión/Animada/2.png",
    "graphics/4. Marcadores/Posión/Animada/3.png",
    "graphics/4. Marcadores/Posión/Animada/4.png",
    "graphics/4. Marcadores/Posión/Animada/5.png",
    "graphics/4. Marcadores/Posión/Animada/6.png",
    "graphics/4. Marcadores/Posión/Animada/7.png",
    "graphics/4. Marcadores/Posión/Animada/8.png",
  ];

  /* offset = {
    top: 50,
    left: 10,
    right: 20,
    bottom: 50,
  }; */

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  constructor(x) {
    super().loadImage("graphics/4. Marcadores/Posión/Animada/1.png");
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = x;
    this.y = 300;
    this.height = 130;
    this.width = 75;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 200);
  }
}
