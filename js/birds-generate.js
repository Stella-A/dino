`use strict`;

(function () {
	const minDelay = 5000;
	const maxDelay = 15000;

	let birdsGenerateTimer;
	let birdsRemoveTimer;

	window.birds = {
		runBirdsGenerate: function () {
			birdsGenerateTimer = setTimeout(function counter() {
				let randomDelay = Math.round(util.random(minDelay, maxDelay));

				if (pointsCounter.points % 1000 === 0) {
					randomDelay = Math.round(util.random(3500, 12000));
				} else if (pointsCounter.points % 2000 === 0) {
					randomDelay = Math.round(util.random(2000, 10000));
				}

				const bird = document.createElement(`div`);
				bird.style.bottom = `${Math.round(util.random(125, 200))}px`;
				util.addClass(bird, `bird`);

				playing.sceneElem.append(bird);

				const timer = setInterval(function () {
					if ((playing.dinoElem.getBoundingClientRect().top > (bird.getBoundingClientRect().top + bird.clientHeight))
						&& ((playing.dinoElem.getBoundingClientRect().right - 10) >= bird.getBoundingClientRect().left)) {
						playing.stop();
					}
				}, 50);

				setTimeout(function () {
					clearInterval(timer);
				}, 2000);

				birdsRemoveTimer = setTimeout(function () {
					if (document.querySelector(`.bird`)) {
						playing.sceneElem.removeChild(document.querySelector(`.bird`));
					}
				}, 8000);

				birdsGenerateTimer = setTimeout(counter, randomDelay);
			}, Math.round(util.random(minDelay, maxDelay)));
		},

		stopBirdsGenerate: function () {
			clearTimeout(birdsGenerateTimer);
		},

		stopBirdsRemove: function () {
			clearTimeout(birdsRemoveTimer);
		},

		deleteBirds: function () {
			document.querySelectorAll(`.bird`).forEach((item) => {
				item.remove();
			});
		}
	};
})();
