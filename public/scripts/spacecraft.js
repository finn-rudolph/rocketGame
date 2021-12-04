// import { Sprite } from "@pixi/sprite";
export class Spacecraft extends PIXI.Sprite {
	constructor(type, color, scale) {
		super(
			PIXI.Texture.from(`/public/graphics/spacecrafts/${type}-${color}.svg`, {
				resourceOptions: { scale: scale }
			})
		);
		this.x = window.innerWidth * 0.1;
		this.y = window.innerHeight * 0.45;
		this.speed = {
			x: 0,
			y: 0
		};
		this.acceleration = {
			x: 0,
			y: 0
		};

		this.move = (delta) => {
			console.log(
				this.speed.x,
				this.speed.y,
				this.acceleration.x,
				this.acceleration.y
			);
			this.x += this.speed.x * delta;
			this.y += this.speed.y * delta;

			if (this.speed.x > 0) this.speed.x -= 300 * delta;
			if (this.speed.x < 0) this.speed.x += 300 * delta;
			if (this.speed.y > 0) this.speed.y -= 300 * delta;
			if (this.speed.y < 0) this.speed.y += 300 * delta;

			if (this.speed.x < 450 && this.speed.x > -450)
				this.speed.x += this.acceleration.x * delta;
			if (this.speed.y < 450 && this.speed.y > -450)
				this.speed.y += this.acceleration.y * delta;
		};
	}
}

export const spacecraft = new Spacecraft(
	"alkaid",
	"light-blue",
	window.innerHeight / 3200
);

window.addEventListener("keydown", (event) => {
	switch (event.key) {
		case "w":
		case "ArrowUp":
			spacecraft.acceleration.y = -4500;
			break;
		case "a":
		case "ArrowLeft":
			spacecraft.acceleration.x = -4500;
			break;
		case "s":
		case "ArrowDown":
			spacecraft.acceleration.y = 4500;
			break;
		case "d":
		case "ArrowRight":
			spacecraft.acceleration.x = 4500;
			break;
	}
});

window.addEventListener("keyup", (event) => {
	switch (event.key) {
		case "w":
		case "ArrowUp":
			spacecraft.acceleration.y = 0;
			break;
		case "a":
		case "ArrowLeft":
			spacecraft.acceleration.x = 0;
			break;
		case "s":
		case "ArrowDown":
			spacecraft.acceleration.y = 0;
			break;
		case "d":
		case "ArrowRight":
			spacecraft.acceleration.x = 0;
			break;
	}
});
