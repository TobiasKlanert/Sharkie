let x = 0;
let y = 0;

let barriers = Level.generateBarriers().flat();
let coins = Level.generateCoinGroups(barriers).flat();
let bottles = Level.generateBottles(barriers, coins).flat();

let level1;

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
          new BackgroundObject(
            "graphics/3. Background/Layers/5. Water/D1.png",
            1280 * i
          ),
          new BackgroundObject(
            "graphics/3. Background/Layers/4.Fondo 2/D1.png",
            1280 * i
          ),
          new BackgroundObject(
            "graphics/3. Background/Layers/3.Fondo 1/D1.png",
            1280 * i
          ),
          new BackgroundObject(
            "graphics/3. Background/Layers/2. Floor/D1.png",
            1280 * i
          ),
          new BackgroundObject(
            "graphics/3. Background/Layers/5. Water/D2.png",
            1280 * (i + 1)
          ),
          new BackgroundObject(
            "graphics/3. Background/Layers/4.Fondo 2/D2.png",
            1280 * (i + 1)
          ),
          new BackgroundObject(
            "graphics/3. Background/Layers/3.Fondo 1/D2.png",
            1280 * (i + 1)
          ),
          new BackgroundObject(
            "graphics/3. Background/Layers/2. Floor/D2.png",
            1280 * (i + 1)
          ),
        ];
      }).flat(),
    ],
    barriers,
    coins,
    bottles
  );
}
