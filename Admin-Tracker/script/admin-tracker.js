(() => {
  'use strict'

  /*document.querySelector('#navbarSideCollapse').addEventListener('click', () => {
    document.querySelector('.offcanvas-collapse').classList.toggle('open')
  })*/
	var Loans;
	
    $(document).ready(function () {
		/*
		const params = new Proxy(new URLSearchParams(window.location.search), {
		  get: (searchParams, prop) => searchParams.get(prop),
		});
		console.log("params");
		console.log(params.id);
		*/
		const d = new Date();
		let text = d.toUTCString();
		document.getElementById('start_date_id').valueAsDate  = new Date();
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
	
	function getLoanViaFirebaseAPI(){
		// Create a request variable and assign a new XMLHttpRequest object to it.
		var request = new XMLHttpRequest()

		// Open a new connection, using the GET request on the URL endpoint
		request.open('GET', 'https://payment-f9c12-default-rtdb.firebaseio.com/loan.json?auth=vAU2WgoNg1lMZDcIYMfzMjIWlZ723pYpWxVvj9Hb&orderBy="id"', true)

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
				<tr>
					<td>${item.name}</td>
					<td>${item.reference_number}</td>
					<td>${item.amount}</td>
					<td>${item.loan_status}</td>
				</tr>
			`;
			/*
			let row = table.insertRow();
			
			let name = row.insertCell(0);
			name.innerHTML = item.name;
			
			let reference_number = row.insertCell(1);
			reference_number.innerHTML = item.reference_number;
			
			let amount = row.insertCell(2);
			amount.innerHTML = item.amount;
			
			let loan_status = row.insertCell(3);
			loan_status.innerHTML = item.loan_status;
			//status.innerHTML = readTermStatus(item.status);
			*/
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
	function createNewLoan(dataObj)
	{
		const xhr = new XMLHttpRequest();
		const url = "https://payment-f9c12-default-rtdb.firebaseio.com/loan.json?auth=vAU2WgoNg1lMZDcIYMfzMjIWlZ723pYpWxVvj9Hb";

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
