/*jslint browser: true, white: true */
/*global define, window */

(function (factory) {

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	}
	else {
		(window.lski || (window.lski = {})).modal = factory();
	}

})
(function () {

	var defaults = {
            modalShow: 'lski-modal-show',
            events: {
                show: 'lski-modal-show',
                hide: 'lski-modal-hide'
            }
        },
        current = null;

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
		ele.dispatchEvent(createEvent(defaults.events.hide));
	}

	function show(element) {

		var ele = getModal(element),
			className = defaults.modalShow;

		if (!ele) {
			return;
		}
        
        // If there is already a modal box showing, close it first
        if(current) {
            hide(current, defaults.modalShow);
        }
        
        // Update the reference
        current = ele;

		addClass(ele, className);

		// Close by clicking overlay or any items with data-dismiss as an attribute
		once(ele.querySelectorAll('.lski-overlay, [data-dismiss]'), 'click', function () {
			hide(ele, className);
		});

		ele.dispatchEvent(createEvent(defaults.events.show));
	}

	function addClass(ele, className) {

		if (!hasClass(ele, className)) {
			ele.className += ' ' + defaults.modalShow;
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

	function createEvent(name) {

		if (Event.prototype.constructor) {
			return new Event(name);
		}
		else if (document.createEvent) {

			var event = document.createEvent('Event');
			event.initEvent(name, true, true);

			return event;
		}
		else {
			var event = document.createEventObject();
			event.eventName = name;

			return event;
		}

	}

});