import { Actor } from "../abstractions";
class Rocket extends Actor {
    constructor(positionX, positionY, velocityX, velocityY, life) {
        super(positionX, positionY, velocityX, velocityY);
        this.life = life;
    }
}
