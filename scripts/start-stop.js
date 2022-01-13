import { app, gameLoop } from "./main.js";
import { meteroids } from "./meteroid.js";
import { spacecraft } from "./spacecraft.js";
import { scoreDisplay } from "./score-display.js";
import { lifeIndicator } from "./main.js";

const play = document.querySelector("#play");
play.id = "play";

export const startGame = () => {
	gameLoop.start();
	play.remove();

	spacecraft.x = window.innerWidth * 0.1;
	spacecraft.y = window.innerHeight * 0.45;
	spacecraft.life = 3;
	spacecraft.explosion.stop();
	app.stage.removeChild(spacecraft.explosion);
	spacecraft.visible = true;

	scoreDisplay.score = 0;
	lifeIndicator.textContent = "🧡".repeat(spacecraft.life);

	meteroids.forEach((m) => {
		m.x = window.innerWidth;
		m.y = Math.random() * window.innerHeight;
	});
};
play.addEventListener("click", startGame);

export const stopGame = () => {
	gameLoop.stop();
	document.body.appendChild(play);
	scoreDisplay.updateHighscore();
	play.textContent = "↺";
};
