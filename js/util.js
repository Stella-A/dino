`use strict`;

(function () {
	window.util = {
		ARROW_TOP: 38,
		ARROW_BOTTOM: 40,
		KEY_ESC: 27,
		KEY_SPACE: 32,
		TIME_IN_THE_AIR: 250,
		SCENE_RUN: `scene--run`,
		SCENE_DARK: `scene--dark`,
		PLAY_RUN: `play--run`,
		DINO_RUN: `dino--run`,
		DINO_SIT: `dino--sit`,
		DINO_JUMP: `300px`,
		delay: 25,

		removeClass: function (elem, className) {
			elem.classList.remove(className);
		},

		addClass: function (elem, className) {
			elem.classList.add(className);
		},

		hasClass: function (elem, className) {
			return elem.classList.contains(className);
		},

		random: function(min, max) {
			return min + Math.random() * (max - min);
		},
	};
})();
