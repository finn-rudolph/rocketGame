export abstract class Actor {
	position: Position;
	velocity: VelocityVector;
	constructor(
		positionX: number,
		positionY: number,
		velocityX: number,
		velocityY: number
	) {
		this.position = new Position(positionX, positionY);
		this.velocity = new VelocityVector(velocityX, velocityY);
	}
}

class Position {
	constructor(public x: number, public y: number) {}
}

class VelocityVector {
	constructor(public x: number, public y: number) {}
}
