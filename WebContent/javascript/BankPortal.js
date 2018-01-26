var BankPortal = function() {
	/* module to retrieve data from the server */
	var server = ServerStub();

	/* attribute to hold the active page */
	var activePage = ko.observable("Home");

	/* attribute to hold the active tab. */
	var activeTab = ko.observable('Accounts');

	/* the model */
	var member = {
		accounts: ko.observableArray(),
		selectedAccount: ko.observable()
	};

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

	var setSelectedAccount = function(account) {
		console.log("Setting the selected account: " + account.summary.number);
		member.selectedAccount(account);
	};

	var isSelectedAccount = function(account) {
		return account === member.selectedAccount();
	};

	/* Retrieve data from the server side and set it in the model */
	var retrieveData = function() {
		console.log('Retrieving data from the server....');
		var data = server.getMemberData();

		console.log('Data retrieved: ' + ko.toJSON(data));

		// add the accounts
		data.accounts.forEach(function(account) {
			member.accounts.push({summary: account.summary});
		});
	};

	var init = function() {
		retrieveData();
		ko.applyBindings(BankPortal);
	};

	$(init);

	return {
		member: member,
		setActivePage: setActivePage,
		isActivePage: isActivePage,
		setActiveTab: setActiveTab,
		isActiveTab: isActiveTab,
		setSelectedAccount: setSelectedAccount,
		isSelectedAccount: isSelectedAccount
	};
}();