(function (global) {
	function EventObserver(target, type, capture) {
		var self = this;

		// initalize private properties
		self._CONNECTED = false;
		self._ON = [];
		self._LISTENER = function (event) {
			fire(self, event);
		};
		self._TARGET = target;
		self._TYPE = type;
		self._USECAPTURE = capture;
	};

	EventObserver.prototype = {
		// <EventObserver>
		constructor: EventObserver,

		// <EventObserver>.forEach
		forEach: function forEach(callback) {
			// validated observer and callback
			var self = validate(this, callback, 'forEach');

			// start observer
			connect(self);

			// add callback
			add(self, callback);

			// return observer
			return self;
		},

		// <EventObserver>.filter
		filter: function filter(callback) {
			// validated observer and callback
			var self = validate(this, callback, 'filter');

			// start observer
			connect(self);

			// next observer
			var next = new EventObserver(self, self._TYPE, self._CAPTURE);

			// add callback
			add(self, function (event, index) {
				// if callback returns truthy
				if (callback.call(self, event, index)) {
					// fire next observer with event
					fire(next, event);
				}
			});

			// return next observer
			return next;
		},

		// <EventObserver>.until
		until: function until(callback) {
			// validated observer and callback
			var self = validate(this, callback, 'until');

			// start observer
			connect(self);

			// add callback
			add(self, function (event, index) {
				// if callback returns truthy
				if (callback.call(self, event, index)) {
					// disconnect observer
					disconnect(self);
				}
			});

			// return observer
			return self;
		},

		// <EventObserver>.map
		map: function map(callback) {
			// validated observer and callback
			var self = validate(this, callback, 'map');

			// start observer
			connect(self);

			// next observer
			var next = new EventObserver(self, self._TYPE, self._CAPTURE);

			// add callback
			add(self, function (event, index) {
				// result of the callback
				var result = callback.call(self, event, index);

				// fire next observer with result
				fire(next, result);
			});

			// return next observer
			return next;
		},

		// <EventObserver>.start
		start: function start() {
			// validated observer
			var self = validate(this, validate);

			connect(self);

			return self;
		},

		// <EventObserver>.stop
		stop: function stop() {
			// validated observer
			var self = validate(this, validate);

			disconnect(self);

			return self;
		}
	};

	function validate(target, callback, name) {
		// if the target is an observer
		if (target instanceof EventObserver) {
			// if the callback is a function
			if (callback instanceof Function) {
				// return the target
				return target;
			}

			// otherwise, throw an error regarding the callback
			throw new TypeError(name + '() requires a valid callback.');
		}

		// otherwise, throw an error regarding the target
		throw new TypeError('EventObserver requires a valid target.');
	}

	function add(self, callback) {
		self._ON.push(callback);
	}

	function fire(self, event) {
		self._ON.forEach(function (callback, index) {
			callback.call(self, event, index);
		});
	}

	function connect(self) {
		if (!self._CONNECTED) {
			self._CONNECTED = true;

			if (self._TARGET instanceof EventObserver) {
				connect(self._TARGET);
			} else if (self._TARGET instanceof Node) {
				self._TYPE.trim().split(/\s+/).forEach(function (type) {
					self._TARGET.addEventListener(type, self._LISTENER, self._CAPTURE);
				});
			}

			return true;
		}

		return false;
	}

	function disconnect(self) {
		if (self._CONNECTED) {
			self._CONNECTED = false;

			if (self._TARGET instanceof EventObserver) {
				disconnect(self._TARGET);
			} else if (self._TARGET instanceof Node) {
				self._TYPE.trim().split(/\s+/).reverse().forEach(function (type) {
					self._TARGET.removeEventListener(type, self._LISTENER);
				});
			}

			self._ON.splice(0);
		}
	}

	function on(type, capture) {
		return new EventObserver(this, type, capture);
	}

	global.EventObserver = EventObserver;

	global.Window.prototype.on = global.Document.prototype.on = global.Element.prototype.on = on;
})(this);
