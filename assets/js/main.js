'use strict';

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
  let eventfulAPI = "pz73k49VfxrJv6Mf"; // replace this with a database reference to hide our API key
  let searchTerms = "rock";
  let eventQueryURL = `http://api.eventful.com/json/events/search?app_key${eventfulAPI}&q=${searchTerms}`;
  };
});

  let map;
  let infoWindow;
  let request;
  let service;
  let markers = [];
  let marker;
  let pos;
  let newRequest;

  function initialize() {
console.log('map loaded');
      // definitions
      map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 44.986656, lng: -93.258133},
          zoom: 12,
      });
      infoWindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(map);

      // init nearbySearch
      function callback(results, status) {
          if(status == google.maps.places.PlacesServiceStatus.OK){
              for (var i = 0; i < results.length; i++){
                  markers.push(createMarker(results[i]));
              }
          }
      }
      //finds the type of place once the user location is determined
      request = {
          location: map.getCenter(),
          radius: 6000,
          types: ['museum'],
      };
      // service.nearbySearch(request, callback);

      // recenter map around user's location
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
              pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              infoWindow.setPosition(pos);
              map.setCenter(pos);

              newRequest = {
                  location: pos,
                  radius: 5000,
                  types: ['museum'],
              };
              service.nearbySearch(newRequest, callback);
          }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
          });
      } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
          }

      // recenter the map and reload the places after the map has been dragged and released
      map.addListener('dragend', function() {
          // google.maps.event.addListener(map, 'dragend', function(event) {

          console.log(event);
          map.getCenter()
          console.log(map.getCenter());
          clearResults(markers)
          let request = {
              location: map.getCenter(),
              radius: 5000,
              types: ['museum']
          };
          service.nearbySearch(request, callback);
      })
  }
  // function callback(results, status) {
  //     if(status == google.maps.places.PlacesServiceStatus.OK){
  //         for (var i = 0; i < results.length; i++){
  //             markers.push(createMarker(results[i]));
  //         }
  //     }
  // }



  //creates a marker for the places
  function createMarker(place) {
      //customization of the icon happens at this line
      let iconImage    = new google.maps.MarkerImage(place.icon, null, null, null, new google.maps.Size(32, 32));
      const placeLoc = place.geometry.location;
      marker = new google.maps.Marker({
          map: map,
          icon: iconImage,
          position: place.geometry.location
      });
      //opens the infoWindow to show name and other information
      google.maps.event.addDomListener(marker, 'click', function() {
          infoWindow.setContent(place.name + '<br>' + place.id);
          infoWindow.open(map, this);
          console.log(place);

      });
      return marker;
  }
  //clears the markers when the map is moved so we don't keep leaving more and more markers
  function clearResults(markers) {
      for (let m in markers) {
          markers[m].setMap(null)
      }
      markers = []
  }
  google.maps.event.addDomListener(window, 'load', initialize);


