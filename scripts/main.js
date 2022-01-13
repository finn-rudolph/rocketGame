export const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	backgroundColor: 0x000000
});

export const gameLoop = new PIXI.Ticker();

app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

window.addEventListener("resize", () => {
	app.renderer.resize(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
});

import {} from "./parallax.js";
import {} from "./interaction.js";
import {} from "./start-stop.js";
