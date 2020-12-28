`use strict`;

(function () {
	const minDelay = 1500;
	const maxDelay = 7000;

	let cactusGenerateTimer;
	let cactusRemoveTimer;

	window.cactus = {
		runCactusGenerate: function () {
			cactusGenerateTimer = setTimeout(function counter() {
				let randomDelay = Math.round(util.random(minDelay, maxDelay));

				if (pointsCounter.points % 1000 === 0) {
					randomDelay = Math.round(util.random(1000, 5000));
				} else if (pointsCounter.points % 2000 === 0) {
					randomDelay = Math.round(util.random(800, 3500));
				}

				const cactus = document.createElement(`div`);
				cactus.style.bottom = `${Math.round(util.random(80, 90))}px`;
				util.addClass(cactus, `cactus`);
				util.addClass(cactus, `cactus--${Math.round(util.random(1, 9))}`);

				playing.sceneElem.append(cactus);

				const timer = setInterval(function () {
					if (((playing.dinoElem.getBoundingClientRect().top + playing.dinoElem.clientHeight) > cactus.getBoundingClientRect().top)
						&& ((playing.dinoElem.getBoundingClientRect().right - 10) >= cactus.getBoundingClientRect().left)) {
						playing.stop();
					}
				}, 50);

				setTimeout(function () {
					clearInterval(timer);
				}, 4000);

				cactusRemoveTimer = setTimeout(function () {
					if (document.querySelector(`.cactus`)) {
						playing.sceneElem.removeChild(document.querySelector(`.cactus`));
					}
				}, 8000);

				cactusGenerateTimer = setTimeout(counter, randomDelay);
			}, Math.round(util.random(minDelay, maxDelay)));
		},

		stopCactusGenerate: function () {
			clearTimeout(cactusGenerateTimer);
		},

		stopCactusRemove: function () {
			clearTimeout(cactusRemoveTimer);
		},

		deleteCactus: function () {
			document.querySelectorAll(`.cactus`).forEach((item) => {
				item.remove();
			});
		}
	};
})();
