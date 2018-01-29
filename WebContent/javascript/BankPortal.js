var BankPortal = function() {
	/* module to retrieve data from the server */
	var server = ServerStub();

	/* attribute to hold the active page */
	var activePage = ko.observable("Home");

	/* attribute to hold the active tab. */
	var activeTab = ko.observable('Accounts');

	/* edit mode for personal information */
	var personalInformationEditMode = ko.observable(false);
	
	/* flag that shows update message */
	var showPersonalInformationEditDone = ko.observable(false);

	/* flag that shows cancel message */
	var showPersonalInformationEditCancel = ko.observable(false);

	/* the model */
	var member = {
		personal: {
			firstName: ko.mementoObservable(),
			lastName: ko.mementoObservable(),
			address: {
				street: ko.mementoObservable(),
				city: ko.mementoObservable(),
				postalCode: ko.mementoObservable(),
				country: ko.mementoObservable()
			},
			contactDetails: {
				phoneNumber: ko.mementoObservable(),
				emailAddress: ko.mementoObservable()
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

	/* Enable and cancel personal information edit mode */
	var enablePersonalInformationEdit = function() {
		console.log("enablePersonalInformationEditMode");
		personalInformationEditMode(true);
		showPersonalInformationEditDone(false);
		showPersonalInformationEditCancel(false);
	};

	var cancelPersonalInformationEdit = function() {
		personalInformationEditMode(false);
		showPersonalInformationEditDone(true);
		resetPersonalInformation();
	};

	var submitPersonalInformation = function() {
		// commit state of observables
		commitPersonalInformation();

		console.log("Updating personal information on the server" + ko.toJSON(member.personal));
		server.updatePersonalInformation(ko.toJS(member.personal));
		console.log("Personal information updated on the server");

		personalInformationEditMode(false);
		showPersonalInformationEditDone(true);
	};

	/* commit the state of personal information memento observables */
	var commitPersonalInformation = function() {
		member.personal.firstName.commit();
		member.personal.lastName.commit();
		member.personal.contactDetails.phoneNumber.commit();
		member.personal.contactDetails.emailAddress.commit();
		member.personal.address.street.commit();
		member.personal.address.city.commit();
		member.personal.address.postalCode.commit();
		member.personal.address.country.commit();
	};

	/* reset state of the personal informaion memento observables */
	var resetPersonalInformation = function() {
		member.personal.firstName.reset();
		member.personal.lastName.reset();
		member.personal.contactDetails.phoneNumber.reset();
		member.personal.contactDetails.emailAddress.reset();
		member.personal.address.street.reset();
		member.personal.address.city.reset();
		member.personal.address.postalCode.reset();
		member.personal.address.country.reset();
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
		isSelectedAccount: isSelectedAccount,
		personalInformationEditMode: personalInformationEditMode,
		enablePersonalInformationEdit: enablePersonalInformationEdit,
		cancelPersonalInformationEdit: cancelPersonalInformationEdit,
		submitPersonalInformation: submitPersonalInformation,
		showPersonalInformationEditDone: showPersonalInformationEditDone,
		showPersonalInformationEditCancel: showPersonalInformationEditCancel
	};
}();