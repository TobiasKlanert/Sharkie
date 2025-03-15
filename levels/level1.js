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
    [
      ...Array.from({ length: 4 }, (_, i) => [
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
      ]).flat(),
    ],
    [
      ...Array.from({ length: 10 }, (_, index) => {
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
      }).flat(),
    ],
    barriers,
    coins,
    bottles
  );
}
