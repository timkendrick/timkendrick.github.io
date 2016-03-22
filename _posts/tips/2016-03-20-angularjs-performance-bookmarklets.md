---
title: AngularJS performance bookmarklets
summary: Remember AngularJS v1?  Here's a couple of handy scripts to help debug performance issues
author: Tim Kendrick
layout: article
type: tip
---

So I was cleaning out my old bookmarks, and I came across a couple of useful bookmarklets I wrote ages ago for debugging AngularJS digest cycle performance issues.

Drag these badboys into your bookmarks bar and they should help out on pages with a misbehaving AngularJS v1 app (once you've blown off all the cobwebs):

### Time the digest cycle (outputs to console)

```javascript
javascript:angular.element(document.body).injector().invoke(function($rootScope) { console.time('Digest cycle'); $rootScope.$apply(); console.timeEnd('Digest cycle'); })
```

### Count the number of active scopes (outputs to console)

```javascript
javascript:console.log(angular.element(document.body).injector().invoke(function($rootScope) { return (function _getScopeStatistics(scope) { var statistics = { scopes: 1, watchExpressions: 0 }; if (scope.$$watchers) { statistics.watchExpressions += scope.$$watchers.length; } if (!scope.$$childHead) { return statistics; } var childScope = scope.$$childHead; do { var childStatistics = _getScopeStatistics(childScope); for (var property in childStatistics) { statistics[property] += childStatistics[property]; } } while ((childScope = childScope.$$nextSibling)); return statistics; })($rootScope); }));
```

Treat ’em well – these little guys have saved my neck countless times!
