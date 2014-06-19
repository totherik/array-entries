;(function (exports) {
    'use strict';

    function ToObject(val) {
        if (val === null || val === undefined) {
            throw new TypeError('can\'t convert ' + val + ' to object');
        }

        return Object(val);
    }

    function AssertProperty(obj, key) {
        if (!obj.hasOwnProperty(key)) {
            throw new TypeError('ArrayIterator next called on incompatible ' + String(obj));
        }
    }

    function ArrayIterator(obj) {
        this.iteratedObject = ToObject(obj);
        this.index = 0;
        this.kind = "key+value";
    }

    ArrayIterator.prototype.next = function next() {
        var self, object, index, kind;

        self = ToObject(this);
        AssertProperty(self, 'iteratedObject');
        AssertProperty(self, 'index');
        AssertProperty(self, 'kind');

        if (self.iteratedObject === undefined) {
            return { done: true };
        }

        object = self.iteratedObject;
        index = self.index;
        kind = self.kind;

        if (index >= (object.length || 0)) {
            self.iteratedObject = undefined;
            return { done: true };
        }

        self.index += 1;

        if (kind === "key") {
            return { value: index, done: false };
        }

        if (kind === "value") {
            return { value: object[index], done: false };
        }

        if (kind === "key+value") {
            return { value: [ index, object[index] ], done: false };
        }

        throw new TypeError('Invalid ArrayIterationKind');
    };


    if (typeof Array.prototype.entries !== 'function') {
        Array.prototype.entries = function entries() {
            return new ArrayIterator(this);
        };
    }

    exports.arrayEntries = Function.prototype.call.bind(Array.prototype.entries);

}(typeof module !== 'undefined' ? module.exports : window));