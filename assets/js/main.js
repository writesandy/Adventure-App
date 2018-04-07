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

  let eventfulAPI = "";
  let geoCodeKey="";

  firebase.initializeApp(config);
//   console.log("firebase database connection initialized");
  
  const database = firebase.database();
//   console.log("Local database variable assigned");

// Variables for bringin in long/lat from Google Geocoding API

  let category = [];
  let postal = [];
  let zipCode = $(this).attr("data-name");
  let returnZip = "";

//checked the queryURL and it does bring back a value. Still working on working ajax call

  function getCoordinates(zipCode) {
    
    // read the value of gck from the database
    database.ref().on("value", function(snapshot) {
      let geoCodeKey = snapshot.val().gck;
    //   console.log("gck is " + geoCodeKey);
      return geoCodeKey;
    });
    let queryURL = "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" + zipCode + "&key=" + geoCodeKey;
    let latitude = "";
    let longitude = "";
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
      success: function(response){
    //   console.log(response);
            latitude = response.results[0].geometry.location.lat;
            longitude= response.results[0].geometry.location.lng;
            // console.log("Lat = "+latitude+"- Long = "+longitude);
            returnZip = latitude + " " + longitude;
            // console.log("returnzip inside the func is " + returnZip);
            map.setCenter({lat: latitude, lng: longitude});
            google.maps.event.addListener(map,'bounds_changed', function(event) {
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
                // puts the locations on the map
                service.nearbySearch(request, callback);           
            })
      }
    });
  }

  $(function() {
    $("form").submit(function() { return false; });
    });

    $('#pageSubmenu').on('click', function (event){
        event.preventDefault();
    });

    $('#getAdventure').on("click", function (event) {
    event.preventDefault();
    let zip = $(".zipCode").val().trim();
    if ($.isNumeric(zip)) {
        return true
    }
    else {
        alert("Please enter your number for a zip code")
    }
    postal.push(zip);
    // console.log(zip);
    getCoordinates(zip);
    $('.zipCode').val('');

    });
      
    $.ajax({
        url: "http://app.ticketmaster.com/discovery/v2/events.json?apikey=XAA9GAy5LE9aJmQz6mGBXNGqUe39qAgQ",
        method: "GET",
        dataType: "json",
        success: function(results){
            console.log("ticketmaster API return: " + results);
        }});
    
    // end ticketmaster ajax call workspace 
});

let map;
let infoWindow;
let request;
let service;
let markers = [];
let marker;
let pos;
let newRequest;
let callback;


function initialize() {
// console.log('map loaded');
    // definitions
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.986656, lng: -93.258133},
        zoom: 13,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#172436'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#768B8E'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#000000'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#aaaaaa'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
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
    //   console.log(event);
        map.getCenter()
    //   console.log(map.getCenter());
        clearResults(markers)
        let request = {
            location: map.getCenter(),
            radius: 5000,
            types: ['museum']
        };
        service.nearbySearch(request, callback);
        return service.nearbySearch(request, callback);

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
//   let iconImage    = new google.maps.MarkerImage(place.icon, null, null, null, new google.maps.Size(32, 32));
    let iconImage = new google.maps.MarkerImage('./assets/img/icon1.png', null, null, null, new google.maps.Size(45, 45));
    const placeLoc = place.geometry.location;
    marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: iconImage,
    });
    //opens the infoWindow to show name and other information
    google.maps.event.addDomListener(marker, 'click', function() {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    //   console.log(place);

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


