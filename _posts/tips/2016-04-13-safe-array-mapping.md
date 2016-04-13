---
title: Safe array mapping
summary: Remember, kids – wrap it up before you map it up
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

console.log(ids);
```

If you guessed `[ 6, NaN, 2, 5, 1 ]` then congratulations! Have a gold star.


If this revelation has left you reeling, have a think about how `parseInt()` is defined:

```javascript
function parseInt(string[, radix]) {
	...
}
```

...and how the `map()` method calls its callback:

```javascript
callback(currentValue, index, array);
```

BOOM! In your rush to save a few keystrokes, you've ended up passing an `index` where you should be passing a `radix`.

While any JavaScript developer worth their salt knows to act cautious around `parseInt()`, the potential for this mistake can crop up all-too-easily in normal-looking code:

```javascript
var points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }];
var mirroredPoints = points.map(getMirroredPoint);

function getMirroredPoint(point) {
	return {
		x: -point.x,
		y: point.y
	};
}
```

...as it is, this code is innocuous enough. But what happens when a coworker keeps things DRY by embellishing your function with an optional argument for reuse elsewhere?

```javascript
function getMirroredPoint(point, scale) {
	var scale = scale || 1;
	return {
		x: scale * -point.x,
		y: scale * point.y
	};
}
```

Now you're asking for trouble. Plus technically this is _your_ screw-up, seeing as all along you've been calling the function incorrectly.

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