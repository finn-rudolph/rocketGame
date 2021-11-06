// import { Container } from "@pixi/display";

class ParallaxLayer extends PIXI.Container {
	constructor(speed, height, width) {
		super();

		this.speed = speed;
		this.height = height;
		this.width = width;

		this.move = (delta) =>
			this.children.forEach((child) => {
				child.x -= speed * delta;
			});

		this.generate = (
			averageDisplayedObjects,
			objectType, // e.g. star, meteroid
			imagesAmount,
			delta
		) => {
			const probability =
				delta / (window.innerWidth / this.speed / averageDisplayedObjects);
			if (Math.random() <= probability) {
				const sprite = new PIXI.Sprite(
					PIXI.Texture.from(
						`/public/graphics/${objectType}s/${objectType}${Math.floor(
							Math.random() * imagesAmount
						)}.svg`
					)
				);
				sprite.position.x = window.innerWidth + sprite.width;
				sprite.position.y = window.innerHeight * Math.random();
				this.addChild(sprite);
			}
			console.log(this.children.length);
		};
		this.removeInvisible = () =>
			this.children.forEach((child) => {
				if (child.position.x < -child.width) this.removeChild(child);
			});
	}
}

export const layer1 = new ParallaxLayer(
	60,
	window.innerHeight,
	window.innerWidth
);
