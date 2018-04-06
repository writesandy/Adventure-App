});

$('#getAdventure').on("click", function (event) {
event.preventDefault();
let zip = $(".zipCode").val().trim();
postal.push(zip);
// console.log(zip);
getCoordinates(zip);
});

$.ajax({
    url: "http://app.ticketmaster.com/discovery/v2/events.json?apikey=XAA9GAy5LE9aJmQz6mGBXNGqUe39qAgQ",
    method: "GET",
    dataType: "json",
    success: function(results){
        console.log("ticketmaster API return: " + results);
    }});

// end ticketmaster ajax call workspace 