var BankPortal = function() {
	/* attribute to hold the active page */
	var activePage = ko.observable("Home");

	/* method to set the active page */
	var setActivePage = function(page) {
		console.log("Setting the active page to: " + page);
		activePage(page);
	};

	/* returns true if parameter matches active page, otherwise false */
	var isActivePage = function(page) {
		return activePage() === page;
	};

	var init = function() {
		ko.applyBindings(BankPortal);
	};

	$(init);

	return {
		setActivePage: setActivePage,
		isActivePage: isActivePage
	};
}();