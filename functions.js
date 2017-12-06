/************ JavaScript Functions ************/
/****** Ross Chan - 3DotFive Coding Test ******/
/**********************************************/

// Initialize Firebase (runs on start)
var config = {
	apiKey: "AIzaSyAEG6nsnSisbGs4Ja7MQJFH4vBDh2h05tc",
	authDomain: "dotfive-code-test.firebaseapp.com",
	databaseURL: "https://dotfive-code-test.firebaseio.com",
	projectId: "dotfive-code-test",
	storageBucket: "dotfive-code-test.appspot.com",
	messagingSenderId: "948060943028"
};
firebase.initializeApp(config);

// Sign out handler
function userSignOut() {
	firebase.auth().signOut();
}

// get current data from database
function populateFields()
{
	var database = firebase.database();
	
	database.ref("Texts/Text1").once("value", function(snapshot) {
		var text = snapshot.val().String;
		document.getElementById("text1").value=(text);
	}, function (error) {
		document.getElementById('warning').innerHTML=("Error: " + error.code);
	});
	
	database.ref("Texts/Text2").once("value", function(snapshot) {
		var text = snapshot.val().String;
		document.getElementById("text2").value=(text);
	}, function (error) {
		document.getElementById('warning').innerHTML=("Error: " + error.code);
	});
}

// Redirect unauthorized users
function login_redirect()
{
	firebase.auth().onAuthStateChanged(function(user) {
		if (!user) {
			window.location.replace("screen1.html");
		}
	});
}

// run on page load
function init()
{
	login_redirect();
	populateFields();
}

/****************** Screen 1 ******************/

// Sign In button handler
function loginHandler( form ) {
	var email = form.email.value;
	var password = form.password.value;

	if (email == "") { 
		document.getElementById('warning').innerHTML=("Email is empty.");
		return false; // suppress form submission
	}
	else if(password == "") { 
		document.getElementById('warning').innerHTML=("Password is empty.");
		return false; // suppress form submission
	}
	else {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function(firebaseUser) {
			window.location.replace("screen2.html");	// proceed to next screen
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode === 'auth/wrong-password') {
				document.getElementById('warning').innerHTML=("Wrong password.");
			}
			else {
				document.getElementById('warning').innerHTML=(errorMessage);
			}
			console.log(error);
		});
		
		return false; // suppress form submission
	}
}

/****************** Screen 2 ******************/

// Submit button handler
function submitHandler( form )
{
	var text1 = form.text1.value;
	var text2 = form.text2.value;
	var database = firebase.database();
	
	database.ref("Texts/Text1").update({
		"String": text1
	});
	
	database.ref("Texts/Text2").update({
		"String": text2
	});
	
	window.location.replace("screen3.html");	// proceed to next screen
	return false;
}

/****************** Screen 3 ******************/

// Edit button handler
function editHandler( form )
{
	window.location.replace("screen2.html");	// go back to previous screen
	return false;
}
