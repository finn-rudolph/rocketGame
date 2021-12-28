class ScoreDisplay extends PIXI.Container {
	constructor() {
		super();
		this.x = window.innerWidth * 0.9;
		this.y = window.innerHeight * 0.05;
		this.score = 0;

		this.scoreStyle = new PIXI.TextStyle({
			fill: "#ffffff",
			fontSize: 0.03 * window.innerHeight
		});

		this.ScoreDisplay = new PIXI.Text(0, this.scoreStyle);

		this.highscoreStyle = new PIXI.TextStyle({
			fill: "#ffffff",
			fontSize: 0.02 * window.innerHeight
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

export const scoreDisplay = new ScoreDisplay();
