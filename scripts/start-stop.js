import { gameLoop } from "./main.js";
import { meteroids } from "./meteroid.js";
import { spacecraft } from "./spacecraft.js";
import { scoreDisplay } from "./score-display.js";

const play = document.querySelector("#play");
play.id = "play";

export const resetGame = () => {
	gameLoop.start();
	play.remove();

	scoreDisplay.score = 0;
	spacecraft.x = window.innerWidth * 0.1;
	spacecraft.y = window.innerHeight * 0.45;
	spacecraft.life = 3;
	lifeIndicator.textContent = "🧡".repeat(spacecraft.life);

	meteroids.forEach((m) => {
		m.x = window.innerWidth;
		m.y = Math.random() * window.innerHeight;
	});
};
play.addEventListener("click", resetGame);

export const stopGame = () => {
	gameLoop.stop();
	document.body.appendChild(play);
	scoreDisplay.updateHighscore();
	play.textContent = "↺";
};
