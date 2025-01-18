class ThrowableObject extends MovableObject {


    constructor(x, y) {
        super().loadImage("graphics/4. Marcadores/Posión/Animada/1.png");
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
           this.x += 10; 
        }, 50);
    }
}