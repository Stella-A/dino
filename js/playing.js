(function () {
	function removeClassOnPausedOrStopped() {
		util.removeClass(playing.sceneElem, util.SCENE_RUN);
		util.removeClass(playing.dinoElem, util.DINO_RUN);
		util.removeClass(playing.dinoElem, util.DINO_SIT);
		util.removeClass(playing.playBtnElem, util.PLAY_RUN);
	}

	function onEventKeydown(e) {
		if(e.keyCode === util.ARROW_TOP) { // jump
			playing.jump();
		} else if(e.keyCode === util.ARROW_BOTTOM) { // sit down
			playing.sitDown();
		} else if(e.keyCode === util.KEY_ESC) { // pause
			playing.pause();
		}
	}

	function onEventKeyup(e) {
		if(e.keyCode === util.ARROW_BOTTOM) { // stand up
			playing.standUp();
		}
	}

	function onEventRun(e) {
		if(e.keyCode === util.KEY_SPACE) {
			// check has`n class play--run
			if (!util.hasClass(playing.playBtnElem, util.PLAY_RUN)) {
				playing.play();
			}
		}
	}

	// add event listener
	document.addEventListener(`keydown`, onEventRun);

	window.playing = {
		sceneElem: document.querySelector(`.scene`),
		dinoElem: document.querySelector(`.dino`),
		playBtnElem: document.querySelector(`.play`),

		play: function() {
			util.addClass(playing.sceneElem, util.SCENE_RUN);
			util.addClass(playing.playBtnElem, util.PLAY_RUN);
			util.addClass(playing.dinoElem, util.DINO_RUN);

			pointsCounter.runPointsCounter(util.delay);

			birds.runBirdsGenerate();

			cactus.runCactusGenerate();

			clouds.runCloudsGenerate();

			// remove event listener
			document.removeEventListener(`keydown`, onEventRun);

			// add event listener
			document.addEventListener(`keydown`, onEventKeydown);
			document.addEventListener(`keyup`, onEventKeyup);
		},

		pause: function() {
			removeClassOnPausedOrStopped();

			pointsCounter.clearPointsCounter();

			birds.stopBirdsGenerate();
			birds.stopBirdsRemove();

			cactus.stopCactusGenerate();
			cactus.stopCactusRemove();

			clouds.stopCloudsGenerate();
			clouds.stopCloudsRemove();

			switchTheme.stopSwitcher();

			// remove event listener
			document.removeEventListener(`keydown`, onEventKeydown);
			document.removeEventListener(`keyup`, onEventKeyup);

			// add event listener
			document.addEventListener(`keydown`, onEventRun);
		},

		stop: function() {
			removeClassOnPausedOrStopped();

			// remove switch theme
			switchTheme.stopSwitcher();
			util.removeClass(playing.sceneElem, util.SCENE_DARK);

			// remove event listener
			document.removeEventListener(`keydown`, onEventKeydown);
			document.removeEventListener(`keyup`, onEventKeyup);

			// add event listener
			document.addEventListener(`keydown`, onEventRun);

			pointsCounter.clearPointsCounter();

			birds.stopBirdsGenerate();
			birds.stopBirdsRemove();
			birds.deleteBirds();

			cactus.stopCactusGenerate();
			cactus.stopCactusRemove();
			cactus.deleteCactus();

			clouds.stopCloudsGenerate();
			clouds.stopCloudsRemove();
			clouds.deleteClouds();

			switchTheme.stopSwitcher();

			pointsCounter.setOrUpdateRecord();
		},

		standUp: function () {
			if(util.hasClass(playing.dinoElem, util.DINO_SIT)) {
				util.removeClass(playing.dinoElem, util.DINO_SIT);
				util.addClass(playing.dinoElem, util.DINO_RUN);
			}
		},

		sitDown: function () {
			if(util.hasClass(playing.dinoElem, util.DINO_RUN)) {
				util.removeClass(playing.dinoElem, util.DINO_RUN);
				util.addClass(playing.dinoElem, util.DINO_SIT);
			}
		},

		jump: function () {
			const bottom = playing.dinoElem.style.bottom;

			if(util.hasClass(playing.dinoElem, util.DINO_RUN)) {
				util.removeClass(playing.dinoElem, util.DINO_RUN);
			}

			playing.dinoElem.style.bottom = util.DINO_JUMP;

			setTimeout(function() {
				playing.dinoElem.style.bottom = bottom;
				if(!util.hasClass(playing.dinoElem, util.DINO_RUN)) {
					util.addClass(playing.dinoElem, util.DINO_RUN);
				}
			}, util.TIME_IN_THE_AIR);
		},
	};
})();
