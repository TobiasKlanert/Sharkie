let x = 0;
let y = 0;

let barriers;
let coins;
let bottles;

let level1;

function initAssets() {
  barriers = Level.generateBarriers().flat();
  coins = Level.generateCoinGroups(barriers).flat();
  bottles = Level.generateBottles(barriers, coins).flat();
}

function initLevel() {
  level1 = new Level(
    [
      new Enemy(),
      new Enemy(),
      new Enemy(),
      new Enemy(),
      new Enemy(),
      new Enemy(),
      new Enemy(),
      new Enemy(),
      new Enemy(),
      new Enemy(),
      new Endboss(),
    ],
    [new Light()],
    [
      ...Array.from({ length: 10 }, (_, index) => {
        const i = index * 2;
        return [
          new BackgroundObject("graphics/3. Background/Layers/5. Water/D1.png", 1280 * i, 0.2),
          new BackgroundObject("graphics/3. Background/Layers/4.Fondo 2/D1.png", 1280 * i, 0.4),
          new BackgroundObject("graphics/3. Background/Layers/3.Fondo 1/D1.png", 1280 * i, 0.6),
          new BackgroundObject("graphics/3. Background/Layers/2. Floor/D1.png", 1280 * i, 1.0),
          new BackgroundObject("graphics/3. Background/Layers/5. Water/D2.png", 1280 * (i + 1), 0.2),
          new BackgroundObject("graphics/3. Background/Layers/4.Fondo 2/D2.png", 1280 * (i + 1), 0.4),
          new BackgroundObject("graphics/3. Background/Layers/3.Fondo 1/D2.png", 1280 * (i + 1), 0.6),
          new BackgroundObject("graphics/3. Background/Layers/2. Floor/D2.png", 1280 * (i + 1), 1.0),
        ];
      }).flat(),
    ],
    barriers,
    coins,
    bottles
  );
}
