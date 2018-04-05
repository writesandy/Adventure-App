$(document).ready(function() {

// Variables for bringin in long/lat from Google Geocoding API

  let category = [];
  let postal = [];
  let zipCode = $(this).attr("data-name");



//checked the queryURL and it does bring back a value. Still working on working ajax call

  function getCoordinates(zipCode) {
    let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "&key=AIzaSyAJ1giei1E95OkC-K2gtHTnzXapNSQLWqw";

    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
      success: function(results){
      console.log(results);
          latitude = data.results[0].geometry.location.lat;
          longitude= data.results[0].geometry.location.lng;
          alert("Lat = "+latitude+"- Long = "+longitude);
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