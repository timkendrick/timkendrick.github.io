(function() {
	history.replaceState(document.body.className, null, '');

	window.addEventListener('popstate', function(event) {
		document.body.className = event.state;
	});

	document.addEventListener('click', function(event) {
		if (!event.target.hasAttribute('data-transition')) { return; }
		var transitionTarget = event.target.getAttribute('data-transition');
		var href = event.target.getAttribute('href');
		if (href) {
			event.preventDefault();
			history.pushState(transitionTarget, null, href);
		}
		document.body.className = transitionTarget;
	});
})();
