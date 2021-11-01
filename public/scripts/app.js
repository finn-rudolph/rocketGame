const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	backgroundColor: 0x202020
});

const loader = PIXI.Loader.shared;

loader
	.add("background", "/public/graphics/background.svg")
	.load((_loader, resources) => {
		const backgroundTexture = PIXI.Texture.from(
			resources["background"].data
		);
		const background = new PIXI.TilingSprite(
			backgroundTexture,
			app.screen.width,
			app.screen.height
		);
		app.stage.addChild(background);
		app.ticker.add((delta) => {
			background.tilePosition -= 3 * delta;
		});
	});

app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);
