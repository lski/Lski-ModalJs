/*!
* Lski-ModalJs - 0.5.0
*/
/*jslint browser: true, white: true */
/*global define, window */

(function(factory) {

	if (define && define.amd) {
		define([], factory);
	}
	else {
		(window.lski || (window.lski = {})).modal = factory();
	}

})
(function () {

	var defaults = {
		modalShow: 'mod-show',
		events: {
			show: 'mod-show',
			hide: 'mod-hide'
		}
	};

	return {
		show: show,
		hide: hide,
		toggle: toggle
	};

	function toggle(element) {

		var ele = getModal(element),
			className = defaults.modalShow;

		if (!ele) {
			return;
		}

		if (hasClass(ele, className)) {
			hide(ele, className);
		}
		else {
			show(ele, className);
		}
	}

	function hide(element) {

		var ele = getModal(element),
			className = defaults.modalShow;

		if (!ele) {
			return;
		}

		removeClass(ele, className);
		ele.dispatchEvent(new Event(defaults.events.hide));
	}

	function show(element) {

		var ele = getModal(element),
			className = defaults.modalShow;

		if (!ele) {
			return;
		}

		addClass(ele, className);

		// Close by clicking overlay or any items with data-dismiss as an attribute
		once(ele.querySelectorAll('.overlay, [data-dismiss]'), 'click', function() {
			hide(ele, className);
		});

		ele.dispatchEvent(new Event(defaults.events.show));
	}

	function addClass(ele, className) {

		if (!hasClass(ele, className)) {
			ele.className +=  ' ' + defaults.modalShow;
		}
	}

	function removeClass(ele, className) {
		ele.className = ele.className.replace(new RegExp(className, "gi"), '');
	}

	function hasClass(ele, className) {
		return new RegExp(className, "i").test(ele.className);
	}

	function getModal(element) {

		if (element instanceof Element) {
			return element;
		}

		return document.querySelector(element);
	}

	function once(elements, event, func) {

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			function handler() {

				func.apply(this, arguments);
				element.removeEventListener(event, handler, false);
			}

			element.addEventListener(event, handler, false);
		
		}
	}

});