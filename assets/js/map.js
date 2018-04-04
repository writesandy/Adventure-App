'use strict';

let map;
let infoWindow;
let request;
let service;
let markers = [];
let marker;

function initialize() {
    let center = new google.maps.LatLng(44.986656, -93.258133);
    map = new google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 15
    });

    request = {
        location: center,
        radius: 2000,
        types: ['restaurant']
    };
    infoWindow = new google.maps.InfoWindow();
    
    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    google.maps.event.addListener(map, 'dragend', function(event) {
        map.setCenter(event.latLng)
        clearResults(markers)

        let request = {
            location: event.latLng,
            radius: 2000,
            types: ['restaurant']
        };
        service.nearbySearch(request, callback);
    })
}

function callback(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK){
        for (var i = 0; i < results.length; i++){
            markers.push(createMarker(results[i]));
        }
    }
}

function createMarker(place) {
    const placeLoc = place.geometry.location;
    marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addDomListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
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