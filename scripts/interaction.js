import { spacecraft, Spacecraft } from "./spacecraft.js";
import { meteroids } from "./meteroid.js";

const sweepAndPrune = (actors) => {
	for (let i = 0; i < actors.length; i++) {
		const a = actors[i];
		for (let j = i + 1; j < actors.length; j++) {
			const b = actors[j];
			if (a.x + a.width >= b.x) {
				if (a.y + a.height >= b.y && a.y <= b.y + b.height) {
					const tmpX = a.speed.x;
					const tmpY = a.speed.y;

					a.speed.x = b.speed.x;
					b.speed.x = tmpX;

					a.speed.y = b.speed.y;
					b.speed.y = tmpY;
					if (a instanceof Spacecraft) a.decrementLife();
					else if (b instanceof Spacecraft) b.decrementLife();
				}
			} else {
				break;
			}
		}
	}
};

const insertionSort = (array) => {
	for (let i = 1; i < array.length; i++) {
		let j = i;
		while (j > 0 && array[j - 1].x > array[j].x) {
			let tmp = array[j - 1];
			array[j - 1] = array[j];
			array[j] = tmp;
			j--;
		}
	}
};

const actors = [spacecraft, ...meteroids];

import("./main.js").then(({ gameLoop }) => {
	gameLoop.add(() => {
		insertionSort(actors);
		sweepAndPrune(actors);
	});
});
