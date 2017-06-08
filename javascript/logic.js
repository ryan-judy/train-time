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

var database = firebase.database();

var name = "";
var destination = "";
var frequency = 0;
var arrival = 0;

var tName = $(".train-name");
var tDestination = $(".train-destination");
var tFrequency = $(".train-frequency");
var tArrival = $(".train-arrival");
      

database.ref().on("child_added", function(childSnapshot) {

      data = childSnapshot.val();
      var dataArr = Object.keys(data);
      console.log(data.trainName)


            var newBody = $("<tbody class = 'train-group'>");
            var newTr = $("<tr>");
            var nameTd = $("<td class = 'train-name'>");
            var desintationTd = $("<td class = 'train-destination'>");
            var frequencyTd = $("<td class = 'train-frequency'>");
            var arrivalTd = $("<td class = 'train-arrival'>");
            var awayTd = $("<td class = 'train-away'>");
            nameTd.append(data.trainName);
            desintationTd.append(data.trainDestination);
            frequencyTd.append(data.trainFrequency);
            arrivalTd.html(data.trainArrival);
            awayTd.html(data.minAway);

            newTr.append(nameTd);
            newTr.append(desintationTd);
            newTr.append(frequencyTd);
            newTr.append(arrivalTd);
            newTr.append(awayTd)
            newBody.append(newTr);
            $(".table").append(newBody);  

    },  

      function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });        

      
      $("#submit-button").on("click", function() {
        event.preventDefault();

        name = $("#name-input").val();
        destination = $("#destination-input").val().trim();
        arrival = $("#first-time-input").val().trim();
        frequency = $("#frequency-input").val().trim();

        arrival = moment(arrival, "HH:mm").format("hh:mm a");

          var firstTimeConverted = moment(arrival ,"hh:mm a").subtract(1, "years");
            console.log(firstTimeConverted);
              var currentTime = moment();
            console.log("Current Time is: " + moment(currentTime).format("hh:mm a"));

          var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

          var tRemainder = diffTime % frequency; 

          var minAway = frequency - tRemainder;

          var nextTrain = moment().add(minAway, "minutes");
            arrival = moment(nextTrain).format("hh:mm a");

              database.ref().push({
              trainName: name,
              trainDestination: destination,
              trainFrequency: frequency,
              trainArrival: arrival,
              minAway: minAway              
              
              });

        name = $("#name-input").empty();
        destination = $("#destination-input").empty();
        arrival = $("#first-time-input").empty();
        frequency = $("#frequency-input").empty();

          });

      });    

