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

var away;
var newGroup;
var current;
var ok;
var currentObject;
var number;
var newBody;
var schedule;
var input;
var a;
var hours;
var minutes;
var b;

var tName = $(".train-name");
var tDestination = $(".train-destination");
var tFrequency = $(".train-frequency");
var tArrival = $(".train-arrival");
        
        var currentTime = moment().unix();
        hours = moment.duration(currentTime).hours();
        minutes = moment.duration(currentTime).minutes();
        console.log(hours)
        console.log(minutes)
        var b = hours + ":" + minutes;
        var c = moment(b, "hh:mm").format("hh:mm a")
        console.log(c)
        a = moment("1100", "HH:mm").format("hh:mm a");
        console.log(moment(a).from(moment().unix()))


database.ref().on("child_added", function(childSnapshot) {

      data = childSnapshot.val();
      var dataArr = Object.keys(data);
      console.log(data.trainName)


            newBody = $("<tbody class = 'train-group'>");
            var newTr = $("<tr>");
            var nameTd = $("<td class = 'train-name'>");
            var desintationTd = $("<td class = 'train-destination'>");
            var frequencyTd = $("<td class = 'train-frequency'>");
            var arrivalTd = $("<td class = 'train-arrival'>");
            //var awayTd = $("<td class = 'train-away'>");
            nameTd.append(data.trainName);
            desintationTd.append(data.trainDestination);
            frequencyTd.append(data.trainArrival);
            arrivalTd.html(data.trainFrequency);

            newTr.append(nameTd);
            newTr.append(desintationTd);
            newTr.append(frequencyTd);
            newTr.append(arrivalTd);
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

        input = moment(arrival, "HH:mm").format("hh:mm a");



              database.ref().push({
              trainName: name,
              trainDestination: destination,
              trainArrival: frequency,
              trainFrequency: input,              
              
              });

          });

      });    

