---
title: Hoisting, nesting and readability
summary: Clean up your messy functions by embracing JavaScript's quirks
author: Tim Kendrick
layout: article
type: tip
---

> **TL;DR:** Hoisted inner functions can have a significant impact on readability. Give them a go!

I’m a big fan of function hoisting in JavaScript. Partly just because the word "hoisting" is so rarely used outside a maritime context, but mainly because I think it's a pretty wacky feature that can really help with code clarity.

When combined with nested inner functions, I feel that this delivers a one-two sucker-punch of code readability and maintainability. Am I right to feel this way? You decide!

Check out the following snippet to see an example of function hoisting in action:

```javascript
function doThingsIWannaDo() {
	danceWithSomebody();
	feelTheHeatWithSomebody();
	danceWithSomebody({ lovesMe: true });


	function danceWithSomebody(partnerTraits) {
		// ...
	}

	function feelTheHeatWithSomebody() {
		// ...
	}
}
```

So what's so special about the way this code is written? You guessed it: the `danceWithSomebody()` and `feelTheHeatWithSomebody()` function calls come *before* we declare the functions they refer to.

How's that even possible? Well, at runtime the function declarations are 'hoisted' up to the top of the function and evaluated *before* the rest of the code in the same scope. How does this work? Magic. Or rather, the interpreter. Either way, that's not important right now – see the [MDN docs](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/function#Function_declaration_hoisting) for an equally-vague description that backs me up on this.

For comparison, here's a non-hoisted version of the above code:

```javascript
function doThingsIWannaDo() {
	// Ignore this...
	function danceWithSomebody(partnerTraits) {
		// ...
	}

	// And this...
	function feelTheHeatWithSomebody() {
		// ...
	}

	// Finally!
	danceWithSomebody();
	feelTheHeatWithSomebody();
	danceWithSomebody({ lovesMe: true });
}
```

...messy, right? We have to wade almost all the way through to the end of the function just to see what it does. This is even more pronounced when those helper functions actually contain code. When you're skimming someone else's codebase, you're probably not so concerned with the implementation of these helper functions as you are with figuring out what the hell the function is actually meant to do. I find that having to jump around the function body to decipher the control flow makes the code much trickier to scan at a glance.

The canny reader will also notice that those helper functions were nested inside the main function, rather than as siblings at the same level of indentation. We could easily have written it like this, without nesting the helper functions:

```javascript
function doThingsIWannaDo() {
	danceWithSomebody();
	feelTheHeatWithSomebody();
	danceWithSomebody({ lovesMe: true });
}

function danceWithSomebody(partnerTraits) {
	// ...
}

function feelTheHeatWithSomebody() {
	// ...
}
```

...but the trouble is, now we've got three functions when you used to have one. You’ve lost the black-box nature of the original function: it used to be a nice neat encapsulated unit but now its creepers are spreading into the rest of your codebase. If somebody needs to refactor your code, rather than just grabbing the whole function, they’ll now need to additionally locate the other helper functions and check those aren’t being used elsewhere before extracting them. The child functions have also now leaked into the scope of the parent’s siblings, which is probably not what you wanted. Readability-wise, you also lose the ability to quickly determine where the helper functions are used, seeing as they're no longer scoped to the relevant area. In short, it seems the only reason not to nest your helper functions is if you're a real stickler for line length, and are willing to sacrifice whatever it takes to keep ’em short.

So give hoisted inner functions a whirl if you haven’t already, and after the initial day or so getting accustomed to writing code in this style I hope you’ll agree that it becomes very natural very quickly. And who knows, maybe those coworkers will even thank you for it!
