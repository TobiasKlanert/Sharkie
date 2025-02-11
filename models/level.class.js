class Level {
  enemies;
  lights;
  backgroundObjects;
  coins;
  levelEndX = 13680;
  levelEndY = 0;

  constructor(enemies, lights, backgroundObjects, coins) {
    this.enemies = enemies;
    this.lights = lights;
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
  }

/*   randomize(coordinate) {
    return coordinate === "x"
      ? 300 + Math.random() * 12000
      : 100 + Math.floor(Math.random() * 251);
  } */

  static generateCoinGroups() {
    let coinGroups = [];
    let positions = [];
    for (let i = 0; i < 8; i++) {
      let startX, startY, validPosition;
      do {
        startX = 300 + Math.random() * 12000;
        startY = 100 + Math.floor(Math.random() * 251);
        validPosition = positions.every(
          (pos) => Math.hypot(pos.x - startX, pos.y - startY) >= 500
        );
        console.log(validPosition);
      } while (!validPosition);

      positions.push({ x: startX, y: startY });
      let formation = Math.floor(Math.random() * 4);
      let coins = [];

      for (let j = 0; j < 6; j++) {
        let xOffset = j * 75;
        let yOffset = 0;

        if (formation === 1) {
          yOffset = -Math.abs([0, 60, 90, 90, 60, 0][j]);
        } else if (formation === 2) {
          yOffset = -j * 30;
        } else if (formation === 3) {
          yOffset = j * 30;
        } else {
          yOffset = [0, -60, -90, -90, -60, 0][j];
        }

        coins.push(new COINS(startX + xOffset, startY + yOffset));
      }
      coinGroups.push(coins);
    }
    return coinGroups;
  }
}
