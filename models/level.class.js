class Level {
  enemies;
  lights;
  backgroundObjects;
  barriers;
  coins;
  bottles;
  levelEndX = 13680;
  levelEndY = 0;

  constructor(enemies, lights, backgroundObjects, barriers, coins, bottles) {
    this.enemies = enemies;
    this.lights = lights;
    this.backgroundObjects = backgroundObjects;
    this.barriers = barriers;
    this.coins = coins;
    this.bottles = bottles;
  }

  static isOverlapping(newItem, existingItems, minDistance) {   
    return existingItems.some(
      (item) =>
        Math.hypot(item.x - newItem.x, item.y - (newItem.y || 0)) < minDistance
    );
  }

  static generateBarriers() {
    let barriers = [];
    let positions = [];
    const barrierData = {
      "graphics/3. Background/Barrier/1.png": {
        y: 0,
        width: 500,
        height: 480,
      },
      "graphics/3. Background/Barrier/2.png": {
        y: 300,
        width: 436,
        height: 200,
      },
      "graphics/3. Background/Barrier/3.png": {
        y: 200,
        width: 150,
        height: 307,
      },
    };

    for (let i = 0; i < 5; i++) {
      let x, validPosition;
      do {
        x = 300 + Math.random() * 12000;
        validPosition = !this.isOverlapping({ x }, positions, 600);
      } while (!validPosition);

      positions.push({ x });
      let randomImage = Object.keys(barrierData)[Math.floor(Math.random() * 3)];
      let { y, width, height } = barrierData[randomImage];
      barriers.push(new BARRIERS(x, y, width, height, randomImage));
    }
    return barriers;
  }

  static generateCoinGroups(existingBarriers) {
    let coinGroups = [];
    let positions = [];

    for (let i = 0; i < 8; i++) {
      let startX, startY, validPosition;
      do {
        startX = 300 + Math.random() * 12000;
        startY = 150 + Math.floor(Math.random() * 101);
        validPosition =
          !this.isOverlapping({ x: startX, y: startY }, positions, 500) &&
          !this.isOverlapping({ x: startX, y: startY }, existingBarriers, 500);
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

  static generateBottles(existingBarriers, existingCoins) {
    let bottles = [];
    let positions = [];

    for (let i = 0; i < 8; i++) {
      let x, validPosition;
      do {
        x = 300 + Math.random() * 12000;
        validPosition =
          !this.isOverlapping({ x }, positions, 500) &&
          !this.isOverlapping({ x }, existingBarriers, 500) &&
          !this.isOverlapping({ x }, existingCoins.flat(), 500);
      } while (!validPosition);

      positions.push({ x });
      bottles.push(new BOTTLES(x));
    }
    return bottles;
  }
}
