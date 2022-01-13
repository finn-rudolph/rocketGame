class Meteroid extends PIXI.Sprite {
	constructor(maxSpeed, minSpeed, scale, imagesAmount) {
		super(
			PIXI.Texture.from(
				`graphics/meteroids/meteroid${Math.floor(
					Math.random() * imagesAmount
				)}.svg`,
				{ resourceOptions: { scale: scale } }
			)
		);
		this.x = window.innerWidth + this.width;
		this.y = Math.random() * window.innerHeight;

		this.speed = {
			x: Math.random() * (maxSpeed.x - minSpeed.x) + minSpeed.x,
			y: Math.random() * (maxSpeed.y - minSpeed.y) + minSpeed.y
		};
		this.move = (delta) => {
			this.x += this.speed.x * delta;
			this.y += this.speed.y * delta;
		};
		this.resetPosition = () => {
			if (
				this.x <= -this.width ||
				this.x >= window.innerWidth * 1.5 ||
				this.y <= -this.height ||
				this.y >= window.innerHeight
			) {
				this.x = window.innerWidth + this.width;
				this.y = Math.random() * window.innerHeight;
				this.speed = {
					x: Math.random() * (maxSpeed.x - minSpeed.x) + minSpeed.x,
					y: Math.random() * (maxSpeed.y - minSpeed.y) + minSpeed.y
				};
			}
		};
	}
}

export const meteroids = new Array(8)
	.fill(0)
	.map(
		() =>
			new Meteroid(
				{ x: -300, y: 30 },
				{ x: -50, y: -30 },
				window.innerHeight / 8500,
				12
			)
	);

import("./main.js").then(({ gameLoop, app }) => {
	meteroids.forEach((m) => app.stage.addChild(m));
	gameLoop.add(() => {
		meteroids.forEach((m) => {
			m.move(gameLoop.deltaMS / 1000);
			m.resetPosition();
		});
	});
});
