// Initialize Firebase
 var config = {
    apiKey: "AIzaSyCaerYVn8Mcr-gem10ULkmQyHLa-zvJEHw",
    authDomain: "train-scheduler-b9f47.firebaseapp.com",
    databaseURL: "https://train-scheduler-b9f47.firebaseio.com",
    projectId: "train-scheduler-b9f47",
    storageBucket: "train-scheduler-b9f47.appspot.com",
    messagingSenderId: "276356096716"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  
  $("#addtrain").on("click", function(event){

    event.preventDefault();

  	var trName = $("#train-name").val().trim();
  	var desName = $("#dest-name").val().trim();
    var trTime = $("#train-time").val().trim();
    var freq = $("#frequency").val().trim();
    
    var trainInfo =  {

      tName: trName,
      dName: desName,
      tTime: trTime,
      frequency: freq

    }

    database.ref().push(trainInfo);


    console.log(trainInfo.tName);
    console.log(trainInfo.dName);
    console.log(trainInfo.tTime);
    console.log(trainInfo.frequency);

    alert("New Trian Added");

    $("#train-name").val("");
    $("#dest-name").val("");
    $("#train-time").val("");
    $("#frequency").val("");

    return false;
  
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    var trNameSnap = childSnapshot.val().tName;
    var destNameSnap = childSnapshot.val().dName;
    var trTimeSnap = childSnapshot.val().tTime;
    var frequencySnap = childSnapshot.val().frequency;

    console.log(trNameSnap);
    console.log(destNameSnap);
    console.log(trTimeSnap);
    console.log(frequencySnap);


    var firstTimeConvert = moment(trTimeSnap, "hh:mm").subtract(1, "years");

    var timeDifference = moment().diff(moment(firstTimeConvert), "minutes");

    var minutesTillNextTrain = (frequencySnap - (timeDifference % frequencySnap));

    var timeOfNextTrain = moment(timeOfNextTrain).add(minutesTillNextTrain,"minutes").format("hh:mm a");

    $("#trainScheduleTable > tbody").append("<tr><td>" + trNameSnap + "</td><td>" + destNameSnap + "</td><td>" + frequencySnap + 
          "</td><td>" + timeOfNextTrain + "</td><td>" + minutesTillNextTrain + "</td></tr>");


  });






