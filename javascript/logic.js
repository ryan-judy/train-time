$(document).ready(function() {

//Initialize Firebase
var config = {
    apiKey: "AIzaSyDjhoElR-cTwgyhtitUJ0LjmwdChRYyhKA",
    authDomain: "train-time-ee480.firebaseapp.com",
    databaseURL: "https://train-time-ee480.firebaseio.com",
    projectId: "train-time-ee480",
    storageBucket: "train-time-ee480.appspot.com",
    messagingSenderId: "691902959472"
  };

  firebase.initializeApp(config);

//Set database variable
var database = firebase.database();
var name = "";
var destination = "";
var frequency = "";
var arrival = "";
var away;
	
	//When submit button is pressed, push info to the train group.
	$("#submit-button").on("click", function() {
      // Prevent the page from refreshing
    	event.preventDefault();

		name = $("#name-input").val();
	    destination = $("#destination-input").val().trim();
	    arrival = $("#first-time-input").val().trim();
	    frequency = $("#frequency-input").val().trim();

	    database.ref().push({
	        trainName: name,
	        trainDestination: destination,
	        trainArrival: arrival,
	        trainFrequency: frequency,
      });


	});

	database.ref().on("value", function(snapshot) {

      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      for( var key in sv ){
        var thisObject = sv[key];

        console.log(thisObject);
      }


      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

});