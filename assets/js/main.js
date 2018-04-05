$(document).ready(function() {


  // Initialize Firebase connection
  var config = {
    apiKey: "AIzaSyAfvqfgBdfABlSoNcpqlbJMpmwPHp1vt-E",
    authDomain: "localeventfinder-f4f1f.firebaseapp.com",
    databaseURL: "https://localeventfinder-f4f1f.firebaseio.com",
    projectId: "localeventfinder-f4f1f",
    storageBucket: "localeventfinder-f4f1f.appspot.com",
    messagingSenderId: "107746642812"
  };

  let eventfulAPI = "";
  let geoCodeKey="";

  firebase.initializeApp(config);
  console.log("firebase database connection initialized");
  
  const database = firebase.database();
  console.log("Local database variable assigned");

// Variables for bringin in long/lat from Google Geocoding API

  let category = [];
  let postal = [];
  let zipCode = $(this).attr("data-name");



//checked the queryURL and it does bring back a value. Still working on working ajax call

  function getCoordinates(zipCode) {
    
    // read the value of gck from the database
    database.ref().on("value", function(snapshot) {
      let geoCodeKey = snapshot.val().gck;
      console.log("gck is " + geoCodeKey);
      return geoCodeKey;
    });
    let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "&key=" + geoCodeKey;
   
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
      success: function(results){
      console.log(results);
          // latitude = data.results[0].geometry.location.lat;
          // longitude= data.results[0].geometry.location.lng;
          // alert("Lat = "+latitude+"- Long = "+longitude);
      }

    });


  
  }

      $('#getAdventure').on("click", function (event) {
        event.preventDefault();
        let zip = $(".zipCode").val().trim();
        postal.push(zip);
        console.log(zip);
        getCoordinates(zip);
      });

    
    
  // workspace for eventful API
  function buildEventfulQueryURL(){ 
  database.ref().on("value", function(snapshot) {
    eventfulAPI = snapshot.val().efk;
    let searchTerms = "rock";
    let eventQueryURL = `http://api.eventful.com/json/events/search?app_key${eventfulAPI}&q=${searchTerms}`;
  });
}
buildEventfulQueryURL();
getCoordinates(zipCode);
  });