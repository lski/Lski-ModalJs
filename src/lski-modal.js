/*jslint browser: true, white: true */
/*global define, window */

(function(factory) {

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	}
	else {
		(window.lski || (window.lski = {})).modal = factory();
	}

})
	(function() {

		var defaults = {
            classForShowingModal: 'lski-modal-show',
            events: {
				opened: 'lski-modal-opened',
				closed: 'lski-modal-closed',
				// TODO: depreciate ambigous event names
				show: 'lski-modal-show',
                hide: 'lski-modal-hide'
            }
        },
			current = null;

		var utils = {
			offset: function(el) {

				var rect = el.getBoundingClientRect();

				return {
					top: rect.top + document.body.scrollTop,
					left: rect.left + document.body.scrollLeft
				};
			},
			classes: (function() {

				var result = {};

				if ("classList" in document.createElement("_")) {

					result.add = function(ele, classname) {
						ele.classList.add(classname);
					};

					result.remove = function(ele, className) {
						ele.classList.remove(className);
					};

					result.has = function(ele, className) {
						return ele.classList.contains(className);
					};
				}
				else {

					result.add = function(ele, classname) {
						if (!this.hasClass(ele, classname)) {
							ele.className += ' ' + classname;
						}
					};

					result.remove = function(ele, className) {
						ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
					};

					result.has = function(ele, className) {
						return new RegExp('(^| )' + className + '( |$)', 'gi').test(ele.className);
					};
				}

				return result;

			})(),
			events: {
				on: function(element, event, handler) {

					element.addEventListener(event, handler, false);
				},
				once: function(elements, event, handler) {

					for (var i = 0; i < elements.length; i++) {

						var element = elements[i];

						function wrapper() {
							handler.apply(this, arguments);
							utils.events.off(element, event, wrapper);
						}

						utils.events.on(element, event, wrapper);
					}
				},
				off: function(element, event, handler) {

					element.removeEventListener(event, handler, false);
				},
				trigger: function(element, event) {

					element.dispatchEvent(typeof event === 'string' ? utils.events.create(event) : event);
				},
				create: (function() {

					if (typeof window.CustomEvent === "function") {

						return function(name) {
							return new CustomEvent(name, { bubbles: true, cancelable: true });
						};
					}
					else if (document.createEvent) {

						return function(name) {

							var event = document.createEvent('Event');
							event.initEvent(name, true, true);
							return event;
						};
					}
					else {

						return function(name) {

							var event = document.createEventObject();
							event.type = name;
							return event;
						};
					}

				})()
			}
		};

		return {
			show: show,
			hide: hide,
			toggle: toggle
		};

		function toggle(element) {

			var ele = getModal(element),
				className = defaults.classForShowingModal;

			if (!ele) {
				return;
			}

			if (utils.classes.has(ele, className)) {
				hide(ele, className);
			}
			else {
				show(ele, className);
			}
		}

		function hide(element) {

			var ele = getModal(element),
				className = defaults.classForShowingModal;

			if (!ele) {
				return;
			}

			utils.classes.remove(ele, className);
			utils.events.trigger(ele, defaults.events.hide);
			utils.events.trigger(ele, defaults.events.closed);
		}

		function show(element) {

			var ele = getModal(element),
				className = defaults.classForShowingModal;

			if (!ele) {
				return;
			}

			// If there is already a modal box showing, close it first
			if (current) {
				hide(current, defaults.classForShowingModal);
			}

			// Update the reference
			current = ele;

			utils.classes.add(ele, className);

			// Close by clicking or any items with data-dismiss as an attribute
			// TODO: remove [data-dismiss]
			utils.events.once(ele.querySelectorAll('[data-modal-dismiss], [data-dismiss]'), 'click', function() {
				hide(ele, className);
			});

			utils.events.trigger(ele, defaults.events.show);
			utils.events.trigger(ele, defaults.events.opened);
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