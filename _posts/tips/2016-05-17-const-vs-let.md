---
title: const vs let
summary: Not sure which ES6 assignment keyword to use? Check this out!
author: Tim Kendrick
layout: article
type: tip
---

> **TL;DR:** Every time you're about to write `let`, consider using `const` instead

ES6 brought with it two new block-scoped assignment keywords: `let` and `const`. The only difference between these two is that variables declared using `let` can be reassigned, whereas variables declared using `const` cannot:

```javascript
let artistName = 'Prince';
artistName = 'The Artist Formerly Known As Prince'; // All fine

const immutableArtistName = 'Prince';
immutableArtistName = 'TAFKAP'; // TypeError: Assignment to constant variable
```

Most people, when moving to ES6, seem to replace all their `var` statements with `let` statements. While this enforces the much-needed block-scoping, I'd argue that almost all the time you should go one step further and replace them with `const`.

Why? I find that the immutability provided by un-reassignable variables generally makes code that little bit easier to reason about, and it fits much better within the functional style of JavaScript that has become more popular due to libraries such as [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/).

The main gotcha to keep in mind while using `const` is that while the variable itself cannot be reassigned, the contents of its value is still mutable and can therefore be modified:

```javascript
const artist = { name: 'Prince', birthName: 'Prince Rogers Nelson' };
artist.name = 'TAFKAP'; // No error thrown
console.log(artist); // Object {name: "TAFKAP", birthName: "Prince Rogers Nelson"}
```

…to maintain immutability, I'd advise introducing an additional rule whereby you never modify the contents of objects, instead creating a clone of the object with the updated properties:

```javascript
const artist = { name: 'Prince', birthName: 'Prince Rogers Nelson' };
const updatedArtist = Object.assign({}, artist, { name: 'TAFKAP' });
console.log(artist); // Object {name: "Prince", birthName: "Prince Rogers Nelson"}
console.log(updatedArtist); // Object {name: "TAFKAP", birthName: "Prince Rogers Nelson"}
```

…or if you're already using ECMAScript stage 2 features, you can use the [object spread syntax](https://github.com/sebmarkbage/ecmascript-rest-spread) to get rid of the ugly `Object.assign` call:

```javascript
const artist = { name: 'Prince', birthName: 'Prince Rogers Nelson' };
const updatedArtist = { ...artist, name: 'TAFKAP' };
console.log(artist); // Object {name: "Prince", birthName: "Prince Rogers Nelson"}
console.log(updatedArtist); // Object {name: "TAFKAP", birthName: "Prince Rogers Nelson"}
```

…or alternatively use a library such as [Immutable.js](https://facebook.github.io/immutable-js/) to ensure that your data objects remain unmodified.

In short, if you find that your code relies on reassigning variables declared with `let` or `var`, I'd suggest refactoring it such that it can be expressed purely with `const` assignments, so whoever reads your code will always know exactly what value each variable refers to.
