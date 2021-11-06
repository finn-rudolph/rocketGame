// import PIXI from "pixi.js";
import { layer1 } from "./parallax/parallax.js";

const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	backgroundColor: 0x000000
});

app.stage.addChild(layer1);

// game loop
app.ticker.add(async () => {
	layer1.generate(25, "star", 4, app.ticker.deltaMS / 1000);
	layer1.removeInvisible();
	layer1.move(app.ticker.deltaMS / 1000);
});

app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);
