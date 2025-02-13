class Level {
  enemies;
  lights;
  backgroundObjects;
  coins;
  bottles;
  levelEndX = 13680;
  levelEndY = 0;

  constructor(enemies, lights, backgroundObjects, coins, bottles) {
    this.enemies = enemies;
    this.lights = lights;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.bottles = bottles;
  }

  static generateCoinGroups() {
    let coinGroups = [];
    let positions = [];
    for (let i = 0; i < 8; i++) {
      let startX, startY, validPosition;
      do {
        startX = 300 + Math.random() * 12000;
        startY = 150 + Math.floor(Math.random() * 101);
        validPosition = positions.every(
          (pos) => Math.hypot(pos.x - startX, pos.y - startY) >= 500
        );
      } while (!validPosition);

      positions.push({ x: startX, y: startY });
      let formation = Math.floor(Math.random() * 5);
      let coins = [];

      for (let j = 0; j < 6; j++) {
        let xOffset = j * 75;
        let yOffset = 0;

        if (formation === 1) {
          yOffset = [0, -60, -90, -90, -60, 0][j];
        } else if (formation === 2) {
          yOffset = -j * 30;
        } else if (formation === 3) {
          yOffset = j * 30;
        } else {
          yOffset = [0, 60, 90, 90, 60, 0][j];
        }

        coins.push(new COINS(startX + xOffset, startY + yOffset));
      }
      coinGroups.push(coins);
    }
    return coinGroups;
  }

  static generateBottles() {
    let bottles = [];
    let positions = [];

    for (let i = 0; i < 8; i++) {
      let x, validPosition;
      do {
        x = 300 + Math.random() * 12000;
        validPosition = positions.every(
          (pos) => Math.hypot(pos.x - x) >= 500
        );
      } while (!validPosition);

      positions.push({ x });
      bottles.push(new BOTTLES(x));
    }

    return bottles;
  }
}
