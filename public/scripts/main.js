// import PIXI from "pixi.js";
import { layers } from "./parallax.js";
import { spacecraft } from "./spacecraft.js";

const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	backgroundColor: 0x000000
});

// Add actors an the background
layers.forEach((layer) => app.stage.addChild(layer));
app.stage.addChild(spacecraft);

// game loop
app.ticker.add(async () => {
	layers.forEach((layer) => {
		layer.generate(app.ticker.deltaMS / 1000);
		layer.removeInvisible();
		layer.move(app.ticker.deltaMS / 1000);
	});
	spacecraft.move(app.ticker.deltaMS / 1000);
});

app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

window.addEventListener("resize", () => {
	app.renderer.resize(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
});
