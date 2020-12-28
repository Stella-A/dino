`use strict`;

(function () {
	const resultElem = document.querySelector(`.result`);
	const currentPointsElem = resultElem.querySelector(`.result__current`);
	const recordPointsElem = resultElem.querySelector(`.result__record`);

	let pointsCount;

	if (!localStorage.getItem(`points`)) {
		localStorage.setItem(`points`, String(0));
	} else {
		recordPointsElem.textContent = localStorage.getItem(`points`);
	}

	window.pointsCounter = {
		points: currentPointsElem.textContent,
		runPointsCounter: function(delay) {
			pointsCount = setTimeout(function counter() {
				++pointsCounter.points;
				currentPointsElem.textContent = pointsCounter.points;

				if (pointsCounter.points % 1000 === 0) {
					switchTheme.runSwitcher();
				}

				pointsCount = setTimeout(counter, delay);
			}, delay);
		},

		setOrUpdateRecord: function() {
			const currentPoints = Number(currentPointsElem.textContent);
			const recordPoints = Number(recordPointsElem.textContent);

			if (currentPoints > recordPoints) {
				recordPointsElem.textContent = String(currentPoints);

				localStorage.setItem(`points`, String(currentPoints));
			}

			pointsCounter.points = 0;
			currentPointsElem.textContent = String(pointsCounter.points);
		},

		clearPointsCounter: function () {
			clearTimeout(pointsCount);
		}
	};
})();
