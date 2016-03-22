---
title: Switching to Vim
summary: The World's First Completely Unbiased Vim Overview™
author: Tim Kendrick
layout: article
---

> **Author's note:** I actually wrote this post a few months ago, when I was just getting into Vim. Now that I've become much more accustomed to using Vim, it seems a far more negative appraisal than I would give nowadays. I think this is an important thing to bear in mind: time's a healer, and most of the Vim-pushers (including myself) have probably forgotten about what a struggle it was getting over that initial hump. So without further ado, let me present *[drum-roll...]* **The World's First Completely Unbiased Vim Overview™**.

**TL;DR:** I've recently gone through the process of switching over from Sublime Text to Vim. If you want to know what I think of it, [skip to the end](#whats-it-like) (spoiler: I now use Vim for everything). If you want to know why I did it, or just fancy spending the next few minutes reading some words, then read on.


## The List

You know that long-term career-development list that every ambitious front-end developer has? You know, the one that starts, `1. Get round to learning Vim`?

I've had that old chestnut on my list for the last few years, and aside from the odd bout of `vimtutor` every now and then I wasn't doing much about it. Whenever I talked to coworkers who used Vim as their editor of choice, the consensus seemed to be that once you've invested a couple of weeks and figured out how it works, you'll never look back. The trouble is, I never reached a point where I could justify slowing my pace of development almost to a standstill for a fortnight, just so that I could become proficient in the dark arts of some arcane editor that's significantly older than Justin Bieber.

I was torn, because these Vim-zealots were people whose views I respected. But how about [all](javascript:;) [those](javascript:;) [articles](javascript:;) you read from people who used Vim for a bit but decided to go back to Sublime Text? Well, don't bother clicking those links because those articles don't exist. Just like you never hear about anyone switching back to Windows after going Mac, all of the evidence suggests the path to Vim is a one-way ticket to code-editing bliss. Or potentially suicide, depending on how you interpret your evidence.

What always throws me is the lack of balance in any opinions I've heard about Vim: there doesn't seem to be much middle ground between one side claiming it's [the best computer program ever written](https://en.wikipedia.org/wiki/Time_Crisis_II) and the other side claiming it's the work of some maniacal sadist. The Vim-lovers claim the Vim-haters just don't understand how to use it, while the Vim-haters claim the Vim-lovers are obsessives with no sense of user aesthetics. The praise seemed so gushing that I always attributed it to an unhealthy emotional attachment formed by by years of tinkering with configuration files, combined with ignorance of Sublime Text's more advanced features due to Vim lock-in. All the same, I couldn't shake the constant nagging feeling that there might just be something in all this Vim talk, and so for me Vim remained shrouded in an air of mystery.


## A twist of fate

Eventually, however, fate intervened. If this were a Greek tragedy, this would the point where Zeus hurls a thunderbolt my way as a friendly reminder to stop shirking responsibility. In my case, I caught my shoelace in my bicycle wheel while on vacation and ended up breaking my arm. As it happens, this turned out to have much the same motivational effect, despite being somewhat less dignified.

A week after my accident and back from my vacation I sat down to work, carefully maneuvered my right hand into position on the home row, and fired up Sublime Text. I remember feeling cautiously positive about the whole ordeal, that at least I'd have the opportunity to knuckle down to a prolonged stretch of distraction-free coding now that I was effectively chained to my desk for the next few weeks. How wrong I was.

My optimism turned to a mixture of frustration and despair as soon as I tried to write my first line of code. It was only then that I realized how much my right hand moves around when coding. Try it yourself – keep your right hand restricted to letter keys, and try to program as normal (Vim users are exempt from this exercise). If you make if past three functions without going insane, you're a much more patient programmer than I am.

In one careless tumble I'd swapped my power-user status for the IT proficiency level of my grandmother, who a) has never used a computer in her life, and b) has been dead for several years. Flickers of ingrained muscle memory – <code><key>⇧</key>+<key>⌥</key>+<key>→</key></code>, <code><key>⌃</key>+<key>⌘</key>+<key>↓</key></code> and friends – only served as bitter-sweet reminders of what I had once taked for granted. By my own highly scientific estimations, I was around four to five times slower with only one working hand and without all my precious hotkeys.

Never one to be dissuaded, I looked into the options for one-handed programming. Turns out there are none. There are keyboard layouts like [one-handed DVORAK](https://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard#One-handed_versions) and various [keyboard mirroring](http://blog.xkcd.com/2007/08/14/mirrorboard-a-one-handed-keyboard-layout-for-the-lazy/) options, but none that pander to all those punctuation keys that we programmers love so dearly, and none of them help with replacing the arrow keys for navigating aroung code.

After pondering my fate for a while (which presumably is the fate of all those one-handed programmers, a demographic for whom I now feel great empathy) I decided it was time to take action. I knew what I had to do. It was time to learn Vim.


## Learning Vim

The way I saw it, if Vim can make two-handed programmers significantly more productive, it must be even more effective for lesser-limbed coders. Even just cutting out the arrow keys would be a huge plus for me. I had finally found my motivation for learning Vim.

The trouble is, learning Vim is *hard*. Not in the sense that any one aspect of it is particularly complicated, it's just that it does everything so differently to other tools. And there's a hell of a lot of it to learn. It's got hundreds of commands, a huge set of very-much-non-standard keyboard shortcuts (which behave differently in each of the several modes), its own proprietary programming language – it's even gone to the trouble of inventing its own vocabulary (seriously, words vs `WORDS`? `yank` instead of `copy`? I don't know who this Bram Moolenaar character is, but it definitely seems like he's been taking full advantage of his country's relaxed drug laws). It's particularly frustrating if you consider yourself pretty nifty with OS X's keyboard shortcuts and all the ins and outs of its UI/windowing/text-editing behavior, seeing as it's all completely different in Vim.

In short, I found learning Vim to be a bit like painstakingly deciphering the operating instructions for some elaborate piece of disused Soviet military apparatus which, once mastered, you can then use to repeatedly punch yourself in the face at a far quicker rate than you would normally be able to.

After a couple of days blundering around with Vim's thorough-but-dense `:help` command and increasing StackOverflow's ad revenue by 300%, I bit the bullet and bought a copy of [Practical Vim](https://pragprog.com/book/dnvim2/practical-vim-second-edition). That was probably the best $23 I've ever spent, seeing as without it I'd probably have a permanent thousand-yard stare to go with my broken arm.

Now that I'm past the initial hump, and have regained rudimentary arm movement, I feel that I've finally spent enough time with Vim to give it a fair initial appraisal. Bear in mind that there's still a huge amount for me to to learn, so these are only my impressions from the first few weeks.


## What's it like?

Although it pains me to say it – and I hope this isn't just Stockholm Syndrome setting in, or something to do with the Kool-Aid that the readme instructs you to drink while waiting for Vim to compile – I've got to admit that Vim is a very, very good editor.

Once you use Vim for a while, it becomes apparent that it's all been very cleverly thought-out. As soon as you get used to the mode-switching it becomes second nature, and those myriad keyboard shortcuts all come in handy once you've gone to the trouble of learning them. A lot of the small details which seemed at the beginning to be unnecessary complications turn out to be vital components in a highly coherent system.

But that's not to say that it's perfect, by any means. Here's a (hopefully relatively unbiased) round-up of how I've found the last few weeks working with Vim.

## The good

- Mouse-free operation speeds things up no end
- Super-fast editing / text manipulation shortcuts. I could now never live without:
	- Motions
	- Text objects
	- Buffers
- Keyboard-controlled windowing support really helps when exploring a codebase
- Macros are a powerful, if sometimes fragile, way to speed up repeated actions
- Fully integrated with the Unix ecosystem, allowing you to use your OS to its best advantage
- Whatever you want to do, there's a plugin for it
- Heavily customizable to create the editor of your dreams

## The bad

- Needs a large amount of configuration to reach the base level of functionality provided by most modern editors (alternatively, use a distribution like [spf13-vim](http://vim.spf13.com/) or my [vim-quickstart](https://github.com/timkendrick/vim-quickstart))
- Multiple cursor support (via [vim-multiple-cursors](https://github.com/terryma/vim-multiple-cursors)) is nowhere near as slick as Sublime Text / Atom
- Not as fast as I thought it would be: lack of asynchronous operations for linting, autocomplete etc means that Sublime Text still has the edge (although [NeoVim](https://neovim.io/) aims to solve this)
- Poor discoverability of commands punishes beginner users
- Relies on the user being able to touch-type confidently (although if you're a programmer who can't touch-type, you should probably [sort that out](https://www.typing.com/) first – it really doesn't take long)
- UX is a bit rough around the edges: I sometimes never feel completely sure that I won't accidentally lose work if I make the wrong decision at a prompt
- Syntax highlighting can be somewhat hit-and-miss on large files
- Plugin quality varies massively – some are great, some have been unmaintained for years despite bugs
- Scripting-wise, let's just say vimscript isn't going to be winning any beauty pageants any time soon
- Still no elegant way to carry out a project-wide find/replace in one command

## The ugly

- Even when heavily customized, the UI looks truly horrible compared to a modern editor. Remember you're going to be staring at this thing all day, every day.


## So, should I bother learning Vim?

Tricky question. I think you probably already know the answer better than I do.

If you actively want to learn Vim then you should go for it – I'm sure you'll enjoy it. If you think Vim definitely doesn't sound like your kind of thing, then don't bother learning it. It'll only infuriate you.

If you find yourself in the position I was in, vaguely intending to investigate Vim when you find the time, then the fact that you're seriously considering it suggests that you'd probably benefit from learning it at some point. I'd approach it a bit like learning a new programming language, and save it for a rainy day(/week) when you don't have any deadlines looming. Maybe a good inroad would be something like Sublime's [Vintage Mode](https://www.sublimetext.com/docs/3/vintage.html), or Atom's [vim-mode](https://atom.io/packages/vim-mode-plus), which I haven't tried but could potentially be a great middle-ground. For reference, it took me about a week to reach approximately the same level of productivity as with Sublime Text. If that rainy day never seems to arrive, I'd recommend a 3-part fracture to your proximal humerus to speed the decision.


## Epilogue

As for me, I knew the day would come when I'd have to retire Sublime Text to the dusty shelf of discarded editors – leaving it to swap war stories with WebStorm, TextMate, Dreamweaver and FrontPage – but I'd always assumed it would have been a younger, better-looking model like Atom that knocked it off the top spot. Seriously? VIM? That old ugly-looking thing? Yes, it's true: Vim is now my primary code editor. So if occasionally you see me at my computer, gazing off into the middle distance while simultaneously flitting through a codebase by touch alone, just know that I might be using Vim, but I'm thinking of Sublime Text.
