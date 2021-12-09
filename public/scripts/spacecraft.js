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

		this.checkBorder = () => {
			if (this.x <= 0) this.speed.x = 100;
			if (this.x + this.width >= window.innerWidth) this.speed.x = -100;
			if (this.y <= 0) this.speed.y = 100;
			if (this.y + this.height >= window.innerHeight) this.speed.y = -100;
		};

		window.addEventListener("keydown", (event) => {
			switch (event.key) {
				case "w":
				case "ArrowUp":
					this.acceleration.y = -4500;
					break;
				case "a":
				case "ArrowLeft":
					this.acceleration.x = -4500;
					break;
				case "s":
				case "ArrowDown":
					this.acceleration.y = 4500;
					break;
				case "d":
				case "ArrowRight":
					this.acceleration.x = 4500;
					break;
			}
		});

		window.addEventListener("keyup", (event) => {
			switch (event.key) {
				case "w":
				case "ArrowUp":
					this.acceleration.y = 0;
					break;
				case "a":
				case "ArrowLeft":
					this.acceleration.x = 0;
					break;
				case "s":
				case "ArrowDown":
					this.acceleration.y = 0;
					break;
				case "d":
				case "ArrowRight":
					this.acceleration.x = 0;
					break;
			}
		});
	}
}

export const spacecraft = new Spacecraft(
	"alkaid",
	"light-blue",
	window.innerHeight / 3200
);
