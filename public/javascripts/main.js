(function () {
	if (braintree) {
		braintree.setup(token, 'dropin', {
			container: 'dropin'
		});
	} else {
		// TODO: Catch if we cant load the script
	}
})();
