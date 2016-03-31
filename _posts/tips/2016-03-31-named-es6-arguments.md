---
title: Named ES6 arguments
summary: Spruce up those function signatures with this one handy tip!
author: Tim Kendrick
layout: article
type: tip
---

OK, so the title's a bit misleading – these aren't *true* named arguments – but you can achieve a pretty good approximation with ES6 destructuring assignments and default function arguments.


```javascript
function sayHello(name, {
	exuberant=true
} = {}) {
	console.log(`Hello, ${name}${exuberant ? '!' : '.'}`);
}
```

You can then pass in your options as named properties:

```javascript
sayHello('sailor'); // Hello, sailor!
sayHello('Tim', { exuberant: false }); // Hello, Tim.
```

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

This is perfect for producing clean, readable function calls when there are a bunch of optional arguments and you're too <strike>lazy</strike> awesome to keep looking up the order.

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

**Pro tip:** make sure to include the `= {}` in the function definition, otherwise you'll get undefined errors if you don't pass the options object when calling the function.

This is all in the spec of course, but I'm surprised you don't see these more often. Enjoy!
