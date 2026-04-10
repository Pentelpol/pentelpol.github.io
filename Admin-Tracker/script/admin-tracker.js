
import { createNewAccount, getAllAccounts, getAccountViaId} from './FirebaseAPICall.js';

import firebaseConfig  from './firebaseConfig.json' with { type: 'json' };
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js';
import { getAuth, signInAnonymously, signInWithPopup, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';

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
	/*
	const appConfig = {
		"databaseURL": "https://payment-f9c12-default-rtdb.firebaseio.com",
		"authorization" : "vAU2WgoNg1lMZDcIYMfzMjIWlZ723pYpWxVvj9Hb"
	}
*/
	var Loans;
	
    $(document).ready(function ($) {
		/*
		const params = new Proxy(new URLSearchParams(window.location.search), {
		  get: (searchParams, prop) => searchParams.get(prop),
		});
		console.log("params");
		console.log(params.id);
		*/
		//test get auth study
		
		// Initialize Firebase
		const app = initializeApp(firebaseConfig);
		const auth = getAuth();
		/*
		listUsers(1000, nextPageToken)
			.then((listUsersResult) => {
				listUsersResult.users.forEach((userRecord) => {
				console.log('user', userRecord.toJSON());
			  });
			})
			.catch((error) => {
			  console.log('Error listing users:', error);
			});
			*/
		/*
			var email = 'trackeracct_1@yopmail.com';
			var password = '123456';
			signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
					// Signed in
					var user = userCredential.user;
					// ...
				  })
				  .catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
				  });
		const storage = getFirestore();
		
		localStorage.setItem('Auth', auth);
		*/
		//localStorage.setItem('Storage', storage);
		/*
		auth.onAuthStateChanged(user => { 
		  // Check for user status
		  if (user) {
			console.log('Anonymous user signed-in.', user);
			localStorage.setItem('User', user);
			user.getIdToken(true).then((x) => {
				//var y = id;
				getAllAccounts(appConfig.databaseURL, x).then((message) => {
							//console.log(message);
							loadTableData(message);
						},(error) => {
							console.log(error);
						});
			});
			
		  } else {
			console.log('There was no anonymous session. Creating a new anonymous user.',);
			/*
			signInWithPopup(new auth.GoogleAuthProvider()).catch(function (error) {
				console.log( 'Sign-in failed. ' + error.code);
			});
			*/
			/*
			var email = 'trackeracct_1@yopmail.com';
			var password = '123456';
			signInWithEmailAndPassword(email, password).then((userCredential) => {
					// Signed in
					var user = userCredential.user;
					// ...
				  })
				  .catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
				  });
				  */
			/*
			// Sign the user in anonymously since accessing Storage requires the user to be authorized.
			signInAnonymously(auth).catch(function (error) {
				if (error.code === 'auth/operation-not-allowed') {
					window.alert(
					  'Anonymous Sign-in failed. Please make sure that you have enabled anonymous ' +
						'sign-in on your Firebase project.',
					);
				}
			});
			
		  }
		});
		*/
		/*
		// Locally, we use the firebase emulators.
		if (window.location.hostname === 'localhost') {
		  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
		  connectStorageEmulator(storage, '127.0.0.1', 9199);
		}
		*/
		//study end
		
		// Saving App Parameters to local storage
		/*
		localStorage.setItem('databaseURL', appConfig.databaseURL)
		localStorage.setItem('authorization', appConfig.authorization)
		//reading data in App localStorage
		console.log('object found in localStorage');
		console.log(localStorage.getItem('authorization'));
		*/
		// Loading Partial Page
		$('#logo').load('Shared/logo.html');
		//$('#navbar').load('Shared/navbar.html');
		$('#floatingbutton').load('Shared/floatingbutton.html');
		
		var now = new Date();
		now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
		let text = now.toISOString().slice(0, 16);
		document.getElementById('start_date_id').value  = text;
		//let uuid = crypto.randomUUID();
		//document.getElementById('loan_id_id').value  = uuid;
		
		$('#myForm').submit(function (event) {
			//var formData = JSON.stringify($("#myForm").serializeArray());
			event.preventDefault();
			var object = {};
			var formData = new FormData(document.getElementById('myForm'));
			formData.forEach((value, key) => object[key] = value);
			object["created_by"] = "00000000"; // to be added
			var txt = JSON.stringify(object);
			//alert(txt)
			//console.log(txt);
			//createNewLoan(txt);
			//
			//
			createNewAccount(txt).then((message) => {
					console.log(message);
					location.reload();
				},(error) => {
					console.log(error);
				});
		});
		
		//getLoanViaFirebaseAPI();
		
		getAllAccounts().then((message) => {
					//console.log(message);
					loadTableData(message);
				},(error) => {
					console.log(error);
				});
		
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
				<tr onclick="window.location='loan?id=${i}';" style="cursor:pointer;">
					<td>${item.name}</td>
					<td>${item.reference_number}</td>
					<td>${item.amount}</td>
					<td>${item.loan_status}</td>
				</tr>
			`;
		}
		document.getElementById('tableBody').innerHTML = html;
		initialiseDataTable();
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
})()
