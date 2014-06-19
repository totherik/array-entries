'use strict';

var test = require('tape');
var entries = require('../array-entries').arrayEntries;


test('types', function (t) {

    t.throws(function () {
        entries(null);
    });

    t.throws(function () {
        entries(undefined);
    });

    t.doesNotThrow(function () {
        entries({});
    });

    t.doesNotThrow(function () {
        entries([]);
    });

    t.doesNotThrow(function () {
        entries('');
    });

    t.doesNotThrow(function () {
        entries('foo');
    });

    t.doesNotThrow(function () {
        entries(0);
    });

    t.doesNotThrow(function () {
        entries(1);
    });

    t.doesNotThrow(function () {
        entries(true);
    });

    t.doesNotThrow(function () {
        entries(false);
    });

    t.doesNotThrow(function () {
        entries(new Date());
    });

    t.doesNotThrow(function () {
        entries(Infinity);
    });

    t.doesNotThrow(function () {
        entries(NaN);
    });

    t.end();
});


test('kind', function (t) {

    t.test('key', function () {
        var arr, iter, current;

        arr = ['a', 'b', 'c'];
        iter = entries(arr);
        iter.kind = 'key';

        t.equal(typeof iter, 'object');
        t.equal(iter.constructor.name, 'ArrayIterator');
        t.equal(typeof iter.next, 'function');

        while ((current = iter.next()) && !current.done) {
            t.ok(current);
            t.ok(typeof current.value === 'number');
            t.ok(!current.done);
        }

        t.ok(current.done);
        t.end();
    });

    t.test('value', function (t) {
        var arr, iter, current;

        arr = ['a', 'b', 'c'];
        iter = entries(arr);
        iter.kind = 'value';

        t.equal(typeof iter, 'object');
        t.equal(iter.constructor.name, 'ArrayIterator');
        t.equal(typeof iter.next, 'function');

        while ((current = iter.next()) && !current.done) {
            t.ok(current);
            t.ok(typeof current.value === 'string');
            t.ok(!current.done);
        }

        t.ok(current.done);
        t.end();
    });

    t.test('key+value', function (t) {
        var arr, iter, current;

        arr = ['a', 'b', 'c'];
        iter = entries(arr);
        iter.kind = 'key+value';

        t.equal(typeof iter, 'object');
        t.equal(iter.constructor.name, 'ArrayIterator');
        t.equal(typeof iter.next, 'function');

        while ((current = iter.next()) && !current.done) {
            t.ok(current);
            t.ok(Array.isArray(current.value));
            t.ok(typeof current.value[0] === 'number');
            t.ok(typeof current.value[1] === 'string');
            t.ok(!current.done);
        }

        t.ok(current.done);
        t.end();
    });

    t.test('other', function (t) {
        var arr, iter;

        arr = ['a', 'b', 'c'];
        iter = entries(arr);
        iter.kind = '';

        t.equal(typeof iter, 'object');
        t.equal(iter.constructor.name, 'ArrayIterator');
        t.equal(typeof iter.next, 'function');

        t.throws(function () {
            iter.next();
        });
        t.end();
    });

});


test('array-like', function (t) {

    function run() {
        var iter, current;

        iter = entries(arguments);
        iter.kind = 'key+value';

        t.equal(typeof iter, 'object');
        t.equal(iter.constructor.name, 'ArrayIterator');
        t.equal(typeof iter.next, 'function');

        while ((current = iter.next()) && !current.done) {
            t.ok(current);
            t.ok(Array.isArray(current.value));
            t.ok(typeof current.value[0] === 'number');
            t.ok(typeof current.value[1] === 'string');
            t.ok(!current.done);
        }

        t.ok(current.done);
        t.end();
    }

    run('a', 'b', 'c');
});

test('not array-like', function (t) {

    t.end();
});