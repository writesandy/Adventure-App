'use strict';

let map;
let infoWindow;
let request;
let service;
let markers = [];
let marker;
let pos;
let newRequest;

function initialize() {

    // definitions
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 44.986656, lng: -93.258133},
        zoom: 13,
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
    request = {
        location: map.getCenter(),
        radius: 5000,
        types: ['restaurant']
    };
    // service.nearbySearch(request, callback);

    // recenter map
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
                types: ['restaurant']
            };
            service.nearbySearch(newRequest, callback);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        }


    google.maps.event.addListener(map, 'dragend', function(event) {
        map.setCenter(event.latLng)
        clearResults(markers)
        let request = {
            location: event.latLng,
            radius: 5000,
            types: ['restaurant']
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

function createMarker(place) {
    let iconImage    = new google.maps.MarkerImage(place.icon, null, null, null, new google.maps.Size(32, 32));
    const placeLoc = place.geometry.location;
    marker = new google.maps.Marker({
        map: map,
        icon: iconImage,
        position: place.geometry.location
    });
    google.maps.event.addDomListener(marker, 'click', function() {
        infoWindow.setContent(place.name + '<br>' + place.icon + '<br>' + place.formatted_address + '<br>' + place.place_id);
        infoWindow.open(map, this);
    });
    return marker;
}
function clearResults(markers) {
    for (let m in markers) {
        markers[m].setMap(null)
    }
    markers = []
}
google.maps.event.addDomListener(window, 'load', initialize);