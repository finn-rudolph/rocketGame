// import PIXI from "pixi.js";
import { layers } from "./parallax/parallax.js";

const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	backgroundColor: 0x000000
});
layers.forEach((layer) => app.stage.addChild(layer));
console.log(layers);

// game loop
app.ticker.add(async () => {
	layers.forEach((layer) => {
		layer.generate(app.ticker.deltaMS / 1000);
		layer.removeInvisible();
		layer.move(app.ticker.deltaMS / 1000);
	});
});

app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);
