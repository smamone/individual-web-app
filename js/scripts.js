// JavaScript

$(document).ready(function () {

    var newLocation = "";

    // empty variables for suburb and state data to be stored
    var locSuburb = "";
    var locState = "";
    
    if (navigator.geolocation) {

        function success(pos) {

            var coords = pos.coords;

            // set string for location based on Dark Sky API format
            newLocation = coords.latitude + "," + coords.longitude;

            // set string to get location name based on Open Cage API format
            var latLongName = coords.latitude + "+" + coords.longitude;
            
            // call function to get location name from Open Cage API
            getLocationName(latLongName);
            
            // call function to get weather data from Dark Sky API
            getWeatherData(newLocation);
            
            // call function to get suburb data from Wikipedia API
            getSuburbData();

            // call function to get suburb data from TROVE API
//            getTroveData();

        } // close success function

        function error(err) {

            // display error
            console.log(err);

            // default location is Canberra lat long
            var defaultLocation = "-35.28346,149.12807";

            // get weather data for default location
            getWeatherData(defaultLocation);
            
            // display default location
            $("#location").append("Canberra, ACT");

        } // close error function

        // trigger the browser prompt
        navigator.geolocation.getCurrentPosition(success, error);

    } // close if statement

}); // close document ready


// --- FUNCTIONS --- //

// FUNCTION to get location name from OPEN CAGE API
function getLocationName(latLongCoords) {

    console.log("in get location name");

    // my Open Cage Data API key
    var keyOpenCage = "135d8af66fb04c9bac0092208a55e2a7";

    // Open Cage Data API call
    var urlGeocode = "https://api.opencagedata.com/geocode/v1/json?q=" + latLongCoords + "&key=" + keyOpenCage;
        
//        // call function to get image data from Zenserp
//        getImageData();
//
//        // FUNCTION to load data from Zenserp API
//        function getImageData(currentLocation) {
//
//            // my Zenserp API key
//            var keyZen = "be26dcd0-8d08-11ea-af09-817a77962a2c";
//
//            // Zenserp API call
//            var urlZen = "https://app.zenserp.com/api/v2/search?apikey=" + keyZen + "&q=" + locSuburb + "%20" + locStateCode + "&tbm=isch&device=desktop&gl=AU&hl=en&location=Australian%20Capital%20Territory,Australia" + "&callback=?";
//
////            console.log(urlZen);
//
////            console.log(image_results);
//
//            // make request to server using Zenserp API call
//            $.getJSON(urlZen, function (urlZen) {
//
////                var locImage = image_results[0].sourceUrl;
//
//                // add image result to html
////                $("#suburb .image img").attr("src", locImage);
//
//            }); // close getJSON
//
//        } // close getImageData function
    
        // call function to get population data from Data API API
//        getPopData();
//
//        // FUNCTION to load data from Data ACT API
//        function getPopData(locSuburb) {
//
//            // Data ACT API call
//            var urlDataAct = "https://www.data.act.gov.au/resource/kci6-ugxa.json";
//
////            console.log(urlDataAct);
//
////            console.log(image_results);
//
//            // make request to server using Data ACT API call
//            $.getJSON(urlDataAct, function (data) {
//                
//                console.log(data);
//
//                var locPop = data[0];
//
//                // add pop result to html
//                $("#subMain .dataTableRow #population").html(locPop);
//
//            }); // close getJSON
//
//        } // close getPopData function
    
    // make request to server using Open Cage API call
    $.getJSON(urlGeocode, function (locationData) {

//        console.log(locationData.results[0]);

        var locationComponent = locationData.results[0].components;
        var locSuburb = locationComponent.suburb;
        var locStateCode = locationComponent.state_code;
        var locState = locationComponent.state + " (" + locStateCode + ")";
        var locDistrict = locationComponent.county;
        var locPC = locationComponent.postcode;
    
        // append location to data to html
        $("#location").append(locSuburb);
        $("#state").append(locState);
        $("#district").append(locDistrict);
        $("#postcode").append(locPC);

    }); // close getJSON

} // close getLocationName function


// FUNCTION to load data from DARK SKY API
function getWeatherData(currentLocation) {
    
    console.log("in get location data");

    // my Dark Sky API key
    var keyDarkSky = "008bf272749fe7c833b4606af967ab5e";

    // Dark Sky API call
    var urlDarkSky = "https://api.darksky.net/forecast/" + keyDarkSky + "/" + currentLocation + "?units=auto&callback=?";
    
    // make request to server using Dark Sky API call
    $.getJSON(urlDarkSky, function (data) {
    
        var currentTemp = data.currently.temperature;
    
        // TEMPERATURE
        $("#currentTemp span").html(currentTemp.toFixed(1));
        
    }); // close getJSON

} // close getLocationData function


// FUNCTION to load data from WIKIPEDIA API
function getSuburbData(locSuburb, locStateCode) {

    var wikiSearch = "http://en.wikipedia.org/w/api.php?action=query&list=search&srprop&srsearch=" + locSuburb + "," + locStateCode + "&prop=extracts&format=json" + "&origin=*";

    // get Wikipedia search result page ID to get content
    var wikiPageId = wikiSearch.query.search[0].pageid;
    
    console.log(wikiSearch);

    // make request to server using WIKI API call
    $.getJSON(wikiSearch, function (data) {

        console.log("get data in");
        console.log(data);

        // parse Wikipedia content into html
    //        $("#location span").html(data.parse.title);

    }); // close getJSON

} // close getSuburbData function


// FUNCTION to load data from TROVE API
//function getTroveData(currentLocation) {
//    
//    console.log("in get suburb data");
//
//    // my TROVE API key
//    var keyTrove = "not5a0ah8ijuf2al";

    // TROVE API call
//    var urlTrove = "https://api.trove.nla.gov.au/v2/result?key=" + keyTrove + "&zone=all&q=" + locSuburb + " " + locState + " " + "suburb%20history";
//    + "?units=auto&callback=?";
//
//        console.log(data);
//
//        var mySuburbNamesake = data.response.zone[1].records.people[0];
//
//    }); // close getJSON

//} // close getTroveData function


// call the futureSlide function on subSec click
$("#subSecButton").click(subSecSlide);

// FUNCTION to create SLIDER for SECONDARY INFO
function subSecSlide(event) { // function to hide/show secondary table by sliding

    $("#subSecInfo").slideToggle("slow", function(){
        
        $("#subSecButton th span").toggleClass("far fa-times-circle");
        
    }); // toggle the slide show/hide of future div depending on its current state    
    
    if ($("#subSecButton").css("display") == "inline-table") { // if the text of the titleButton heading is equal to Show

        $("#subSecButton").css(
            "border-bottom", "none"
        ); // remove border-bottom
        $("#subSecInfo").css(
            "display", "inline-table"
        ); // change the css display to inline-table

    } else {
        
        $("#subSecButton").css(
            "border-bottom", "0.1em solid #F0F0F0"
        ); // add border-bottom
        $("#subSecInfo").css(
            "display", "none"
        ); // change the css display to none

    } // close if statement
    
} // close futureSlide function