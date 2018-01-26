var BankPortal = function() {
	/* attribute to hold the active page */
	var activePage = ko.observable("Home");

	/* attribute to hold the active tab. */
	var activeTab = ko.observable('Accounts');

	/* method to set the active page */
	var setActivePage = function(page) {
		console.log("Setting the active page to: " + page);
		activePage(page);
	};

	/* method to set the active tab */
	var setActiveTab = function(tab) {
		console.log('Setting the active tab to: ' + tab);
		activeTab(tab);
	};

	/* returns true if parameter matches active page, otherwise false */
	var isActivePage = function(page) {
		return activePage() === page;
	};

	/* returns true if paraemter matches active tab, false otherwise */
	var isActiveTab = function(tab) {
		return activeTab() === tab;
	};

	var init = function() {
		ko.applyBindings(BankPortal);
	};

	$(init);

	return {
		setActivePage: setActivePage,
		isActivePage: isActivePage,
		setActiveTab: setActiveTab,
		isActiveTab: isActiveTab
	};
}();