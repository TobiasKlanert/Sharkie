class Bubble extends MovableObject {
  normalBubble = "graphics/1.Sharkie/4.Attack/Bubble trap/Bubble.png";
  poisonedBubble =
    "graphics/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";

  throwInterval;
  rotation = 0;
  animationInterval;

  constructor(x, y, speed, bubble) {
    super();
    this.loadImage(this.getBubbleType(bubble));
    this.x = x;
    this.y = y;
    this.startX = x;
    this.width = 75;
    this.height = 75;
    this.isActive = true;
    this.sound = new Audio("audio/bubble-attack.mp3");
    soundsEnabled && this.sound.play();
    this.throw(speed);
    this.animate(5);
    this.checkBubbleRange();
    pushToIntervals([this.throwInterval, this.animationInterval, this.checkRangeInterval]);
  }

  throw(speed = 0) {
    let time = 0;
    this.throwInterval = setInterval(() => {
      this.x += 10 + speed;
      this.y += Math.cos(time) * 7.5;
      time += 0.1;
    }, 1000 / 60);
  }

  getBubbleType(bubble) {
    switch (bubble) {
      case "normal":
        return this.normalBubble;
      case "poisoned":
        return this.poisonedBubble;
    }
  }

  animate(rotationSpeed = 5) {
    let angle = 0;
    this.animationInterval = setInterval(() => {
      angle += rotationSpeed;
      this.rotation = (angle * Math.PI) / 180;
    }, 1000 / 60);
  }

  checkBubbleRange() {
    this.checkRangeInterval = setInterval(() => {
      if (this.x >= this.startX + 1000) {
        this.sound.pause();
        this.isActive = false;
      }
    }, 100);
  }
}
