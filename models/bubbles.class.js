class Bubble extends MovableObject {


    constructor(x, y) {
        super().loadImage("graphics/1.Sharkie/4.Attack/Bubble trap/Bubble.png");
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.throw();
    }

    throw() {
        setInterval( () => {
           this.x += 10; 
        }, 50);
    }
}