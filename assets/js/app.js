(function init() {
  console.log('here we go!');
  var database;

  function initFirebase() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDm0rLy3Z_sQM_SA7jHMm1Ycc0Mn53zkhE",
      authDomain: "train-schedule-de436.firebaseapp.com",
      databaseURL: "https://train-schedule-de436.firebaseio.com",
      projectId: "train-schedule-de436",
      storageBucket: "",
      messagingSenderId: "167082838875",
      appId: "1:167082838875:web:a9a39d8faa2d1902"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
  }

  function getTrainData() {
    var trainRef = firebase.database().ref('trains/');
    
    trainRef.on("value", function(snapshot) {
      console.log('snapshot : ' + snapshot.val());
    })
  }

  function setTrainData() {
    var trainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var frequency = $('#frequency').val().trim();
    var nextArrival = $('#next-arrival').val().trim();
    var minutesAway = $('#minutes-away').val().trim();

    console.log(trainName, destination, frequency, nextArrival, minutesAway);

    database.ref(`trains/${trainName}`).set({
      "Train Name": trainName,
      "destination": destination,
      "frequency": frequency,
      "Next Arrival": nextArrival,
      "Minutes Away": minutesAway
    });
  }

  initFirebase();
  getTrainData();

  $('#submit-btn').on('click', setTrainData);
})();