---
title: Safe array mapping
summary: "Remember: always wrap before you map!"
author: Tim Kendrick
layout: article
type: tip
---

> **TL;DR:** Always wrap your `map()` callbacks with an intermediate function. You've been warned!

If you're anything like me, you'll have used ES5's array `map()` method more times than you've had hot dinners. So what do you reckon the following code logs?

```javascript
var stringIds = ["6", "8", "10", "12", "14"];

// Convert strings to integers
var ids = stringIds.map(parseInt);

console.log(ids); // [ 6, NaN, 2, 5, 1 ] ...WHAT?!
```

If this revelation has left you reeling, have a think about how the `map()` method calls its callback:

```javascript
callback(currentValue, index, array)
```

...and how `parseInt()` is defined:

```javascript
function parseInt(string[, radix]) {
	...
}
```

BOOM! In your rush to save a few keystrokes, you've ended up passing an `index` where you should be passing a `radix`, with disastrous results.

While any JavaScript developer worth their salt knows to act cautious around `parseInt()`, the potential for this mistake can crop up all-too-easily in normal-looking code:

```javascript
var points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }];
var mirroredPoints = points.map(getMirroredPoint); // This is fine… FOR NOW!

function getMirroredPoint(point) {
	return {
		x: -point.x,
		y: point.y
	};
}
```

...as it is, this code is innocuous enough. But what happens when a coworker keeps things DRY by embellishing your function with an optional `scale` argument for reuse elsewhere?

```javascript
var points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }];
var mirroredPoints = points.map(getMirroredPoint); // Uh-oh.

function getMirroredPoint(point, scale) {
	var scale = scale || 1;
	return {
		x: scale * -point.x,
		y: scale * point.y
	};
}
```

Now you're asking for trouble, seeing as your `map()` call will now be passing an `index` into the `scale` argument. Plus technically this is _your_ screw-up, seeing as all along you've been invoking the function incorrectly by passing too many arguments.

So what's the moral of the story? Always make sure to wrap any `map()` callbacks in an intermediate function:

```javascript
var mirroredPoints = points.map(function(point) {
	return getMirroredPoint(point);
});
```

Or if you've already roared into the 21st century, ES6 makes this super-easy:

```javascript
let mirroredPoints = points.map(point => getMirroredPoint(point));
```

...so no excuses!
