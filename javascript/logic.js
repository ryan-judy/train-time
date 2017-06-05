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
var frequency = 0;
var arrival = 0;
var away;
//var schedule = $("<td class = 'train-name'><td class = 'train-destination'><td class = 'train-frequency'><td class = 'train-arrival'><td class = 'train-away'>");
var newGroup;
var current;
var ok;
var currentObject;
var number;

	//When submit button is pressed, push info to the train group.
	$("#submit-button").on("click", function() {
      // Prevent the page from refreshing
    	event.preventDefault();

				       
    	schedule = $(".train-schedule").append(schedule);
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
      var data = snapshot.val();
      var dataArr = Object.keys(data);
      var thisObject = data[key];

      for( var key in data ){
            newBody = $("<tbody class = 'train-group'>");
            var a = $(".table").append(newBody);
            newTr = $("<tr>");
            schedule = $("<td class = 'train-name'><td class = 'train-destination'><td class = 'train-frequency'><td class = 'train-arrival'><td class = 'train-away'>");
            newTr.append(schedule);
            newBody.append(newTr);
  
        	for (var i = 0; i < dataArr.length; i++) {
            ok = dataArr[i];
            currentObject = data[ok];
      	   	$(".train-name").html(currentObject.trainName);
  	        $(".train-destination").html(currentObject.trainDestination);
  	        $(".train-frequency").html(currentObject.trainArrival);
  	        $(".train-arrival").html(currentObject.trainFrequency);
	          console.log(currentObject.trainName);
      			console.log(currentObject.trainDestination);
      			console.log(currentObject.trainArrival);
      			console.log(currentObject.trainFrequency);

      }
  }
  

 	       // Getting an array of each key In the snapshot object

      // Finding the last user's key
      var lastIndex = dataArr.length - 1;

      var lastKey = dataArr[lastIndex];

      // Using the last user's key to access the last added user object
      var lastObj = data[lastKey]
      console.log(lastObj);

      // Console.loging the last user's data
      console.log(lastObj.trainName);
      console.log(lastObj.trainDestination);
      console.log(lastObj.trainArrival);
      console.log(lastObj.trainFrequency);

      
      //$(".train-name").html(lastObj.trainName);
      //$(".train-destination").html(lastObj.trainDestination);
      //$(".train-frequency").html(lastObj.trainFrequency);
      //$(".train-arrival").html(lastObj.trainArrival);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

});