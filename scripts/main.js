import { layers } from "./parallax.js";
import { spacecraft } from "./spacecraft.js";
import { meteroids } from "./meteroid.js";
import { checkCollision } from "./interaction.js";
import { startGame, stopGame } from "./start-stop.js";

const lifeIndicator = document.getElementById("lifeIndicator");
export const play = document.getElementById("play");

const actors = [spacecraft, ...meteroids];

export const app = new PIXI.Application({
	width: window.innerWidth,
	height: window.innerHeight,
	antialias: true,
	backgroundColor: 0x000000
});

// Add actors and the background
layers.forEach((layer) => app.stage.addChild(layer));
app.stage.addChild(spacecraft);
meteroids.forEach((m) => app.stage.addChild(m));

export const gameLoop = async () => {
	layers.forEach((layer) => {
		layer.generate(app.ticker.deltaMS / 1000);
		layer.removeInvisible();
		layer.move(app.ticker.deltaMS / 1000);
	});
	spacecraft.move(app.ticker.deltaMS / 1000);
	spacecraft.checkBorder();
	lifeIndicator.textContent = "🧡".repeat(spacecraft.life);
	if (spacecraft.life === 0) stopGame();
	meteroids.forEach((m) => {
		m.move(app.ticker.deltaMS / 1000);
		m.resetPosition();
	});
	actors.forEach((o1, index) => {
		for (let i = index + 1; i < actors.length; i++) {
			checkCollision(o1, actors[i]);
		}
	});
};

app.renderer.view.style.position = "absolute";
document.body.appendChild(app.view);

window.addEventListener("resize", () => {
	app.renderer.resize(
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	);
});

play.addEventListener("click", startGame);
