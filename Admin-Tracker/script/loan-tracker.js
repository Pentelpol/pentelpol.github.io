import {
	createNewAccount, 
	getAllAccounts, 
	getAccountViaId,
	updateAccountViaAccountID,
	createNewTerm,
	getTermViaAccountId,
	deleteTermViaId,
	updateTermViaAccountID,
	createNewPayment,
	getPaymentViaAccountID,
	updatePaymentViaAccountID
	} from './FirebaseAPICall.js';
	
import config from './config.json' with { type: 'json' };

//var paymentObject;

(() => {
  'use strict'
	
	const params = new Proxy(new URLSearchParams(window.location.search), {
	  get: (searchParams, prop) => searchParams.get(prop),
	});;
	
	var LoansDetailsObj;
	var paymentObject;
	var termObject;
	
    $(document).ready(function ($) {
		
		console.log("params");
		console.log(params.id);
		
		initPage();
		
		// Loading Partial Page
		$('#logo').load('Shared/logo.html');
		//$('#navbar').load('Shared/navbar.html');
		$('#floatingbutton').load('Shared/floatingbutton.html');
		
		
		var now = new Date();
		now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
		let text = now.toISOString().slice(0, 16);
		document.getElementById('payment_date_id').value  = text;
		/*
		let uuid = crypto.randomUUID();
		document.getElementById('loan_id_id').value  = uuid;
		*/
		
		$('#FormAddNewTerm').submit(function (event) {
			event.preventDefault();
			var object = {};
			var formData = new FormData(document.getElementById('FormAddNewTerm'));
			formData.forEach((value, key) => object[key] = value);
			object["account_id"] = params.id;
			object["created_by"] = "00000000"; // to be added
			var txt = JSON.stringify(object);
			alert(txt);
			createNewTerm(txt).then((msg) => {
				location.reload();
			}).catch((error) => {
				console.log('createNewTerm error:' + error);
			});
		});
		
		$('#FormAddNewPayment').submit(function (event) {
			event.preventDefault();
			var object = {};
			var formData = new FormData(document.getElementById('FormAddNewPayment'));
			formData.forEach((value, key) => object[key] = value);
			object["account_id"] = params.id;
			object["created_by"] = "00000000"; // to be added
			var txt = JSON.stringify(object);
			alert(txt);
			createNewPayment(txt).then((msg) => {
				location.reload();
			}).catch((error) => {
				console.log('createNewPayment error:' + error);
			});
		});
		
		$('#FormEditPayment').submit(function (event) {
			event.preventDefault();
			var object = {};
			var formData = new FormData(document.getElementById('FormEditPayment'));
			
			formData.forEach((value, key) => object[key] = value);
			
			var payment_id = object.payment_id;
			delete object.payment_id; // Using dot notation
			// OR: delete user["role"]; // Using bracket notation
			
			var txt = JSON.stringify(object);
			//alert(txt);
			if (confirm("Are you sure you want to edit this payment" + payment_id + "?"))
			{
				updatePaymentViaAccountID(payment_id, txt).then((message) => {
					//console.log(message);
					location.reload();
				}).catch((error) => {
					console.log(error);
				});
			}
		});
		
		$('#FormEditTerm').submit(function (event) {
			event.preventDefault();
			var object = {};
			var formData = new FormData(document.getElementById('FormEditTerm'));
			
			formData.forEach((value, key) => object[key] = value);
			
			var term_id = object.term_id;
			delete object.term_id; // Using dot notation
			// OR: delete user["role"]; // Using bracket notation
			
			var txt = JSON.stringify(object);
			//alert(txt);
			if (confirm("Are you sure you want to edit this term" + term_id + "?"))
			{
				updateTermViaAccountID(term_id, txt).then((message) => {
					//console.log(message);
					location.reload();
				}).catch((error) => {
					console.log(error);
				});
			}
		});
		
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
					<td class="w-10">
						<a class="nav-link dropdown-toggle"
						href="#"
						data-bs-toggle="dropdown"
						aria-expanded="false">${item.term}</a>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item btn-edit" onclick="editTermDetails('${i}');"><i class="fa fa-pencil"></i> Edit</a></li>
							<li><a class="dropdown-item btn-delete" onclick="deleteTermDetails('${i}');"><i class="fa fa-trash"></i> Delete</a></li>
						</ul>
					</td>
					<td>${new Date(item.due_date).toLocaleString()}</td>
					<td>&#8369;${item.amortization}</td>
					<td>${item.status}</td>
					<td>${item.remarks}</td>
				</tr>
			`;
		}
		document.getElementById('termtableBody').innerHTML = html;
		initialiseDataTable();
	}
	
	function loadPaymentData(items) {
		//console.log(items);
		
		// Generate new items HTML
		var html = '';
		
		for(var i in items)
		{
			var item = items[i];
			html += `
				<tr>
					<td>
						<div class="form-row">
							<div class="col">
								&#8369;${item.amount}
							</div>
							<div class="col">
							  <button class="btn-edit" onclick="editPaymentDetails('${i}');"><i class="fa fa-pencil"></i></button>
							  <button class="btn-delete" onclick="deletePaymentDetails('${i}');"><i class="fa fa-trash"></i></button>
							</div>
						</div>
					</td>
					<td>${new Date(item.payment_date).toLocaleString()}</td>
					<td>${item.status}</td>
					<td>${item.remarks}</td>
				</tr>
			`;
		}
		document.getElementById('paymenttableBody').innerHTML = html;
		initialiseDataPaymentTable();
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
	
	function initialiseDataPaymentTable()
	{
        new DataTable('#bootstrap-data-payment-table-export', {
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
	
	function initPage()
	{
		//Load Account details
		getAccountViaId(params.id).then((data) => {
			console.log('Loading account details .......');
			console.log(data);
			sessionStorage.setItem('Account', JSON.stringify(data));
			loadLoanDetails(data);
		}).catch((error) => {
			console.log('getAccountViaId error:' + error);
		});
		
		//Load Term Table
		getTermViaAccountId(params.id).then((data) => {
			console.log('Loading term datas .......');
			console.log(data);
			sessionStorage.setItem('Terms', JSON.stringify(data));
			loadTermData(data);
		}).catch((error) => {
			console.log('getTermViaAccountId error: ' + error);
		});
		
		//Load Payment Table
		getPaymentViaAccountID(params.id).then((data) => {
			console.log('Loading payments datas .......');
			console.log(data);
			//window.paymentObject = data;
			sessionStorage.setItem('Payments', JSON.stringify(data));
			loadPaymentData(data);
		}).catch((error) => {
			console.log('getPaymentViaAccountID error: ' + error);
		});
	}
})()

	function deleteTermDetails(term_id)
	{ 
		if (confirm("Are you sure you want to delete this term" + term_id + "?"))
		{
	
			deleteTermViaId(term_id).then((message) => {
				console.log(message);
				location.reload();
			},(error) => {
				console.log(error);
			});
			
			console.log("deleteTermDetails ID: " + term_id );
		}
	}
		
	function editTermDetails(term_id)
	{ 
		populateEditTermForm(term_id);
		
		const modal = document.getElementById("EditTerm");
		// Create a new instance and show it
		const myModal = new bootstrap.Modal(modal);
		myModal.show();
		
		console.log("editTermDetails ID:" + term_id);
	}
	
	// Add this line to expose it globally
	window.deleteTermDetails = deleteTermDetails;
	window.editTermDetails = editTermDetails;
	
	export function populateEditPaymentForm(payment_id)
	{
		//var data = window.paymentObject[payment_id];
		const data = JSON.parse(sessionStorage.getItem('Payments'));
		
		document.getElementById('editpaymentamountid').value = data[payment_id].amount;
		document.getElementById('editpaymentstatusid').value = data[payment_id].status;
		document.getElementById('editpaymentremarks').value = data[payment_id].remarks;
		document.getElementById('editpaymentdateid').value = new Date(data[payment_id].payment_date).toISOString().slice(0, 16);
		document.getElementById('payment_id').value = payment_id;
	}
	
	export function populateEditTermForm(term_id)
	{
		//var data = window.paymentObject[payment_id];
		const data = JSON.parse(sessionStorage.getItem('Terms'));
		
		var duedate = new Date(data[term_id].due_date);
		
		document.getElementById('edittermnameid').value = data[term_id].term;
		document.getElementById('editamortizationid').value = data[term_id].amortization;
		document.getElementById('edittermstatusid').value = data[term_id].status;
		document.getElementById('edittermremarksid').value = data[term_id].remarks;
		document.getElementById('editdue_dateid').value = duedate.toISOString().slice(0, 16);
		document.getElementById('term_id').value = term_id;
		
	}