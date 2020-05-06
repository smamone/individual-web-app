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
        var locStateStr = locationComponent.state;
        var locState = locationComponent.state + " (" + locStateCode + ")";
        var locDistrict = locationComponent.county;
        var locPC = locationComponent.postcode;
    
        // append location to data to html
        $("#location").append(locSuburb);
        $("#state").append(locState);
//        $("#district").append(locDistrict);
        $("#postcode").append(locPC);
        $(".suburb span").append(locSuburb);
        
        // call function to get suburb data from Wikipedia API
        getSuburbData(locSuburb, locStateStr, locPC);
            
        // call function to get suburb profile data from Domain API
        getProfileData(locSuburb, locStateCode, locPC);

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
function getSuburbData(locSuburb, locStateStr, locPC) {
    
    console.log("in get suburb data");
    console.log(locSuburb + " " + locStateStr + " " + locPC);

    var wikiSearch = "http://en.wikipedia.org/w/api.php?action=query&list=search&srprop&srsearch=" + locSuburb + "," + locStateStr + "," + locPC + "&prop=extracts&format=json" + "&origin=*";
    
//    console.log(wikiSearch);

    // make request to server using Wikipedia API call
    $.getJSON(wikiSearch, function (wikiData) {

        console.log("loading wikipedia data");
        console.log(wikiData);
        
        // create variable to hold suburb info
        // this is the first result in the array
        var suburb = wikiData.query.search[0];

        // get Wikipedia search result page ID and title to get content
        var wikiPageId = suburb.pageid;
        var wikiPageTitle = suburb.title;
//        var wikiPageContent = "http://en.wikipedia.org/w/api.php?action=parse&prop=text&page=" + wikiPageTitle + "&format=json" + "&origin=*";
        
//        var wikiIntro = "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + wikiPageTitle + "&format=json" + "&origin=*";
        
        var wikiIntro = "http://en.wikipedia.org/w/api.php?action=parse&pageid=" + wikiPageId + "&format=json" + "&origin=*";
        
        console.log(wikiIntro);
        
        var wikiInfoBox = "https://en.wikipedia.org/w/api.php?action=parse&pageid=" + wikiPageId + "&section=0&prop=wikitext&format=json" + "&origin=*";
        
        console.log(wikiInfoBox);
        
        $.getJSON(wikiIntro, function (wikiSuburb) {
            
            console.log(wikiSuburb);
            
            // get Wikipedia suburb page image            
            var wikiPageImage = "http://en.wikipedia.org/w/api.php?action=query&pageids=" + wikiPageId + "&prop=pageprops&format=json" + "&origin=*";
            
            $.getJSON(wikiPageImage, function (wikiSuburbImage) {
                
                console.log(wikiSuburbImage);

                var wikiImage = wikiSuburbImage.query.pages + "." + wikiPageId + "." + pageprops.page_image_free;

                console.log(wikiImage);

                // append image to html
                $("#suburb .image img").append("src", wikiImage);
            
            }); // close getJSON
            
        }); // close getJSON

    }); // close getJSON

} // close getSuburbData function


// FUNCTION to load data from Domain API
function getProfileData(locSuburb, locStateCode, locPC) {
    
    console.log("in get profile data");

    // my Domain API key
    var keyDomain = "key_845f270a8ad388a68456361972c842bf";

    // Domain API call
    var domainSearch = "https://api.domain.com.au/v1/addressLocators?searchLevel=Suburb&suburb=" + locSuburb + "&state=" + locStateCode + "&postcode=" + locPC + "&api_key=" + keyDomain;
    
//    console.log(domainSearch);
    
    // make request to server using Dark Sky API call
    $.getJSON(domainSearch, function (domainData) {
        
        console.log("loading domain data");
//        console.log(domainData);
    
        var suburbId = domainData[0].ids[0].id;

//        console.log(suburbId);
            
        var urlDomain = "https://api.domain.com.au/v1/locations/profiles/" + suburbId + "?api_key=" + keyDomain;
        
        $.getJSON(urlDomain, function (domainData) {
            
//            console.log(domainData);

            var districtData = domainData.areaName;
            var regionData = domainData.regionName;
            var popData = domainData.data.population;
            
            // loop through the data and add it to the ul
            // new li for each new item
            for (var i = 0; i < domainData.surroundingSuburbs.length; i++) {

                // the data for one suburb
                var surroundSubs = domainData.surroundingSuburbs[i];

                // create new li for each suburb
                var listTr = $("<tr class='secTableRow'>");

                // to add to each list item
                var listTd = $("<td class='surroundSubs'></td>");
                
                $("#subSecInfo").append(listTr);
                listTr.append(listTd);
                listTd.append(surroundSubs.name);

            } // close for loop

            // append data to html
            $("#district").append(districtData);
            $("#region").html(regionData);
            $("#population").html(popData);
            
        }); // close getJSON
        
    }); // close getJSON

} // close getProfileData function


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