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
var newGroup;
var current;
var ok;
var currentObject;
var number;
var newBody;
var schedule;
var tName = $(".train-name");
var tDestination = $(".train-destination");
var tFrequency = $(".train-frequency");
var tArrival = $(".train-arrival");
var input;


  //When submit button is pressed, push info to the train group.
    database.ref().on("value", function(snapshot) {

       $("#submit-button").on("click", function() {
      // Prevent the page from refreshing
      event.preventDefault();
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
               
      name = $("#name-input").val();
      destination = $("#destination-input").val().trim();
      arrival = $("#first-time-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      schedule = moment.duration(frequency).asMinutes("hh:mm a");
      console.log(schedule)
      input = moment(arrival, "HH:mm").format("hh:mm a");
      database.ref().push({
          trainName: name,
          trainDestination: destination,
          trainArrival: frequency,
          trainFrequency: input,
        });
  });

  
      // storing the snapshot.val() in a variable for convenience
      var data = snapshot.val();
      var dataArr = Object.keys(data);
      var thisObject = data[key];

      for( var key in data ){
      }
        function myFunction() {
          for (var i = 0; i < dataArr.length; i++) {
             ok = dataArr[i];
            currentObject = data[ok];
            newBody = $("<tbody class = 'train-group'>");
            var newTr = $("<tr>");
            var nameTd = $("<td class = 'train-name'>");
            var desintationTd = $("<td class = 'train-destination'>");
            var frequencyTd = $("<td class = 'train-frequency'>");
            var arrivalTd = $("<td class = 'train-arrival'>");
            //var awayTd = $("<td class = 'train-away'>");
              nameTd.append(currentObject.trainName);
              desintationTd.append(currentObject.trainDestination);
              frequencyTd.append(currentObject.trainArrival);
              arrivalTd.html(currentObject.trainFrequency);

              newTr.append(nameTd);
              newTr.append(desintationTd);
              newTr.append(frequencyTd);
              newTr.append(arrivalTd);
              newBody.append(newTr);
            $(".table").append(newBody);
        }
      }

      myFunction();

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
     });

