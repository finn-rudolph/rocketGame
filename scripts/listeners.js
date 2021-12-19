import { app, gameLoop } from "./main.js";

const play = document.getElementById("play");

play.addEventListener("click", () => {
	app.ticker.add(gameLoop);
	play.remove();
});
