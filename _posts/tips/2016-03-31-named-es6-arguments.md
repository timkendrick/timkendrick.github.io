---
title: Named ES6 arguments
summary: Spruce up those function signatures with this one handy tip!
author: Tim Kendrick
layout: article
type: tip
---

> **TL;DR:** Approximate named arguments by sticking ES6 destructuring assignments in your function's arguments list

OK, so the title's a bit misleading – these aren't *true* named arguments – but you can achieve a pretty good approximation with ES6 destructuring assignments and default function arguments.

Say you've got a function that takes multiple boolean/string/number parameters:

```javascript
createUser(7124634, 'tim', 28, true); // What do all those arguments mean?!
```

Our intentions are much clearer if we our pass our parameters as named properties of an object, rather than passing the primitives directly:

```javascript
createUser({ id: 7124634, name: 'tim', age: 28, admin: true }); // Ahhh!
```

...this is much more readable, but it also means that we now have to introduce extra code to parse that "options" object in the function body, which feels a bit messy.

We can solve this in ES6 by defining a function with a destructuring assignment in the signature, like this (note the curly braces in the arguments list):

```javascript
function createUser({ id, name, age, admin=false }) {
	// "id", "name", "age", and "isAdmin
	// are all directly available here
}

createUser({ id: 7124634, name: 'tim', age: 28, admin: true }); // Yay!
```

The destructuring assignment allows us to transparently access the properties of the "options" object in the function body as if they were real arguments. Pretty cool, huh?

You can also combine this with normal positional arguments for situations when you have one or more required arguments followed by an "options" object for any extra parameters:

```javascript
function greetUser(name, { exuberant=false }) {
	console.log(`Hello, ${name}${exuberant ? '!' : '.'}`);
}

greetUser('sailor', { exuberant: true }); // Hello, sailor!
greetUser('Tim', { exuberant: false }); // Hello, Tim.
```

The only caveat is that if you want to make the entire "options" argument itself optional (meta!), you'll have to add an extra `= {}` after your destructuring assignment to ensure a default empty object is passed:

```javascript
function greetUser(name, { exuberant=false } = {}) {
	console.log(`Hello, ${name}${exuberant ? '!' : '.'}`);
}

greetUser('sailor', { exuberant: true }); // Hello, sailor!
greetUser('Tim'); // Hello, Tim.
```

As seen in the example above, you can now call the `greetUser()` function either with or without the optional arguments and you won't get any errors whining about undefined property access. Perfect!

This scales up nicely when you need lots of optional arguments:

```javascript
fs.createReadStream = function(path, {
	flags='r',
	encoding=null,
	fd=null,
	mode=0666,
	autoClose=true
} = {}) {
	// "flags", "encoding", "fd", "mode" and "autoClose"
	// are all directly available here in the function body
}

fs.createReadStream('/path/to/file');
fs.createReadStream('/path/to/file', { encoding: 'utf8', autoClose: false });
```

But hold on a goddamn second – haven't people been doing this for years?! Technically yes, but the equivalent ES5 code would be the following ugly mess (better watch those typos…):

```javascript
fs.createReadStream = function(name, options/* ??? */) {
	options = typeof options === 'undefined' ? {} : options;
	var flags = typeof options.flags === 'undefined' ? 'r' : options.flags;
	var encoding = typeof options.encoding === 'undefined' ? null : options.encoding;
	var fd = typeof options.fd === 'undefined' ? null : options.fd;
	var mode = typeof options.mode === 'undefined' ? 0666 : options.mode;
	var autoClose = typeof options.autoClose === 'undefined' ? true : options.autoClose;
	// Time to write some code! Good luck figuring out those defaults…
}
```

The ES6 syntax allows you to implicitly define all your optional parameters in the function signature, where they belong, rather than cluttering up the function body as seen in the ES5 example.


This is all in the spec of course, but I'm surprised you don't see these in the wild more often. Enjoy!
