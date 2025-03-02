class Bubble extends MovableObject {
  normalBubble = "graphics/1.Sharkie/4.Attack/Bubble trap/Bubble.png";
  poisonedBubble =
    "graphics/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";

  throwInterval;

  constructor(x, y, speed, bubble) {
    super();
    this.loadImage(this.getBubbleType(bubble));
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
    this.throw(speed);
    this.pushToIntervals([this.throwInterval]);
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
}
