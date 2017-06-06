$(document).ready(function() {

//Initialize Firebase
var config = {
    apiKey: "AIzaSyC9D5V1vGHMQ2lIh1nYSORv-cq-fKPkcC0",
    authDomain: "train-time-v2.firebaseapp.com",
    databaseURL: "https://train-time-v2.firebaseio.com",
    projectId: "train-time-v2",
    storageBucket: "train-time-v2.appspot.com",
    messagingSenderId: "241493221184"
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
var input;

var tName = $(".train-name");
var tDestination = $(".train-destination");
var tFrequency = $(".train-frequency");
var tArrival = $(".train-arrival");

    database.ref().on("value", function(snapshot) {

      var data = snapshot.val();
      var dataArr = Object.keys(data);
      var thisObject = data[key];

      for( var key in data ){

      }

      function displayTable() {
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
      
      displayTable();

      $("#submit-button").on("click", function() {
        event.preventDefault();

        var lastIndex = dataArr.length - 1;
        var lastKey = dataArr[lastIndex];
        var lastObj = data[lastKey]

        console.log(lastObj);
        console.log(thisObject.trainName);
        console.log(thisObject.trainDestination);
        console.log(thisObject.trainArrival);
        console.log(thisObject.trainFrequency);
        
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

      },  

      function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
});