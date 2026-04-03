(() => {
  'use strict'
  /*
	fetch('script/config.json')
		.then(response => response.json())
		.then(data => {
			const config = data;
	});
	import config from 'script/config.json';
	//const config = require('script/config.json');
	console.log(config.databaseURL); // 3000
	console.log(config.authorization); // 3000
	*/
	
	// Your web app's configuration
	const appConfig = {
		"databaseURL": "https://payment-f9c12-default-rtdb.firebaseio.com",
		"authorization" : "vAU2WgoNg1lMZDcIYMfzMjIWlZ723pYpWxVvj9Hb"
	}

	var Loans;
	
    $(document).ready(function ($) {
		/*
		const params = new Proxy(new URLSearchParams(window.location.search), {
		  get: (searchParams, prop) => searchParams.get(prop),
		});
		console.log("params");
		console.log(params.id);
		*/
		// Loading Partial Page
		$('#logo').load('Shared/logo.html');
		//$('#navbar').load('Shared/navbar.html');
		$('#floatingbutton').load('Shared/floatingbutton.html');
		
		var now = new Date();
		now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
		let text = now.toISOString().slice(0, 16);
		document.getElementById('start_date_id').value  = text;
		let uuid = crypto.randomUUID();
		document.getElementById('loan_id_id').value  = uuid;
		
		$('#myForm').submit(function (event) {
			//var formData = JSON.stringify($("#myForm").serializeArray());
			event.preventDefault();
			var object = {};
			var formData = new FormData(document.getElementById('myForm'));
			formData.forEach((value, key) => object[key] = value);
			var txt = JSON.stringify(object);
			//alert(txt)
			//console.log(txt);
			createNewLoan(txt);
		});
		
		getLoanViaFirebaseAPI();
		
    });
		
	function loadTableData(items) {
		console.log(items);
		var arrayObject;
		
		// Generate new items HTML
		var html = '';
		//const table = document.getElementById("tableBody");
		
		for(var i in items)
		{
			var item = items[i];
			html += `
				<tr onclick="window.location='../../Tracker/tracker?id=${item.loan_id}';" style="cursor:pointer;">
					<td>${item.name}</td>
					<td>${item.reference_number}</td>
					<td>${item.amount}</td>
					<td>${item.loan_status}</td>
				</tr>
			`;
		}
		document.getElementById('tableBody').innerHTML = html;
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
	
	function getLoanViaFirebaseAPI(){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()
		const url = appConfig.databaseURL + '/loan.json?auth=' + appConfig.authorization +'&orderBy="loan_id"';

		// Open a new connection, using the GET request on the URL endpoint
		request.open('GET', url, true)

		request.onload = function() {
		 // Begin accessing JSON data here
		  var data = JSON.parse(this.response)

		  if (request.status >= 200 && request.status < 400) {
			console.log("getLoans data");
			console.log(data);
			loadTableData(data);
			initialiseDataTable();
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
