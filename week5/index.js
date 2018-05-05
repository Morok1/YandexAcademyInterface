module.exports = {
    _events: {},
    _getSubscribers: function(event) {
        return this._events[event][0];
    },
    _getHandlers: function(event) {
        return this._events[event][1];
    },
    _getIndexSubscriber: function(event, subscriber) {
        var _subscribers = this._getSubscribers(event);
        return _subscribers.indexOf(subscriber);
    },
    _createEvent: function(event) {
        if (!(event in this._events)) {
            Object.defineProperty(this._events, event, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: [[], []]
            });
        }
    },
    _createHundlers: function(event, subscriber) {
        var _handlers = this._getHandlers(event);
        var _subscribers = this._getSubscribers(event);
        var _index = this._getIndexSubscriber(event, subscriber);

        if (_handlers[_index] === undefined) {
            _handlers.push([]);
        }
    },
    _createSubscriber: function(event, subscriber) {
        var _subscribers = this._getSubscribers(event);

        if (this._getIndexSubscriber(event, subscriber) === -1) {
            _subscribers.push(subscriber);
        }
    },
    _addHandler: function(event, subscriber, handler) {
        var _handlers = this._getHandlers(event);
        var _index = this._getIndexSubscriber(event, subscriber);

        _handlers[_index].push(handler.bind(subscriber));
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        this._createEvent(event);
        this._createSubscriber(event, subscriber);
        this._createHundlers(event, subscriber);

        this._addHandler(event, subscriber, handler);

        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (event in this._events) {
            var _handlers = this._getHandlers(event);
            var _subscribers = this._getSubscribers(event);
            var _index = this._getIndexSubscriber(event, subscriber);
    
            _subscribers.splice(_index, 1);
            _handlers.splice(_index, 1);
        }

        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (event in this._events) {
            var _handlers = this._getHandlers(event);

            for (var i = 0; i < _handlers.length; i++) {
                for (var j = 0; j < _handlers[i].length; j++) {
                    _handlers[i][j]();
                }
            }
        }

        return this;
    }
};
