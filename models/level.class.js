/**
 * Represents a level in the game.
 */
class Level {
  /** @type {Array} List of enemies in the level. */
  enemies;

  /** @type {Object} The end boss of the level. */
  endboss;

  /** @type {Array} List of lights in the level. */
  lights;

  /** @type {Array} List of background objects in the level. */
  backgroundObjects;

  /** @type {Array} List of barriers in the level. */
  barriers;

  /** @type {Array} List of coins in the level. */
  coins;

  /** @type {Array} List of bottles in the level. */
  bottles;

  /** @type {number} The starting X-coordinate of the level. */
  levelStartX = 230;

  /** @type {number} The ending X-coordinate of the level. */
  levelEndX = 24320;

  /** @type {number} The starting Y-coordinate of the level. */
  levelStartY = -200;

  /** @type {number} The ending Y-coordinate of the level. */
  levelEndY = 280;

  /**
   * Creates a new Level instance.
   * @param {Array} enemies - List of enemies in the level.
   * @param {Array} lights - List of lights in the level.
   * @param {Array} backgroundObjects - List of background objects in the level.
   * @param {Array} barriers - List of barriers in the level.
   * @param {Array} coins - List of coins in the level.
   * @param {Array} bottles - List of bottles in the level.
   */
  constructor(enemies, lights, backgroundObjects, barriers, coins, bottles) {
    this.enemies = enemies;
    this.lights = lights;
    this.backgroundObjects = backgroundObjects;
    this.barriers = barriers;
    this.coins = coins;
    this.bottles = bottles;
  }

  /**
   * Checks if a new item overlaps with existing items within a minimum distance.
   * @param {Object} newItem - The new item to check.
   * @param {Array} existingItems - The list of existing items.
   * @param {number} minDistance - The minimum distance to avoid overlap.
   * @returns {boolean} True if overlapping, otherwise false.
   */
  static isOverlapping(newItem, existingItems, minDistance) {
    return existingItems.some(
      (item) =>
        Math.hypot(item.x - newItem.x, item.y - (newItem.y || 0)) < minDistance
    );
  }

  /**
   * Generates a list of barriers for the level.
   * @returns {Array} List of barrier objects.
   */
  static generateBarriers() {
    const barrierData = this.getBarrierData();
    let positions = [];
    return Array.from({ length: 7 }, () => {
      let { x, y, randomImage } = this.getValidBarrierPosition(
        barrierData,
        positions
      );
      positions.push({ x, y });
      let { width, height } = barrierData[randomImage];
      return new BARRIERS(x, y, width, height, randomImage);
    });
  }

  /**
   * Provides the data for the barriers in the level.
   * @returns {Object} An object containing barrier data.
   */
  static getBarrierData() {
    return {
      "graphics/3. Background/Barrier/1.png": { y: 0, width: 750, height: 720 },
      "graphics/3. Background/Barrier/2.png": {
        y: 320,
        width: 872,
        height: 400,
      },
      "graphics/3. Background/Barrier/3.png": {
        y: 100,
        width: 200,
        height: 409,
      },
    };
  }

  /**
   * Finds a valid position for a barrier that does not overlap with existing positions.
   * @param {Object} barrierData - The data for the barriers.
   * @param {Array} positions - The list of existing positions.
   * @returns {Object} An object containing the x, y coordinates and the random image.
   */
  static getValidBarrierPosition(barrierData, positions) {
    let randomImage, x, y, validPosition;
    do {
      randomImage = Object.keys(barrierData)[Math.floor(Math.random() * 3)];
      ({ y } = barrierData[randomImage]);
      x = 1000 + Math.random() * 20000;
      validPosition = !this.isOverlapping({ x, y }, positions, 2000);
    } while (!validPosition);
    return { x, y, randomImage };
  }

  /**
   * Generates groups of coins for the level.
   * @param {Array} existingBarriers - The list of existing barriers.
   * @returns {Array} List of coin formations.
   */
  static generateCoinGroups(existingBarriers) {
    let positions = [];
    return Array.from({ length: 5 }, () => {
      let { startX, startY } = this.getValidCoinPosition(
        positions,
        existingBarriers
      );
      positions.push({ x: startX, y: startY });
      return this.createCoinFormation(startX, startY);
    });
  }

  /**
   * Finds a valid position for a coin group that does not overlap with existing positions or barriers.
   * @param {Array} positions - The list of existing positions.
   * @param {Array} existingBarriers - The list of existing barriers.
   * @returns {Object} An object containing the startX and startY coordinates.
   */
  static getValidCoinPosition(positions, existingBarriers) {
    let startX, startY, validPosition;
    do {
      startX = 1000 + Math.random() * 22000;
      startY = 200 + Math.floor(Math.random() * 201);
      validPosition =
        !this.isOverlapping({ x: startX, y: startY }, positions, 500) &&
        !this.isOverlapping({ x: startX, y: startY }, existingBarriers, 1000);
    } while (!validPosition);
    return { startX, startY };
  }

  /**
   * Creates a formation of coins based on a random pattern.
   * @param {number} startX - The starting X-coordinate of the formation.
   * @param {number} startY - The starting Y-coordinate of the formation.
   * @returns {Array} List of coin objects in the formation.
   */
  static createCoinFormation(startX, startY) {
    const formations = [
      [0, 75, 105, 75, 0],
      [0, -75, -105, -75, 0],
      [0, -45, -90, -135, -180],
      [0, 45, 90, 135, 180],
    ];
    let formation = formations[Math.floor(Math.random() * formations.length)];
    return formation.map(
      (yOffset, j) => new COINS(startX + j * 100, startY + yOffset)
    );
  }

  /**
   * Generates bottles for the level.
   * @param {Array} existingBarriers - The list of existing barriers.
   * @param {Array} existingCoins - The list of existing coins.
   * @returns {Array} List of bottle objects.
   */
  static generateBottles(existingBarriers, existingCoins) {
    let positions = [];
    return Array.from({ length: 5 }, () => {
      let { x, y } = this.getValidBottlePosition(
        positions,
        existingBarriers,
        existingCoins
      );
      positions.push({ x, y });
      return new BOTTLES(x);
    });
  }

  /**
   * Finds a valid position for a bottle that does not overlap with existing positions, barriers, or coins.
   * @param {Array} positions - The list of existing positions.
   * @param {Array} existingBarriers - The list of existing barriers.
   * @param {Array} existingCoins - The list of existing coins.
   * @returns {Object} An object containing the x and y coordinates.
   */
  static getValidBottlePosition(positions, existingBarriers, existingCoins) {
    let x,
      y = 300,
      validPosition;
    do {
      x = 1000 + Math.random() * 22000;
      validPosition =
        !this.isOverlapping({ x, y }, positions, 500) &&
        !this.isOverlapping({ x, y }, existingBarriers, 1000) &&
        !this.isOverlapping({ x, y }, existingCoins.flat(), 500);
    } while (!validPosition);
    return { x, y };
  }

  /**
   * Ensures that all enemies (excluding the Endboss) are at least 500px apart from each other.
   * Adjusts the position of regular enemies if they are too close to each other or the Endboss.
   * @param {Array<Enemy>} enemies - The array of all existing enemies.
   */
  static adjustEnemyPositions(enemies) {
    const regularEnemies = enemies.filter(
      (enemy) => !(enemy instanceof Endboss)
    );
    const endboss = enemies.find((enemy) => enemy instanceof Endboss);

    regularEnemies.forEach((enemy, index) => {
      this.ensureEnemyDistance(enemy, regularEnemies, index);
      /* this.ensureDistanceFromEndboss(enemy, endboss); */
    });
  }

  /**
   * Ensures that the given enemy is at least 500px away from other regular enemies.
   * Repositions the enemy if it is too close to another enemy.
   * @param {Enemy} enemy - The enemy to check.
   * @param {Array<Enemy>} regularEnemies - The array of regular enemies.
   * @param {number} index - The index of the current enemy in the array.
   */
  static ensureEnemyDistance(enemy, regularEnemies, index) {
    let isTooClose = true;

    while (isTooClose) {
      isTooClose = false;

      for (let i = 0; i < regularEnemies.length; i++) {
        if (i !== index) {
          const otherEnemy = regularEnemies[i];
          if (Math.abs(enemy.x - otherEnemy.x) < 500) {
            enemy.x = 1000 + Math.random() * 23000;
            isTooClose = true;
            break;
          }
        }
      }
    }
  }

  /**
   * Ensures that the given enemy is at least 500px away from the Endboss.
   * Repositions the enemy if it is too close to the Endboss.
   * @param {Enemy} enemy - The enemy to check.
   * @param {Endboss} endboss - The Endboss instance.
   */
  static ensureDistanceFromEndboss(enemy, endboss) {
    if (endboss && Math.abs(enemy.x - endboss.x) < 500) {
      enemy.x = 1000 + Math.random() * 20000;
    }
  }
}
