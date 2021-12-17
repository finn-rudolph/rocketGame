// configuration

const meteroidsAmount = 8;
const imagesAmount = 12;
const maxSpeed = { x: -300, y: 30 };
const minSpeed = { x: -50, y: -30 };

class Meteroid extends PIXI.Sprite {
	constructor(scale) {
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

export const meteroids = new Array(meteroidsAmount)
	.fill(0)
	.map(() => new Meteroid(window.innerHeight / 10000));

export const checkCollision = (o1, o2) => {
	const dx =
		o1.x < o2.x
			? o2.x - o2.width / 2 - (o1.x + o1.width / 2)
			: o1.x - o1.width / 2 - (o2.x + o2.width / 2);

	const dy =
		o1.y < o2.y
			? o2.y - o2.height / 2 - (o1.y + o1.height / 2)
			: o1.y - o1.height / 2 - (o2.y + o2.height / 2);

	if (dx < 0 && dy < 0) {
		const prevSpeedX = o1.speed.x;
		const prevSpeedY = o1.speed.y;

		o1.speed.x = o2.speed.x;
		o2.speed.x = prevSpeedX;

		o1.speed.y = o2.speed.y;
		o2.speed.y = prevSpeedY;
	}
};
