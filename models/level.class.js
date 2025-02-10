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
}