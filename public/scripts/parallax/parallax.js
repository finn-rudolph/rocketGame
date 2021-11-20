// import { Container } from "@pixi/display";

class ParallaxLayer extends PIXI.Container {
	constructor(speed, scale, objectType, imagesAmount, averageDisplayedObjects) {
		super();
		this.height = window.innerHeight;
		this.width = window.innerWidth;

		this.textures = new Array(imagesAmount)
			.fill(0)
			.map((_v, i) =>
				PIXI.Texture.from(
					`/public/graphics/${objectType}s/${objectType}${i}.svg`,
					{ resourceOptions: { scale: scale } }
				)
			);
		console.log(this.textures);

		this.move = (delta) =>
			this.children.forEach((child) => {
				child.x -= speed * delta;
			});

		this.generate = (delta) => {
			const probability =
				delta / (this.width / speed / averageDisplayedObjects);
			if (Math.random() <= probability) {
				const sprite = new PIXI.Sprite(
					this.textures[Math.floor(Math.random() * imagesAmount)]
				);
				sprite.position.x = window.innerWidth + sprite.width;
				sprite.position.y = window.innerHeight * Math.random();
				this.addChild(sprite);
			}
		};
		this.removeInvisible = () =>
			this.children.forEach((child) => {
				if (child.position.x < -child.width) this.removeChild(child);
			});
	}
}

export const layers = [
	new ParallaxLayer(60, 1, "star", 4, 25),
	new ParallaxLayer(80, 0.05, "space-object", 44, 10)
];
