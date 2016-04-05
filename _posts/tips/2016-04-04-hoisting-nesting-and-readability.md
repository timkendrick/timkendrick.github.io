---
title: Hoisting, nesting and readability
summary: Show your coworkers you care by using function hoisting and nested functions
author: Tim Kendrick
layout: article
type: tip
---

This post is all about a) maintaining code readability, and b) maintaining healthy relations with the people who sit next to you every day. If you value your coworkers' sanity, or just generally don't want to screw them over on a regular basis, I'd recommend making your codebase as easy to navigate as possible. Two ways I've found to help in that respect are **function hoisting** and **nested functions**. Let's find out why.

> **Pro Tip:** if you're just looking for some quick tips, [skip to the end](#ok-i-give-in-please-just-stop-talking).

## Function hoisting

I can't get enough of function hoisting. Partly just because the word "hoisting" is so rarely used outside of a maritime/shakespearean context, but mainly because I think it can really help with code clarity.

Check out the following snippet to see an example of function hoisting in action:

```javascript
function doThingsIWannaDo() {
	danceWithSomebody();
	feelTheHeatWithSomebody();
	danceWithSomebody({ lovesMe: true });


	function danceWithSomebody(specialRequests) {
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
	function danceWithSomebody(specialRequests) {
		// ...
	}

	function feelTheHeatWithSomebody() {
		// ...
	}

	danceWithSomebody();
	feelTheHeatWithSomebody();
	danceWithSomebody({ lovesMe: true });
}
```

This will be interpreted exactly the same as the as the hoisting example. As far as your computer's concerned, they're essentially identical.

### Pfft! I know all about hoisting – why are you saying I should bother with it?

Let's take another look at that hoist-happy code:

```javascript
function doThingsIWannaDo() {
	danceWithSomebody();
	feelTheHeatWithSomebody();
	danceWithSomebody({ lovesMe: true });


	function danceWithSomebody(specialRequests) {
		// ...
	}

	function feelTheHeatWithSomebody() {
		// ...
	}
}
```

This looks so simple it must be pseudo-code, right? **WRONG!!!** It's all perfectly valid JavaScript (although admittedly, Whitney's in for a pretty dull night until those stubbed functions are filled in). The beauty of hoisting your functions – especially when combined with nested functions, as seen here – is that you end up writing code that's almost entirely self-documenting, and even reads in the correct order. In other words, it looks like pseudo-code, but actually works. This is great on both the reading and the writing fronts.

#### I'm not convinced – how exactly does hoisting help readability?

As far as reading's concerned, the main advantage of putting your function body before any sub-functions means that your code becomes super-easy to scan. If somebody's trying to make changes to some horror that's lurking deep inside your lovingly-crafted monster-function, just by looking at the first few lines they can instantly get a quick step-by-step overview of what the function does. Once they've done that, if they want to investigate one of the steps in more detail, they can easily jump straight to the definition of the relevant child function. Importantly, they won't have to waste any mental effort reading through the irrelevant steps.

Without function hoisting, your hapless colleague has to wade through a quagmire of as-yet-unreferenced function definitions before they get to see how they're used (as seen in the non-hoisted version above, only much worse for more complex examples). This lack of context can cause real confusion when trying to skim-read a codebase and quickly identify to the important bits.

#### And it's good for writing code too?

As for writing, maybe it's just habit, but I find that this approach works very well with what I like to think of as "stream-of-consciousness coding". You know when you've achieved that 'flow' state of mind, and can visualize exactly how you're going to implement something, and it's just a case of bashing out the code as fast as you can type it? I find that I'll get into a rhythm of tearing through a series of interconnected functions by following these simple steps:

1. Write the function body as a series of simple pseudo-code-like steps
2. Write stubs for any necessary nested sub-functions
3. Move onto the next function, and repeat

In no time at all you've got a decent skeleton that you can quickly skim-read back to yourself and confirm that it's all going to work. Then it's just a matter of filling in any remaining function stubs. (Technically you could even leave out the function stubs as well, and rely on your linter to catch the reference errors, but this can be a little risky if your function name accidentally ends up shadowing a function/variable in a parent scope. So don't do that.)

I've used imperative examples so far for the sake of simplicity, but this works just as well for more functional code – only in that case it feels more like bolting together a pipeline rather than writing a cake recipe. In general I find that writing the function top-to-bottom with the 'glue' code first, followed by a series of function definition stubs, helps me stay in a state of flow – however this could well just be personal preference. Either way, give it a try and I suspect you'll never go back.

### Are there any drawbacks to using function hoisting?

Well, some people – sorry, I actually just mean Douglas Crockford – have historically [objected](http://javascript.crockford.com/code.html#function) to function hoisting on the grounds that it obscures code readability, but I can't find any real justification for this.

I find that if you're scanning through a function that references various hoisted functions, and want to quickly take a peek at the definition to see what it does, you can easily flick back and forth between invocation and implementation with what I like to call the *Poor Man's Jump-to-Definition*:

| Editor | Jump to definition | Jump back |
| --- | --- | --- |
| **Sublime/Atom/etc** | <key>Cmd</key>+<key>e</key> <key>Cmd</key>+<key>g</key> | <key>Cmd</key>+<key>Shift</key>+<key>g</key> |
| **Vim** | <key>*</key> | <key>N</key> |
| **Emacs** | *[no idea]* | *[sorry]* |

...or by using the 'jump to definition' option in an actual IDE.

I feel that this makes it pretty simple to look up the function implementation, quashing any readability concerns, but ultimately it comes down to personal preference.

## Nested functions

Let's take yet another look at that original code snippet:

```javascript
function doThingsIWannaDo() {
	danceWithSomebody();
	feelTheHeatWithSomebody();
	danceWithSomebody({ lovesMe: true });


	function danceWithSomebody(specialRequests) {
		// ...
	}

	function feelTheHeatWithSomebody() {
		// ...
	}
}
```

Canny readers will point out that I could easily have written it like this:

```javascript
function doThingsIWannaDo() {
	danceWithSomebody();
	feelTheHeatWithSomebody();
	danceWithSomebody({ lovesMe: true });
}

function danceWithSomebody(specialRequests) {
	// ...
}

function feelTheHeatWithSomebody() {
	// ...
}
```

...this still uses function hoisting (albeit one scope higher up the chain) to allow you to reference the functions before they've been declared, and comes with most of the readability benefits mentioned above.

The trouble is, now you've got three functions when you used to have one. You've lost the black-box nature of the original function: it used to be a nice neat encapsulated unit but now its creepers are spreading into the rest of your codebase. If somebody needs to refactor your code, rather than just grabbing the whole function, they'll now need to additionally locate the other helper functions and check those aren't being used elsewhere before extracting them. The child functions have also now leaked into the scope of the parent's siblings, which is probably not what you wanted.

As well as bringing additional maintenance overhead, a lack of nested functions also affects readability by making it hard to quickly size up the boundaries of the relevant accompanying material for a particular function. If I see a set of nested functions within the parent function, I know they relate directly to the code within the parent function. Conversely, if nested functions are employed systematically throughout a codebase, I can say with a fair degree of confidence that I can ignore most of whatever lies outside the parent function, and only focus on what lies between those parent braces. Considering the fact that a large part of debugging/refactoring is spent locating the lines that need to be changed, this additional compartmentalizing can come in handy when quickly pinpointing the relevant code.

Perhaps more importantly, nested functions improve the readability of the parent function for the same reasons I gave above for using function hoisting. As seen in the example, splitting the function body into a series of very small steps can make it almost trivially simple to see what the function does at first glance, while any implementation details are abstracted away into the nested functions.

### Let's get philosophical here

By splitting out the function body into these simple nested functions, you end up with something vaguely akin to an interface/implementation pairing, only within a single function: the stripped-down function body effectively becomes pseudo-code that describes what the function needs to do (i.e. the interface), while the gory details are hidden within a set of nested functions that actually do that (i.e. the implementation). These nested functions themselves contain their own child functions, and therefore exhibit this same interface-vs-implementation-like divide, so as you go down the chain all the initial complexity is gradually dissolved into a series of straightforward helper functions and the accompanying 'glue' code that describes how they fit together.

It's probably clear from these reasons that I'm a big fan of nesting functions as an aid to code organization – I've found it to be a huge help over the years, as have Google, who recommend it [in their JS style guide](https://google.github.io/styleguide/javascriptguide.xml#Nested_functions) (worth checking out, although like any style guide I'd take it with a pinch of salt).

### So you seem to enjoy nesting functions, but what are the downsides?

The only criticisms I've heard against nested functions are a) that heavily nested functions increase line length, and b) that they come with a potential performance cost.

As for line length, I've never found this to be a problem: if you're a stickler for short-as-possible lines I can see it becoming a minor annoyance. I would expect that this aesthetic consideration would be outweighed by the benefit of increased code cleanliness due to the encapsulation, and the self-documentation opportunities that scoped child functions present. Up to you though.

As far as performance is concerned, thankfully it's not 1996 any more: pre-V8, JavaScript engines would recreate the nested functions every time the parent function is called. Luckily modern JavaScript engines optimize for this kind of thing, so nowadays you're not going to see any significant performance hit when nesting your functions (especially if you keep them nice and pure to avoid recreating closures unnecessarily). You can take a look at [this jsPerf test](https://jsperf.com/nested-functions-looped/13#results) for proof that the performance is indeed identical on modern browsers.

### OK, I give in, please just stop talking

To sum up: I feel that taken individually, function hoisting and nested functions offer their own benefits, but when used in combination they serve as a particularly good means of producing a clear, readable and maintainable code structure.

Let's have a look at that paragon of code beauty one final time as a reminder:

```javascript
function doThingsIWannaDo() {
	danceWithSomebody();
	feelTheHeatWithSomebody();
	danceWithSomebody({ lovesMe: true });


	function danceWithSomebody(specialRequests) {
		// ...
	}

	function feelTheHeatWithSomebody() {
		// ...
	}
}
```

In terms of code layout, I'd argue that this is what we should be striving for. It's clear, expressive and self-documenting. It only takes a glance to size up what the function does, yet it's also very easy to drill down into the implementation details if you need to dig a little deeper.

I'd recommend keeping the following tips in mind when optimizing your functions for easy code-skimming:

- Make sure that each function only does one thing
- Keep function bodies concise (ideally only a few lines each)
- Don't shy away from breaking a function into a series of small, nested functions (this helps keep the function body concise)
- Lay out the function body as a series of simple 'dumb' steps, followed by nested functions that contain the meat of the implementation
- When naming things, value clarity over brevity: aim for self-documenting code via well-named functions and variables

So give hoisted nested functions a whirl if you haven't already, and after the initial day or so getting accustomed to writing code in this style I hope you'll agree that it becomes very natural very quickly. And who knows, maybe those coworkers will even thank you for it!
