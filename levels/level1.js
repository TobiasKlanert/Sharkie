let x = 0;
let y = 0;

let barriers;
let coins;
let bottles;

let level1;

/**
 * Initializes the assets for the level.
 * This function generates barriers, coins, and bottles using the `Level` class's static methods.
 * The generated assets are flattened into single arrays for easier use.
 */
function initAssets() {
  barriers = Level.generateBarriers().flat();
  coins = Level.generateCoinGroups(barriers).flat();
  bottles = Level.generateBottles(barriers, coins).flat();
}

/**
 * Initializes Level 1 by creating a new `Level` object.
 * The level includes enemies, lights, background objects, and assets.
 */
function initLevel() {
  level1 = new Level(
    generateEnemies(),
    generateLights(),
    generateBackgroundObjects(),
    barriers,
    coins,
    bottles
  );
}

/**
 * Generates an array of enemies for the level.
 * Ensures that all regular enemies are at least 500px apart from each other and the Endboss.
 * @returns {Array} An array of `Enemy` and `Endboss` objects.
 */
function generateEnemies() {
  const enemies = [
    ...Array.from({ length: 20 }, () => new Enemy()),
    new Endboss(),
  ];
  Level.adjustEnemyPositions(enemies);
  return enemies;
}

/**
 * Generates an array of light objects for the level.
 * @returns {Array} An array of `Light` objects for background effects.
 */
function generateLights() {
  return Array.from({ length: 4 }, (_, i) => [
    new Light(
      "graphics/3. Background/Layers/1. Light/1.png",
      2560 + i * 7680,
      0.75
    ),
    new Light(
      "graphics/3. Background/Layers/1. Light/2.png",
      3840 + i * 7680,
      0.75
    ),
  ]).flat();
}

/**
 * Generates an array of background objects for the level.
 * @returns {Array} An array of `BackgroundObject` objects for parallax effects.
 */
function generateBackgroundObjects() {
  return Array.from({ length: 10 }, (_, index) => {
    const i = index * 2;
    return [
      new BackgroundObject(
        "graphics/3. Background/Layers/5. Water/D1.png",
        1280 * i,
        0.2
      ),
      new BackgroundObject(
        "graphics/3. Background/Layers/4.Fondo 2/D1.png",
        1280 * i,
        0.4
      ),
      new BackgroundObject(
        "graphics/3. Background/Layers/3.Fondo 1/D1.png",
        1280 * i,
        0.6
      ),
      new BackgroundObject(
        "graphics/3. Background/Layers/2. Floor/D1.png",
        1280 * i,
        1.0
      ),
      new BackgroundObject(
        "graphics/3. Background/Layers/5. Water/D2.png",
        1280 * (i + 1),
        0.2
      ),
      new BackgroundObject(
        "graphics/3. Background/Layers/4.Fondo 2/D2.png",
        1280 * (i + 1),
        0.4
      ),
      new BackgroundObject(
        "graphics/3. Background/Layers/3.Fondo 1/D2.png",
        1280 * (i + 1),
        0.6
      ),
      new BackgroundObject(
        "graphics/3. Background/Layers/2. Floor/D2.png",
        1280 * (i + 1),
        1.0
      ),
    ];
  }).flat();
}
