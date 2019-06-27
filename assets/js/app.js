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
  /** TODO : Clean up doubles when adding new train - whole list gets re-added and ends up with duplicates **/
  
  function getTrainData() {

    var trainRef = firebase.database().ref();
    trainRef.on("value", function (snapshot) {
      if (!snapshot.child("trains").exists()) {
        var html = `
        <tr><td colspan="5" class="text-light">
          <h3 class="text-center">Sorry, no trains today</h3>
          <h6 class="text-center">Have you thought about buying a car? I hear they're quite popular…</h6>
        </tr></td>
        `;
        $('.table tbody').append(html);
        return;
      }
      var trains = snapshot.val().trains;

      Object.values(trains).forEach(function (train) {
        console.log(
            Math.ceil(train['minutes away'])
        );
        var html = `<tr>
                      <td>${train['train name']}</td>
                      <td>${train['destination']}</td>
                      <td>${train['frequency']}</td>
                      <td>${train['next arrival']}</td>
                      <td>${train['minutes away']}</td>
                    </tr>`;


        $('.table tbody').append(html);
      })
      
    })
  }

  function setTrainData() {
    var trainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var frequency = $('#frequency').val().trim();
    var firstTrainTime = moment($('#first-train-time').val().trim(), "HH:mm");
    var nextArrival = moment().subtract(firstTrainTime);
    var minutesAway = moment().diff(moment(firstTrainTime), "minutes");
    console.log(firstTrainTime);
    
    console.log(trainName, destination, frequency, firstTrainTime, minutesAway);

    // database.ref(`trains/`).set({
    //   "train name": trainName,
    //   "destination": destination,
    //   "frequency": frequency,
    //   "next arrival": nextArrival,
    //   "minutes away": minutesAway
    // });
    console.log("train name", trainName, '\n', "destination", destination, '\n', "frequency", frequency, '\n', "next arrival", nextArrival, '\n', "minutes away", minutesAway);
  }
  initFirebase();
  getTrainData();

  $('#submit-btn').on('click', setTrainData);
})();