import { layers } from "./parallax.js";
import { spacecraft } from "./spacecraft.js";
import { meteroids, checkCollision } from "./meteroid.js";

const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	backgroundColor: 0x000000
});

// Add actors and the background
layers.forEach((layer) => app.stage.addChild(layer));
app.stage.addChild(spacecraft);
meteroids.forEach((m) => app.stage.addChild(m));

// game loop
app.ticker.add(async () => {
	layers.forEach((layer) => {
		layer.generate(app.ticker.deltaMS / 1000);
		layer.removeInvisible();
		layer.move(app.ticker.deltaMS / 1000);
	});
	spacecraft.move(app.ticker.deltaMS / 1000);
	spacecraft.checkBorder();
	meteroids.forEach((m) => {
		m.move(app.ticker.deltaMS / 1000);
		m.resetPosition();
	});
	[spacecraft, ...meteroids].forEach((o) =>
		checkCollision(o, [spacecraft, ...meteroids])
	);
});

app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

window.addEventListener("resize", () => {
	app.renderer.resize(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
});
