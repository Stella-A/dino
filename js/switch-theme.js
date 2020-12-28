`use strict`;

(function () {
	window.switchTheme = {
		runSwitcher: function () {
			playing.sceneElem.classList.toggle(util.SCENE_DARK);
		},

		stopSwitcher: function () {
			util.removeClass(playing.sceneElem, util.SCENE_DARK);
		},
	};
})();
