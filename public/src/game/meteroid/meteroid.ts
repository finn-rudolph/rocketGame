import { Actor } from "../abstractions";

class Meteroid extends Actor {
	constructor(
		positionX: number,
		positionY: number,
		velocityX: number,
		velocityY: number
	) {
		super(positionX, positionY, velocityX, velocityY);
	}
}
