`use strict`;

(function () {
	const minDelay = 500;
	const maxDelay = 5000;

	let cloudsGenerateTimer;
	let cloudsRemoveTimer;

	window.clouds = {
		runCloudsGenerate: function () {
			cloudsGenerateTimer = setTimeout(function counter() {
				const randomDelay = Math.round(util.random(minDelay, maxDelay));

				const cloud = document.createElement(`div`);
				cloud.style.bottom = `${Math.round(util.random(190, 215))}px`;
				util.addClass(cloud, `cloud`);

				playing.sceneElem.append(cloud);

				cloudsRemoveTimer = setTimeout(function () {
					if (document.querySelector(`.cloud`)) {
						playing.sceneElem.removeChild(document.querySelector(`.cloud`));
					}
				}, 15000);

				cloudsGenerateTimer = setTimeout(counter, randomDelay);
			}, Math.round(util.random(minDelay, maxDelay)));
		},

		stopCloudsGenerate: function () {
			clearTimeout(cloudsGenerateTimer);
		},

		stopCloudsRemove: function () {
			clearTimeout(cloudsRemoveTimer);
		},

		deleteClouds: function () {
			document.querySelectorAll(`.cloud`).forEach((item) => {
				item.remove();
			});
		}
	};
})();
