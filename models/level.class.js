class Level {
    enemies;
    lights;
    backgroundObjects;
    levelEndX = 13680;

    constructor(enemies, lights, backgroundObjects) {
        this.enemies = enemies;
        this.lights = lights;
        this.backgroundObjects = backgroundObjects;
    }
}