var config = {
    apiKey: "AIzaSyCgkLb23eZ4KOxLYuCPIim6oeioAn3U4Ig",
    authDomain: "train-scheduler-267e4.firebaseapp.com",
    databaseURL: "https://train-scheduler-267e4.firebaseio.com",
    projectId: "train-scheduler-267e4",
    storageBucket: "train-scheduler-267e4.appspot.com",
    messagingSenderId: "1095454497230"
  };
firebase.initializeApp(config);

var database = firebase.database();


$("#add-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim());
    var frequncy = $("#freq-input").val().trim();


    var newTrain = {
        name: trainName,
        destination: destination,
        start: trainStart,
        frequncy: frequncy
    };


    database.ref().push(newTrain);

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var frequncy = childSnapshot.val().frequncy;

    var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequncy),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
    );

    $("#train-table > tbody").append(newRow);
});