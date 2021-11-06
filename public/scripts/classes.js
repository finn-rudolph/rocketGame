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

class Meteroid extends Actor {
	constructor(positionX, positionY, velocityX, velocityY) {
		super(positionX, positionY, velocityX, velocityY);
	}
}

class Rocket extends Actor {
	constructor(positionX, positionY, velocityX, velocityY, life) {
		super(positionX, positionY, velocityX, velocityY);
		this.life = life;
	}
}
