import { app, gameLoop, play } from "./main.js";
import { meteroids } from "./meteroid.js";
import { spacecraft } from "./spacecraft.js";
import { scoreDisplay } from "./score-display.js";

export const startGame = () => {
	scoreDisplay.score = 0;
	app.ticker.add(gameLoop);
	play.remove();
	if (play.textContent === "↺") resetActors();
};

export const stopGame = () => {
	app.ticker.remove(gameLoop);
	document.body.appendChild(play);
	play.textContent = "↺";
	scoreDisplay.updateHighscore();
};

const resetActors = () => {
	console.log("lel");
	spacecraft.x = window.innerWidth * 0.1;
	spacecraft.y = window.innerHeight * 0.45;
	spacecraft.life = 3;

	meteroids.forEach((m) => {
		m.x = window.innerWidth;
		m.y = Math.random() * window.innerHeight;
	});
};
