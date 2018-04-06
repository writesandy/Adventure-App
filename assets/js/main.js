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
    let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "&key=AIzaSyAJ1giei1E95OkC-K2gtHTnzXapNSQLWqw";
    let latitude = "";
    let longitude = "";
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
      success: function(response){
      console.log(response);
          latitude = response.results[0].geometry.location.lat;
          longitude= response.results[0].geometry.location.lng;
          console.log("Lat = "+latitude+"- Long = "+longitude);
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
  let eventfulAPI = "pz73k49VfxrJv6Mf"; // replace this with a database reference to hide our API key
  let searchTerms = "rock";
  let eventQueryURL = `http://api.eventful.com/json/events/search?app_key${eventfulAPI}&q=${searchTerms}`;


  }
  });