// configuration

const maxSpeed = 450;
const slowdown = 300;
const bounceSpeed = 100;
const acceleration = 4500;

class Spacecraft extends PIXI.Sprite {
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

			if (this.speed.x > 0) this.speed.x -= slowdown * delta;
			if (this.speed.x < 0) this.speed.x += slowdown * delta;
			if (this.speed.y > 0) this.speed.y -= slowdown * delta;
			if (this.speed.y < 0) this.speed.y += slowdown * delta;

			if (this.speed.x < maxSpeed && this.speed.x > -maxSpeed)
				this.speed.x += this.acceleration.x * delta;
			if (this.speed.y < maxSpeed && this.speed.y > -maxSpeed)
				this.speed.y += this.acceleration.y * delta;
		};

		this.checkBorder = () => {
			if (this.x <= 0) this.speed.x = bounceSpeed;
			if (this.x + this.width >= window.innerWidth) this.speed.x = -bounceSpeed;
			if (this.y <= 0) this.speed.y = bounceSpeed;
			if (this.y + this.height >= window.innerHeight)
				this.speed.y = -bounceSpeed;
		};

		this.getSize = (angle) =>
			Math.abs(
				this.height / 2 + (this.width / 2 - this.height / 2) * Math.cos(angle)
			);

		window.addEventListener("keydown", (event) => {
			switch (event.key) {
				case "w":
				case "ArrowUp":
					this.acceleration.y = -acceleration;
					break;
				case "a":
				case "ArrowLeft":
					this.acceleration.x = -acceleration;
					break;
				case "s":
				case "ArrowDown":
					this.acceleration.y = acceleration;
					break;
				case "d":
				case "ArrowRight":
					this.acceleration.x = acceleration;
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
	window.innerHeight / 5100
);
