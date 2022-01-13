class ScoreDisplay extends PIXI.Container {
	constructor(textColor, fontSize) {
		super();
		this.x = window.innerWidth * 0.9;
		this.y = window.innerHeight * 0.05;
		this.score = 0;

		this.scoreStyle = new PIXI.TextStyle({
			fill: textColor,
			fontSize: fontSize
		});

		this.ScoreDisplay = new PIXI.Text(0, this.scoreStyle);

		this.highscoreStyle = new PIXI.TextStyle({
			fill: textColor,
			fontSize: fontSize / 1.5
		});
		this.HighscoreDisplay = new PIXI.Text(
			localStorage.getItem("rokketHighscore") ?? 0,
			this.highscoreStyle
		);
		this.HighscoreDisplay.y = 0.05 * window.innerHeight;

		this.addChild(this.ScoreDisplay);
		this.addChild(this.HighscoreDisplay);

		this.updateScore = () => (this.ScoreDisplay.text = Math.floor(this.score));
		this.updateHighscore = () => {
			if (this.score > localStorage.getItem("rokketHighscore")) {
				this.HighscoreDisplay.text = Math.floor(this.score);
				localStorage.setItem("rokketHighscore", Math.floor(this.score));
			}
		};
	}
}

export const scoreDisplay = new ScoreDisplay(
	"#ffffff",
	0.03 * window.innerHeight
);

import("./main.js").then(({ app, gameLoop }) => {
	app.stage.addChild(scoreDisplay);
	gameLoop.add(() => {
		scoreDisplay.score += 0.2;
		scoreDisplay.updateScore();
	});
});
