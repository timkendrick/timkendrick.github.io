---
title: Simulating multiple return values in ES6
summary: Wish JavaScript had Python’s tuple assignment? ES6 makes this dream a reality!
author: Tim Kendrick
layout: article
type: tip
---

> **TL;DR:** We've seen how ES6 destructuring assignment can be used to [simulate named arguments](/articles/2016/03/31/named-es6-arguments.html), so now let's take a look at how it can also be used to simulate Python's tuple assignment feature and reduce boilerplate for chained array methods.

First up, what's a tuple? Without getting too far into type theory, essentially a tuple is just an immutable array – i.e. a static list of items in a certain order. For many years, tuples have been used in languages like Python to return multiple values from a function and assign them to individual variables.

Ever since ES6 came along, this has also been possible in JavaScript with plain ol' arrays, using destructuring assignments:

```javascript
function getPizzaDimensions(diameter) {
	// Return a 2-item "tuple" containing dough area and crust circumference
	const radius = diameter / 2;
	const area = Math.PI * radius * radius;
	const circumference = Math.PI * diameter;
	return [area, circumference];
}

// Assign the returned array items to named variables
const [doughArea, crustCircumference] = getPizzaDimensions(20);

console.log('A 20-inch pizza has more than %d feet of crust', crustCircumference / 12);
// Output: "A 20-inch pizza has more than 5 feet of crust"
```

If used sparingly, this can be a great way of cutting down on boilerplate when you need a function to return a jumble of related values that don't quite deserve to be lumped together in the same data object.

This might seem like a fairly niche use case, but it can prove really useful when you're using chained ES5 array methods to write nice, clean, functional code.

Take the following example that filters and maps an array of items based on a computed property (or just skip past the example if you don't care about the context, we'll go over the important bit in more detail afterwards):

```javascript
const columns = [
	{ width: 100, color: "red" },
	{ width: 640, color: "green" },
	{ width: 50, color: "blue" },
	{ width: 250, color: "cyan" },
	{ width: 180, color: "magenta" },
	{ width: 320, color: "yellow" },
	{ width: 320, color: "black" }
];

const viewportWidth = window.innerWidth;

const columnsFragment = renderVisibleColumns(columns, viewportWidth);
document.body.appendChild(columnsFragment);

function renderVisibleColumns(columns, viewportWidth) {

	// Here's the important bit:

	const columnElements = columns
		.map((column, index, array) => [column, getColumnOffset(array, index)])
		.filter(([column, offsetX]) => (offsetX < viewportWidth))
		.map(([column, offsetX]) => createColumnElement(column, offsetX));

	// ...that's it!

	return createDocumentFragment(columnElements);


	function getColumnOffset(columns, index) {
		return columns.slice(0, index)
			.reduce((offset, column) => offset + column.width, 0);
	}

	function createColumnElement(column, offset) {
		const columnElement = document.createElement('div');
		columnElement.style.position = 'absolute';
		columnElement.style.left = offset + 'px';
		columnElement.style.width = column.width + 'px';
		columnElement.style.height = '100%';
		columnElement.style.backgroundColor = column.color;
		return columnElement;
	}

	function createDocumentFragment(children) {
		const fragment = document.createDocumentFragment();
		children.forEach((element) => fragment.appendChild(element));
		return fragment;
	}
}
```

So what's going on inside that `renderVisibleColumns()` function?

Let's take a closer look (note the destructuring assignments in the callback arguments):

```javascript
const columnElements = columns
	.map((column, index, array) => [column, getColumnOffset(array, index)])
	.filter(([column, offsetX]) => (offsetX < viewportWidth))
	.map(([column, offsetX]) => createColumnElement(column, offsetX));
```

1. The first `map()` creates an array of "tuples", each containing the item (the column) bundled along with a derived property (its absolute X offset)
2. The `filter()` filters this array of "tuples" based on the precalculated X offsets, leaving us with the tuples that refer to columns within the current viewport
3. The second `map()` returns an array of DOM elements corresponding to each of these columns, generated using the precalculated X offsets

In this case, the advantage in returning these tuple-like arrays is that we're able to send metadata values down the chain alongside their corresponding items, effectively performing our chained array operations on pairs of values at a time. This example only had two steps that relied on both of the paired items, but in practice there could easily have been multiple steps that needed to refer to both values. There's also no reason to limit it to pairs of values – the tuples could just as easily be triplets of values, or any other sized tuple.

Importantly, all the chained steps are self-contained pure functions, and there's not a for-loop in sight. The completely stateless code is therefore much easier to reason about, allowing less room for bugs and off-by-one errors.

Of course, like any ES6 syntactic sugar, this is completely possible in ES5, however the lack of destructuring assignment leads to additional boilerplate that detracts from the readability of the code. Here's the relevant lines without the destructuring arguments:

```javascript
function renderVisibleColumns(columns, viewportWidth) {
	columns
		.map((column, index, array) => [column, getColumnOffset(array, index)])
		.filter((columnData) => (columnData[1] < viewportWidth))
		.map((columnData) => createColumnElement(columnData[0], columnData[1]))
		.forEach((columnElement) => document.body.appendChild(columnElement));
}
```

...or alternatively, using objects rather than arrays to group the metadata:

```javascript
function renderVisibleColumns(columns, viewportWidth) {
	columns
		.map((column, index, array) => { column: column, offsetX: getColumnOffset(array, index) })
		.filter((columnData) => (columnData.offsetX < viewportWidth))
		.map((columnData) => createColumnElement(columnData.column, columnData.offsetX))
		.forEach((columnElement) => document.body.appendChild(columnElement));
}
```

As well as introducing additional clutter, these versions are harder to reason about than the original, seeing as we've had to introduce an intermediate `columnData` object that contains both the item (the column) and its metadata (its X offset). Unlike the destructuring version, it might not be immediately clear to somebody reading the code what this object actually contains, or what its purpose is – plus these kinds of wrapper objects are generally very tricky to name well (and we all know how hard naming things can be!)

So in short, next time you find yourself stuffing function return values inside container objects just so you can stitch some values together into a weird data Frankenstein, try returning a "fake tuple" array and using a destructuring assignment to clear away the mess!
