let x = 0;
let y = 0;

const level1 = new Level(
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
          720 * i
        ),
        new BackgroundObject(
          "graphics/3. Background/Layers/4.Fondo 2/D1.png",
          720 * i
        ),
        new BackgroundObject(
          "graphics/3. Background/Layers/3.Fondo 1/D1.png",
          720 * i
        ),
        new BackgroundObject(
          "graphics/3. Background/Layers/2. Floor/D1.png",
          720 * i
        ),
        new BackgroundObject(
          "graphics/3. Background/Layers/5. Water/D2.png",
          720 * (i + 1)
        ),
        new BackgroundObject(
          "graphics/3. Background/Layers/4.Fondo 2/D2.png",
          720 * (i + 1)
        ),
        new BackgroundObject(
          "graphics/3. Background/Layers/3.Fondo 1/D2.png",
          720 * (i + 1)
        ),
        new BackgroundObject(
          "graphics/3. Background/Layers/2. Floor/D2.png",
          720 * (i + 1)
        ),
      ];
    }).flat(),
  ],
  [
    new COINS(randomize("x"), randomize("y")),
    new COINS(x + 75, y - 60),
    new COINS(x + 150, y - 90),
    new COINS(x + 225, y - 90),
    new COINS(x + 300, y - 60),
    new COINS(x + 375, y),
    /* new COINS(randomize("x"), randomize("y")),
    new COINS(randomize("x"), randomize("y")),
    new COINS(randomize("x"), randomize("y")),
    new COINS(randomize("x"), randomize("y")),
    new COINS(randomize("x"), randomize("y")),
    new COINS(randomize("x"), randomize("y")),
    new COINS(randomize("x"), randomize("y")),
    new COINS(randomize("x"), randomize("y")),
    new COINS(randomize("x"), randomize("y")), */
  ]
);

function randomize(coordinates) {
  switch (coordinates) {
    case "x":
      x = 300 + Math.random() * 12000;
      return x;
    case "y":
      y = 100 + Math.floor(Math.random() * 251);
      return y;
    default:
      break;
  }
}
