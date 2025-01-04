const level1 = new Level(
    [new Enemy(), new Enemy(), new Enemy()],
    [new Light()],
    [
      ...Array.from({ length: 10 }, (_, index) => {
        const i = index * 2; // i läuft in 2er-Schritten von 0 bis 38 (20 Iterationen)
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
    ]
  );
