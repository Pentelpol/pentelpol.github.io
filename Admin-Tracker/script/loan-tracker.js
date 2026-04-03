(() => {
  'use strict'
	
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});;
	// Your web app's configuration
	const appConfig = {
		"databaseURL": "https://payment-f9c12-default-rtdb.firebaseio.com",
		"authorization" : "vAU2WgoNg1lMZDcIYMfzMjIWlZ723pYpWxVvj9Hb",
		"id" : params.id
	}

	var LoansDetailsObj
	
    $(document).ready(function ($) {
		
		console.log("params");
		console.log(params.id);
		getLoanDetailsViaFirebaseAPI();
		
		// Loading Partial Page
		$('#logo').load('Shared/logo.html');
		//$('#navbar').load('Shared/navbar.html');
		$('#floatingbutton').load('Shared/floatingbutton.html');
		
		/*
		var now = new Date();
		now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
		let text = now.toISOString().slice(0, 16);
		document.getElementById('start_date_id').value  = text;
		let uuid = crypto.randomUUID();
		document.getElementById('loan_id_id').value  = uuid;
		*/
		
    });
	
	function loadTermData(items) {
		//console.log(items);
		
		// Generate new items HTML
		var html = '';
		
		for(var i in items)
		{
			var item = items[i];
			html += `
				<tr>
					<td>${item.term}</td>
					<td>${item.amortization}</td>
					<td>${item.interest}</td>
					<td>${item.status}</td>
				</tr>
			`;
		}
		document.getElementById('termtableBody').innerHTML = html;
		initialiseDataTable();
	}
	
	function loadLoanDetails(details) {
		// Generate new items HTML
		var html = '';
		html += `
			<br />
			<div class="detail-container">
			  <div>
				<div class="detail-label">Loan Status:</div>
				<div class="detail-label">Loan Name:</div>
				<div class="detail-label">Reference Number:</div>
				<div class="detail-label">Amount:</div>
				<div class="detail-label">Term:</div>
				<div class="detail-label">Monthly Ammortization:</div>
				<div class="detail-label">Date Started:</div>
				<div class="detail-label">Total Amount Paid:</div>
			  </div>
			  <div>
				<div class="detail-value">${details.loan_status}</div>
				<div class="detail-value">${details.name}</div>
				<div class="detail-value">${details.reference_number}</div>
				<div class="detail-value">Php ${details.amount}</div>
				<div class="detail-value">${details.term} Month</div>
				<div class="detail-value">Php ${details.montly_payment}</div>
				<div class="detail-value">${details.start_date}</div>
				<div class="detail-value">Php ${details.total_payment}</div>
			  </div>
			</div>

			<!-- Structure 2: Expandable Details (Native HTML) -->
			<details>
			  <summary>View Remarks</summary>
			  <p>${details.remarks}</p>
			</details>
			<br />
			`;
		document.getElementById('loanDetails').innerHTML = html;
	}
	
	function initialiseDataTable()
	{
        new DataTable('#bootstrap-data-table-export', {
            fixedHeader: true,
            lengthChange: true,
            pageLength: 50,
            lengthMenu: [
                [10, 25, 50, -1],
                [10, 25, 50, 'All']
            ],
            order: [
                [0, 'asc']
            ],
            layout: {
                top2Start: {
                    buttons: ['copy', 'excel', 'pdf', 'colvis']
                }
            }
        });
	}
	
	// FIREBASE API CALLS
	
	function getLoanDetailsViaFirebaseAPI(){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = appConfig.databaseURL + '/loan/' + appConfig.id + '.json?auth=' + appConfig.authorization;// + '&callback=loadLoanDetails()'

		// Open a new connection, using the GET request on the URL endpoint
		request.open('GET', url, true)

		request.onload = function() {
		 // Begin accessing JSON data here
		  var data = JSON.parse(this.response)

		  if (request.status >= 200 && request.status < 400) {
			console.log("getLoanDetailsViaFirebaseAPI data");
			console.log(data);
			LoansDetailsObj = data;
			
			loadLoanDetails(data);
			
			getLoanTermViaFirebaseAPI();
		  } else {
			console.log('error')
		  }
		}

		// Send request
		request.send()
	}
	
	function getLoanTermViaFirebaseAPI(){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = appConfig.databaseURL + '/term_list.json?auth=' + appConfig.authorization + '&orderBy="loan_id"&equalTo="' + appConfig.id + '"';// + '&callback=loadLoanDetails()'

		// Open a new connection, using the GET request on the URL endpoint
		request.open('GET', url, true)

		request.onload = function() {
		 // Begin accessing JSON data here
		  var data = JSON.parse(this.response)

		  if (request.status >= 200 && request.status < 400) {
			//console.log(url);
			console.log("getLoanTermViaFirebaseAPI data");
			console.log(data);
			loadTermData(data);
		  } else {
			console.log('error')
		  }
		}

		// Send request
		request.send()
	}
	
	function createNewLoan(dataObj)
	{
		const xhr = new XMLHttpRequest();
		const url = appConfig.databaseURL + '/loan.json?auth=' + appConfig.authorization;

		// 1. Initialize the request
		xhr.open("POST", url, true);

		// 2. Set the Content-Type header (must be after open)
		xhr.setRequestHeader("Content-Type", "application/json");

		// 3. Define the response handler
		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 300) {
				console.log("Success:", JSON.parse(xhr.responseText));
				location.reload();
			} else {
				console.error("Error:", xhr.statusText);
			}
		};

		// 4. Send the request with stringified JSON data
		//const data = JSON.stringify(dataObj);
		//var data = JSON.parse(dataObj)
		xhr.send(dataObj);
	}
})()
