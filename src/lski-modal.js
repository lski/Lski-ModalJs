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

	var utils = {
		offset: function (el) {

			var rect = el.getBoundingClientRect();

			return {
				top: rect.top + document.body.scrollTop,
				left: rect.left + document.body.scrollLeft
			};
		},
		addClass: function (ele, className) {

			if (ele.classList) {
				ele.classList.add(className);
			}
			else if (!this.hasClass(ele, className)) {
				ele.className += ' ' + className;
			}
		},
		removeClass: function (ele, className) {

			if (ele.classList) {
				ele.classList.remove(className);
			}
			else {
				ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}
		},
		hasClass: function (ele, className) {

			if (ele.classList) {
				return ele.classList.contains(className);
			}
			else {
				return new RegExp('(^| )' + className + '( |$)', 'gi').test(ele.className);
			}
		},
		events: {
			on: function (element, event, handler) {

				element.addEventListener(event, handler, false);
			},
			once: function (elements, event, handler) {

				for (var i = 0; i < elements.length; i++) {

					var element = elements[i];

					function wrapper() {
						handler.apply(this, arguments);
						utils.events.off(element, event, wrapper);
					}

					utils.events.on(element, event, wrapper);
				}
			},
			off: function (element, event, handler) {

				element.removeEventListener(event, handler, false);
			},
			trigger: function (element, event) {

				element.dispatchEvent(typeof event === 'string' ? utils.events.create(event) : event);
			},
			create: function (name) {

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

		if (utils.hasClass(ele, className)) {
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

		utils.removeClass(ele, className);
		utils.events.trigger(ele, defaults.events.hide);
	}

	function show(element) {

		var ele = getModal(element),
			className = defaults.modalShow;

		if (!ele) {
			return;
		}

		// If there is already a modal box showing, close it first
		if (current) {
			hide(current, defaults.modalShow);
		}

		// Update the reference
		current = ele;

		utils.addClass(ele, className);

		// Close by clicking or any items with data-dismiss as an attribute
		// TODO: remove [data-dismiss]
		utils.events.once(ele.querySelectorAll('[data-modal-dismiss], [data-dismiss]'), 'click', function () {
			hide(ele, className);
		});

		utils.events.trigger(ele, defaults.events.show);
	}

	function getModal(element) {

		if (element) {

			if (element.nodeType === 1) {
				return element;
			}

			if (typeof element === 'string') {
				return document.querySelector(element);
			}
		}

		// Todo: replace this with a very basic layout for a dynamic modal if nothing passed
		throw new Error('The element is required to create a modal box');
	}

});