---
title: AngularJS performance bookmarklets
summary: Remember AngularJS v1?  Here's a couple of scripts to help debug performance issues
author: Tim Kendrick
layout: article
type: tip
---

So I was cleaning out my old bookmarks, and I came across a couple of useful bookmarklets I wrote ages ago for debugging AngularJS digest cycle performance issues.

Drag these badboys into your bookmarks bar and they should help diagnose problems with a misbehaving AngularJS v1 app.

> Usage instructions:
>
> 1. Launch your app and run the bookmarklet script
> 2. [`$destroy()`](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$destroy) the scope that looks shadier than a 2007 sub-prime mortgage broker
> 3. Re-run the bookmarklet script to see if your hunch was correct

### Bookmarklet 1: Count the number of active scopes

```
javascript:console.log(angular.element(document.body).injector().invoke(function($rootScope) { return (function _getScopeStatistics(scope) { var statistics = { scopes: 1, watchExpressions: 0 }; if (scope.$$watchers) { statistics.watchExpressions += scope.$$watchers.length; } if (!scope.$$childHead) { return statistics; } var childScope = scope.$$childHead; do { var childStatistics = _getScopeStatistics(childScope); for (var property in childStatistics) { statistics[property] += childStatistics[property]; } } while ((childScope = childScope.$$nextSibling)); return statistics; })($rootScope); }));
```

> Console output: `Object {scopes: 337, watchExpressions: 1794}`

### Bookmarklet 2: Time the digest cycle

```
javascript:angular.element(document.body).injector().invoke(function($rootScope) { console.time('Digest cycle'); $rootScope.$apply(); console.timeEnd('Digest cycle'); });
```

> Console output: `Digest cycle: 10.737ms`

Treat ’em well – these little guys have saved my neck countless times!
