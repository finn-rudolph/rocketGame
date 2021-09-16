export class Actor {
    constructor(positionX, positionY, velocityX, velocityY) {
        this.position = new Position(positionX, positionY);
        this.velocity = new VelocityVector(velocityX, velocityY);
    }
}
class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class VelocityVector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
