(function init() {
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
        var now = moment();
        var firstTrainTime = moment(train.firstTrainTime, 
          "HH:mm");
        
        var firstTrainTimeToNow = moment().diff(firstTrainTime, "minutes");
        var remainingTime = firstTrainTimeToNow % train.frequency;
        var minutesAway = train.frequency - remainingTime;

        var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
      

        var html = `<tr>
                      <td>${train['train name']}</td>
                      <td>${train['destination']}</td>
                      <td>${train['frequency']}</td>
                      <td>${nextArrival}</td>
                      <td>${minutesAway}</td>
                    </tr>`;


        $('.table tbody').append(html);
      })
      
    })
  }

  function setTrainData() {
    var trainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var frequency = $('#frequency').val().trim();
    var firstTrainTime = $('#first-train-time').val().trim();


    database.ref(`trains/${trainName}`).set({
      "train name": trainName,
      "destination": destination,
      "frequency": frequency,
      "firstTrainTime": firstTrainTime
    });
  }
  initFirebase();
  getTrainData();

  $('#submit-btn').on('click', setTrainData);
})();