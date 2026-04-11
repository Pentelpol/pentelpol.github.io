	import config from './config.json' with { type: 'json' };
	
	//Add New Account
	export function createNewAccount(dataObj)
	{
		const xhr = new XMLHttpRequest();
		const url = config.databaseURL + '/accounts.json?auth=' + config.authorization;
		return new Promise((resolve, reject) => {
			// 1. Initialize the request
			xhr.open("POST", url, true);

			// 2. Set the Content-Type header (must be after open)
			xhr.setRequestHeader("Content-Type", "application/json");

			// 3. Define the response handler
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					console.log("Success:", JSON.parse(xhr.responseText));
					resolve("Success!");
				} else {
					reject("Error:" + xhr.statusText);
					//console.error("Error:", xhr.statusText);
				}
			};

			// 4. Send the request with stringified JSON data
			//const data = JSON.stringify(dataObj);
			xhr.send(dataObj);
		});
	}
	
	// Get All Accounts
	export function getAllAccounts(databaseURL, auth){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		//const url = databaseURL + '/accounts.json?access_token=' + auth;
		const url = config.databaseURL + '/accounts.json?auth=' + config.authorization;

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			request.open('GET', url, true)

			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 400) {
				console.log("getLoans data");
				console.log(data);
				resolve(data);
			  } else {
					reject("Error:" + request.statusText);
			  }
			}

			// Send request
			request.send()
		});
	}
	// Get Account by Account ID
	export function getAccountViaId(id){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = config.databaseURL + '/accounts/' + id + '.json?auth=' + config.authorization;
		
		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			request.open('GET', url, true)

			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 400) {
				console.log("getLoanDetailsViaFirebaseAPI data");
				console.log(data);
				resolve(data);
			  } else {
				reject("Error:" + request.statusText);
			  }
			}

			// Send request
			request.send()
		});
	}
	// Update Account via Acount Id
	export function updateAccountViaAccountID(id, dataObj){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var xhr = new XMLHttpRequest()
		const url = config.databaseURL + '/accounts/' + id + '.json?auth=' + config.authorization;
		//account_id

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			xhr.open('PATCH', url, true)

			// 2. Set the Content-Type header (must be after open)
			xhr.setRequestHeader("Content-Type", "application/json");

			// 3. Define the response handler
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve("Success:" + JSON.parse(xhr.responseText));
				} else {
					reject("Error:" + xhr.statusText);
				}
			};

			// 4. Send the request with stringified JSON data
			//const data = JSON.stringify(dataObj);
			xhr.send(dataObj)
		});
	}
	
	// Add Term
	export function createNewTerm(dataObj)
	{
		const xhr = new XMLHttpRequest();
		const url = config.databaseURL + '/term_list.json?auth=' + config.authorization;
		
		return new Promise((resolve, reject) => {
			// 1. Initialize the request
			xhr.open("POST", url, true);

			// 2. Set the Content-Type header (must be after open)
			xhr.setRequestHeader("Content-Type", "application/json");

			// 3. Define the response handler
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					console.log("Success:", JSON.parse(xhr.responseText));
					resolve("Success: " + JSON.parse(xhr.responseText));
				} else {
					reject("Error:" + xhr.statusText);
				}
			};

			// 4. Send the request with stringified JSON data
			//const data = JSON.stringify(dataObj);
			xhr.send(dataObj);
		});
	}
	
	// Get Term via Account Id
	export function getTermViaAccountId(acctId){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = config.databaseURL + '/term_list.json?auth=' + config.authorization + '&orderBy="account_id"&equalTo="' + acctId + '"';

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			request.open('GET', url, true)

			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 400) {
				//console.log(url);
				console.log("getLoanTermViaFirebaseAPI data");
				console.log(data);
				resolve(data);
			  } else {
				reject("Error:" + request.statusText);
			  }
			}

			// Send request
			request.send()
		});
	}
	
	// Update Term via Term Id
	export function updateTermViaAccountID(id, dataObj){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var xhr = new XMLHttpRequest()
		const url = config.databaseURL + '/term_list/' + id + '.json?auth=' + config.authorization;
		//account_id

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			xhr.open('PATCH', url, true)

			// 2. Set the Content-Type header (must be after open)
			xhr.setRequestHeader("Content-Type", "application/json");

			// 3. Define the response handler
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve("Success:" + JSON.parse(xhr.responseText));
				} else {
					reject("Error:" + xhr.statusText);
				}
			};

			// 4. Send the request with stringified JSON data
			//const data = JSON.stringify(dataObj);
			xhr.send(dataObj)
		});
	}
	
	// Delete Accounts Term via Id
	export function deleteTermViaId(id){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = config.databaseURL + '/term_list/' + id + '.json?auth=' + config.authorization;

		return new Promise((resolve, reject) => {
			
			console.log("Processing: " + id);
			
			// Open a new connection, using the GET request on the URL endpoint
			request.open('DELETE', url, true)
				
			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 300) {
				// If successful, call resolve()
				resolve("Finished!");
				console.log('Resource deleted successfully'); // Often returns 204 No Content
			  } else {
				reject('reject');
				console.log('error')
			  }
			  
			}

			// Send request
			request.send()
		});
	}
	
	// Add Payment
	export function createNewPayment(dataObj)
	{
		const xhr = new XMLHttpRequest();
		const url = config.databaseURL + '/payment_list.json?auth=' + config.authorization;
		
		return new Promise((resolve, reject) => {
			// 1. Initialize the request
			xhr.open("POST", url, true);

			// 2. Set the Content-Type header (must be after open)
			xhr.setRequestHeader("Content-Type", "application/json");

			// 3. Define the response handler
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve("Success:" + JSON.parse(xhr.responseText));
				} else {
					reject("Error:" + xhr.statusText);
				}
			};

			// 4. Send the request with stringified JSON data
			//const data = JSON.stringify(dataObj);
			xhr.send(dataObj);
		});
	}
	
	// Get Payment via Account Id
	export function getPaymentViaAccountID(acctID){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = config.databaseURL + '/payment_list.json?auth=' + config.authorization + '&orderBy="account_id"&equalTo="' + acctID + '"';//

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			request.open('GET', url, true)

			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 400) {
				//console.log(url);
				console.log("getLoanPaymentViaAccountID data : ");
				console.log(data);
				resolve(data);
			  } else {
					reject("Error:" + request.statusText);
			  }
			}

			// Send request
			request.send()
		});
	}
	
	// Update Payment via Payment Id
	export function updatePaymentViaAccountID(id, dataObj){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var xhr = new XMLHttpRequest()
		const url = config.databaseURL + '/payment_list/' + id + '.json?auth=' + config.authorization;
		//account_id

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			xhr.open('PATCH', url, true)

			// 2. Set the Content-Type header (must be after open)
			xhr.setRequestHeader("Content-Type", "application/json");

			// 3. Define the response handler
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					resolve("Success:" + JSON.parse(xhr.responseText));
				} else {
					reject("Error:" + xhr.statusText);
				}
			};

			// 4. Send the request with stringified JSON data
			//const data = JSON.stringify(dataObj);
			xhr.send(dataObj)
		});
	}
	
	// Delete Accounts Payment 
	export function deletePaymentViaId(payment_id){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = config.databaseURL + '/payment_list/' + payment_id + '.json?auth=' + config.authorization;

		return new Promise((resolve, reject) => {
			
			console.log("Processing: " + payment_id);
			
			// Open a new connection, using the GET request on the URL endpoint
			request.open('DELETE', url, true)
				
			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 300) {
				// If successful, call resolve()
				resolve("Finished!");
				console.log('Resource deleted successfully'); // Often returns 204 No Content
			  } else {
				  reject('reject');
				console.log('error')
			  }
			  
			}

			// Send request
			request.send()
		});
	}
	
	// Getting Statuses and Types
	//Get the Account Type
	export function getAccountsType(){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = config.databaseURL + '/accounts_type.json?auth=' + config.authorization;//

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			request.open('GET', url, true)

			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 400) {
				console.log("getAccountsType data : ");
				console.log(data);
				resolve(data);
			  } else {
					reject("Error:" + request.statusText);
			  }
			}

			// Send request
			request.send()
		});
	}
	//Get the Account Type
	export function getAccountsStatusType(){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = config.databaseURL + '/accounts_status.json?auth=' + config.authorization;//

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			request.open('GET', url, true)

			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 400) {
				console.log("getAccountsType data : ");
				console.log(data);
				resolve(data);
			  } else {
					reject("Error:" + request.statusText);
			  }
			}

			// Send request
			request.send()
		});
	}
	//Get the Payment Status Type
	export function getPaymentStatusType(){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = config.databaseURL + '/payment_status.json?auth=' + config.authorization;//

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			request.open('GET', url, true)

			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 400) {
				console.log("getAccountsType data : ");
				console.log(data);
				resolve(data);
			  } else {
					reject("Error:" + request.statusText);
			  }
			}

			// Send request
			request.send()
		});
	}
	//Get the Term Status Type
	export function getTermStatusType(){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = config.databaseURL + '/term_status.json?auth=' + config.authorization;//

		return new Promise((resolve, reject) => {
			// Open a new connection, using the GET request on the URL endpoint
			request.open('GET', url, true)

			request.onload = function() {
			 // Begin accessing JSON data here
			  var data = JSON.parse(this.response)

			  if (request.status >= 200 && request.status < 400) {
				console.log("getAccountsType data : ");
				console.log(data);
				resolve(data);
			  } else {
					reject("Error:" + request.statusText);
			  }
			}

			// Send request
			request.send()
		});
	}
	