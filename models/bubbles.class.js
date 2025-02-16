class Bubble extends MovableObject {
  normalBubble = "graphics/1.Sharkie/4.Attack/Bubble trap/Bubble.png";
  poisonedBubble =
    "graphics/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png";

  constructor(x, y, speed, bubble) {
    super();
    this.loadImage(this.getBubbleType(bubble));
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.throw(speed);
  }

  throw(speed = 0) {
    setInterval(() => {
      this.x += 10 + speed;
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
