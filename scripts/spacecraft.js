import { stopGame } from "./start-stop.js";

export class Spacecraft extends PIXI.Sprite {
	constructor(
		type,
		color,
		scale,
		life,
		maxSpeed,
		acceleration,
		slowdown,
		bounceSpeed
	) {
		super(
			PIXI.Texture.from(`graphics/spacecrafts/${type}-${color}.svg`, {
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
		// Life is life, na na na nana
		this.life = life;

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

		this.decrementLife = () => {
			this.life -= 1;
			if (this.life <= 0) {
				this.addChild(this.explosion);
				this.explosion.play();
			}
		};

		// Setup explosion
		PIXI.Loader.shared
			.add("graphics/animations/explosions/explosion1.json")
			.load(() => {
				const sheet =
					PIXI.Loader.shared.resources[
						"graphics/animations/explosions/explosion1.json"
					].spritesheet;
				this.explosion = new PIXI.AnimatedSprite(
					sheet.animations["explosion-1"]
				);
				this.explosion.loop = false;
				this.explosion.animationSpeed = 0.2;
			});

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
	window.innerHeight / 5100,
	3,
	450,
	3500,
	750,
	100
);

const lifeIndicator = document.getElementById("lifeIndicator");

import("./main.js").then(({ app }) => {
	app.stage.addChild(spacecraft);
	app.ticker.add(() => {
		spacecraft.move(app.ticker.deltaMS / 1000);
		spacecraft.checkBorder();
		lifeIndicator.textContent = "🧡".repeat(spacecraft.life);
		if (spacecraft.life === 0) stopGame();
	});
});
