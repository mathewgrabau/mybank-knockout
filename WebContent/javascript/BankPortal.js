var BankPortal = function() {
	/* module to retrieve data from the server */
	var server = ServerStub();

	/* attribute to hold the active page */
	var activePage = ko.observable("Home");

	/* attribute to hold the active tab. */
	var activeTab = ko.observable('Accounts');

	/* the model */
	var member = {
		personal: {
			firstName: ko.observable(),
			lastName: ko.observable(),
			address: {
				street: ko.observable(),
				city: ko.observable(),
				postalCode: ko.observable(),
				country: ko.observable()
			},
			contactDetails: {
				phoneNumber: ko.observable(),
				emailAddress: ko.observable()
			}
		},
		accounts: ko.observableArray(),
		selectedAccount: ko.observable(),
		selectedAccountTransactions: ko.observableArray([])
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
		console.log(account);
		member.selectedAccount(account);
		member.selectedAccountTransactions(account.transactions());
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
			member.accounts.push({
				summary: account.summary, 
				transactions: ko.observableArray(account.transactions)
			});
		});

		// Add the personal information in
		member.personal.firstName(data.personal.firstName);
		member.personal.lastName(data.personal.lastName);
		member.personal.contactDetails.phoneNumber(data.personal.phoneNumber);
		member.personal.contactDetails.emailAddress(data.personal.emailAddress);

		member.personal.address.street(data.personal.address.street);
		member.personal.address.city(data.personal.address.city);
		member.personal.address.postalCode(data.personal.address.postCode);
		member.personal.address.country(data.personal.address.country);
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