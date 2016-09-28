# EventObserver

<a href="https://github.com/jonathantneal/event-observer"><img src="https://jonathantneal.github.io/event-observer/logo.svg" title="EventObserver" align="right" width="80" height="80"></a>

[![NPM Version][npm-img]][npm] [![Build Status][ci-img]][ci]

[EventObserver] lets you treat DOM events like Arrays. The entire library is 0.6KB min/gzip.

```js
document.on('keydown').forEach(function (event) {
    // log every key code
    console.log(event.keyCode);
});
```

Event manipulation is as easy as working with arrays.

```js
document.on("keydown").map(function (event) {
    // only care about the key
    return event.keyCode;
}).filter(function (keyCode) {
    // only care when the key is between 50 and 100
    return keyCode >= 50 && keyCode <= 100;
}).forEach(function (keyCode) {
    // log every filtered code
    console.log(keyCode);
});
```

### EventObserver

Returns a newly instantiated event observer.

```js
// observe any keypress within the document
var onkeypress = new EventObserver(document, 'keypress');
```

**Usage**

```
EventObserver(
    Node target,
    String type,
    Boolean capture
);
```

### #Element.on()

Returns a newly instantiated event observer.

```js
// observe any keypress within the document
var onkeypress = document.on('keypress');
```

**Usage**

```
void on(
    String type,
    Boolean capture
);
```

### #Observer.forEach()

Returns the observer, and executes all of the event data with the provided function.

```js
// log the keycode each time a key is pressed
document.on('keypress').forEach(function (event) {
    console.log(event.keyCode);
});
```

**Usage**

```
void forEach(
    Function callback
);
```

**Parameters**

- callback()
    - Function that is called when an event occurs.
- event =>
    - Event data that is dispatched

### #Observer.filter()

Returns a new observer with the event data passing the test implemented by the provided function.

```js
// only log events when the shift key is pressed

document.on('keypress').filter(function (event) {
    // only pass keypress events when the shift key is active
    return event.shiftKey;
}).forEach(function (event) {
    // log keypress events when the shift key is active
    console.log(event.keyCode);
});
```

**Usage**

```
void filter(
    Function callback
);
```

**Parameters**

- callback()
    - Function that is called when an event occurs.
- event =>
    - Event data that is dispatched

### #Observer.map()

Returns a new observer with the event data returned by the provided function.

```js
// log the keycode each time a key is pressed
document.on('keypress').map(function (event) {
    return event.keyCode;
}).forEach(function (keyCode) {
    console.log(keyCode);
});
```

**Usage**

```
void map(
    Function callback
);
```

**Parameters**

- callback()
    - Function that is called when an event occurs.
- event =>
    - Event data that is dispatched

### #Observer.stop()

Returns the observer, unsubscribing it from new event notifications.

```js
// log the first key and then stop
document.on('keypress').forEach(function (event) {
    console.log(event.keyCode);

    onkeypress.stop();
});
```

**Usage**

```
void stop();
```

### #Observer.until()

Returns the observer, unsubscribing it from new event notifications once the event data passes the test implemented by the provided function.

```js
// log every key until the shift key is pressed
document.on('keypress').forEach(function (event) {
    console.log(event.keyCode);
}).until(function (event) {
    return event.shiftKey;
});
```

**Usage**

```
void until(
    Function callback
);
```

**Parameters**

- callback()
    - Function that is called when an event occurs.
- event =>
    - Event data that is dispatched

## License

CC0 1.0 Universal License

The person(s) who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.

You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.

In no way are the patent or trademark rights of any person affected by CC0, nor are the rights that other persons may have in the work or in how the work is used, such as publicity or privacy rights.

Unless expressly stated otherwise, the person(s) who associated a work with this deed makes no warranties about the work, and disclaims liability for all uses of the work, to the fullest extent permitted by applicable law.

When using or citing the work, you should not imply endorsement by the author or the affirmer.

This is a human-readable summary of the Legal Code ([read the full text]).

[ci]:      https://travis-ci.org/jonathantneal/event-observer
[ci-img]:  https://img.shields.io/travis/jonathantneal/event-observer.svg
[npm]:     https://www.npmjs.com/package/event-observer
[npm-img]: https://img.shields.io/npm/v/event-observer.svg

[EventObserver]: https://github.com/jonathantneal/event-observer
[read the full text]: https://creativecommons.org/publicdomain/zero/1.0/legalcode
