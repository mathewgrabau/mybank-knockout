/* Copyright (c) Adnan Jaswal, 2015. See the file license.txt for copying permission. */
/* Module for server stub */
var ServerStub = function () {
	/* add members here */
	var memberData = {
			personal: {		firstName: "John", lastName: "Citizen", 
							address: { 	street: "1 Main Street", city: "Melbourne", postCode: 3000, country: "Australia" }, 
							phoneNumber: 0399998888, emailAddress: "john.citizen@email.com"},
			accounts: [
			           {	summary: {branch: "Collingwood", number: "0612 30042", type: "Savings", balance: 700}, 
							transactions: [{date: "20 May", description: "Collingwood milk bar", category: "Grocery", amount: 23},
							               {date: "18 May", description: "Food store", category: "Food", amount: 13},
							               {date: "15 April", description: "Collingwood milk bar", category: "Grocery", amount: 53},
							               {date: "12 March", description: "Sushi shop", category: "Food", amount: 28}]
			           },
			           {	summary: {branch: "Clayton", number: "0652 20172", type: "Savings", balance: 313.64}, 
							transactions: [{date: "21 May", description: "Clayton milk bar", category: "Grocery", amount: 63},
							               {date: "19 May", description: "No 8 Southbank", category: "Food", amount: 450},
							               {date: "13 April", description: "State library", category: "Work", amount: 53},
							               {date: "11 March", description: "Bags for sale", category: "Shopping", amount: 78}]
			           },			
			           {	summary: {branch: "Mitcham", number: "0682 40742", type: "Credit", balance: 60000}, 
							transactions: [{date: "23 June", description: "Black coder coffee", category: "Food", amount: 53},
							               {date: "21 May", description: "Food store", category: "Grocery", amount: 63},
							               {date: "13 April", description: "Money transfer", category: "Transfer", amount: 500},
							               {date: "09 March", description: "Sushi shop", category: "Food", amount: 68},
							               {date: "08 March", description: "Donuts", category: "Food", amount: 50}]
			           },
			           {	summary: {branch: "Doncaster", number: "0612 40772", type: "Cheque", balance: 10000}, 
							transactions: []
			           }			           
			          ],
	};
	
	/* method returns member data */
	var getMemberData = function () {
		return memberData;
	}
	
	return {
		/* add members that will be exposed publicly */
		getMemberData: getMemberData,

	};
};