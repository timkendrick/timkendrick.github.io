---
title: Named ES6 arguments
summary: Clean up those function signatures with this one handy tip!
author: Tim Kendrick
layout: article
type: tip
---

OK, so the title's a bit misleading – these aren't *true* named arguments – but they give a pretty good approximation.


```javascript
function sayHello(name, {
	exuberant=true
} = {}) {
	console.log(`Hello, ${name}${exuberant ? '!' : '.'}`);
}
```

```javascript
sayHello('sailor'); // Hello, sailor!
sayHello('Tim', { exuberant: false }); // Hello, Tim.
```

This is perfect for uncluttering your method signatures when your function has a bunch of optional arguments and you're too lazy to keep looking up the order.

**Pro tip:** make sure to include the `= {}` in the function definition if you want the options object itself to be optional.

This is all in the spec of course, but I'm surprised you don't see these more often. Enjoy!
