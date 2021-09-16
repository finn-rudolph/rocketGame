import { Actor } from "../abstractions";

class Rocket extends Actor {
	constructor(
		positionX: number,
		positionY: number,
		velocityX: number,
		velocityY: number,
		public life: number
	) {
		super(positionX, positionY, velocityX, velocityY);
	}
}
