// JavaScript
// APIs

// empty global variables to store index.html form data
var locSuburb = "";
var locSate = "";
var locPC = "";

$(document).ready(function () {
    
    // on index.html current location button click
    $("#currentLoc").click(function (event){
        
        // load suburb.html
        window.location.href = "suburb.html";
        
        // call function to get location after loading suburb.html
        getLocation();
            
    }); // close click function

    // on index.html form submit button click
    $("#submit").click(function (event){

        // get data from form
        var formData = {
            "suburb" : document.getElementById("suburbField").value,
            "state" : document.getElementById("stateField").value,
            "postcode" : document.getElementById("pcField").value
        }

        localStorage.setItem("formData", JSON.stringify(formData));

        console.log(formData);
        
        // call function to get population data from AEC API
//        getElectoralData(locState);

    //    localStorage.removeItem("suburbData"); // clear localstorage
        
        // call autocomplete function for suburb input
        autocomplete();

        // call loadFormData function
        loadFormData(locSuburb, locSate, locPC);
        
    }); // close getFormData function

}); // close document ready


// --- FUNCTIONS --- //

// FUNCTION to GET LOCATION DATA ON WINDOW LOAD
$(window).on("load", function getLocation() {
            
    var newLocation = "";

    if (navigator.geolocation) {

        function success(pos) {

            var coords = pos.coords;

            // set string for location based on Dark Sky API format
            newLocation = coords.latitude + "," + coords.longitude;

            // write coords to html
            $("#coords").html(newLocation);

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
            
            $("#current").html("You're currently viewing the suburb of");

            // default location is Canberra lat long
            var defaultLocation = "-35.3078,149.1344";

            // get weather data for default location
            getWeatherData(defaultLocation);

            // display default location
            var locSuburb = "Barton";
            var locState = "Australian Capital Territory";
            var locStateCode = "ACT";
            var locPC = "2600";
            
            $("#location").append(locSuburb);
            $("#state").append(locState + " (" + locStateCode + ")");
    //        $("#district").append(locDistrict);
            $("#postcode").append(locPC);
            $(".suburb span").append(locSuburb);

            // call function to get suburb data from Wikipedia API
            getSuburbData(locSuburb, locState, locPC);

            // call function to get suburb profile data from Domain API
            getProfileData(locSuburb, locStateCode, locPC);

        } // close error function

        // trigger the browser prompt
        navigator.geolocation.getCurrentPosition(success, error);

    } // close if statement

}); // close window onload function


// FUNCTION to PASS DATA from index.html form to suburb.html
function loadFormData(locSuburb, locSate, locPC) {

    var getFormData = JSON.parse(localStorage.getItem("formData"));
    
//    console.log(getSuburbData);

    var locSuburb = getSuburbData.suburb;
    var locStateCode = getSuburbData.state;
    var locPC = getSuburbData.postcode;

    console.log(locSuburb);
    console.log(locState);
    console.log(locPC);
    
    // declare locState based on locState value
    if (locStateCode == "ACT"){
        
        var locState = "Australian Capital Territory";
        
    } else if (locStateCode == "NSW"){
        
        var locState = "New South Wales";
        
    } else if (locStateCode == "NT"){
        
        var locState = "Northern Territory";
        
    } else if (locStateCode == "QLD"){
        
        var locState = "Queensland";
        
    } else if (locStateCode == "SA"){
        
        var locState = "South Australia";
        
    } else if (locStateCode == "TAS"){
        
        var locState = "Tasmania";
        
    } else if (locStateCode == "WA"){
        
        var locState = "Western Australia";
        
    };
    
//    console.log(locState);
    
    // append location to data to suburb.html
    $("#location span").append(locSuburb);
    $("#state").append(locStateCode);
//        $("#district").append(locDistrict);
    $("#postcode").append(locPC);
    $(".suburb span").append(locSuburb);
        
    // call function to get suburb data from Wikipedia API
    getSuburbData(locSuburb, locState, locPC);

    // call function to get suburb profile data from Domain API
    getProfileData(locSuburb, locStateCode, locPC);
    
    // call function to get place data from ACTmapi API
    getPlaceData(locSuburb);
    
    // load suburb.html
    location.href = "suburb.html";

} // close getFormData function


// FUNCTION to get location name from OPEN CAGE API
function getLocationName(latLongCoords) {

    console.log("in get location name");

    // my Open Cage Data API key
    var keyOpenCage = "135d8af66fb04c9bac0092208a55e2a7";

    // Open Cage Data API call
    var urlGeocode = "https://api.opencagedata.com/geocode/v1/json?q=" + latLongCoords + "&key=" + keyOpenCage;
    
    // make request to server using Open Cage API call
    $.getJSON(urlGeocode, function (locationData) {

//        console.log(locationData.results[0]);

        var locationComponent = locationData.results[0].components;
        var locSuburb = locationComponent.suburb;
        var locStateCode = locationComponent.state_code;
        var locState = locationComponent.state;
//        var locStateStr = locationComponent.state + " (" + locStateCode + ")";
        var locDistrict = locationComponent.county;
        var locPC = locationComponent.postcode;
    
        // append location to data to html
        $("#location").append(locSuburb);
        $("#state").append(locState);
//        $("#district").append(locDistrict);
        $("#postcode").append(locPC);
        $(".suburb span").append(locSuburb);
        
        // call function to get suburb data from Wikipedia API
        getSuburbData(locSuburb, locState, locPC);
            
        // call function to get suburb profile data from Domain API
        getProfileData(locSuburb, locStateCode, locPC);
    
        // call function to get place data from ACTmapi API
        getPlaceData(locSuburb);

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

} // close getWeatherData function


// FUNCTION to load data from AEC API
function getElectoralData(locSuburb) {

    // Data AEC API call
    var urlAec = "https://data.gov.au/data/dataset/8edfead5-009a-434e-90c3-fba58abd7904";

//            console.log(urlAec);

    // make request to server using AEC API call
    $.getJSON(urlAec, function (data) {

        console.log(data);

//        var locElectoral = data[0];

        // add electoral result to html
//        $("#subMain .dataTableRow #population").html(locPop);

    }); // close getJSON

} // close getElectoralData function


// FUNCTION to load suburb data from ACTmapi API
function getPlaceData(locSuburb){
    
    var placeNames = "https://data.actmapi.act.gov.au/arcgis/rest/services/actmapi/PlaceNames/MapServer/find?searchText=" + locSuburb + "&contains=true&searchFields=Name&sr=&layers=None&layerDefs=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&dynamicLayers=&returnZ=true&returnM=true&gdbVersion=&historicMoment=&returnUnformattedValues=true&returnFieldName=true&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=pjson";
    
    $.getJSON(placeNames, function (data) {
        
//        console.log(data);
        
        var placeString = data.results[1].attributes.DESCRIPTION;
        
        // split placeString and store as array
        var placeData = placeString.split("<br>");
        
        var surname = placeData[0].replace("Feature Name: ","");
        var givenNames = placeData[2].replace("Given Names: ","");
        var namesake = givenNames + " " + surname;
        var birth = placeData[4].replace("Birth Year: ","");
        var death = placeData[5].replace("Death Year: ","");
        var bioString = placeData[7].replace("Biography: ","");
        
        // split bioString and store as array
        var bio = bioString.split("; ");
        
        // for loop to replace each instance of string to format on new line
        for (var i = 0; i < bio.length; i++){
            
            bio[i] + ".<br>";
            
        };
        
        console.log(bio);
        
//        console.log(placeData);
        $("#nsName").html(namesake);
        $("#nsBio").html(bio);
        $("#nsLife").html(birth + "-" + death);
        
        // call function to get namsake image from Wikipedia API
        getNamesakeImage(namesake);

    }); // close getJSON
    
} // close getPlaceData function


// FUNCTION to load namesake image from WIKIPEDIA API
function getNamesakeImage(namesake) {

    var wikiNamesakeSearch = "https://en.wikipedia.org/w/api.php?action=query&list=search&srprop&srsearch=" + namesake + "&prop=extracts&format=json" + "&origin=*";

    // make request to server using Wikipedia API call
    $.getJSON(wikiNamesakeSearch, function (wikiData) {
        
        console.log(wikiData);
        
        // create variable to hold namesake info
        // this is the first result in the array
        var name = wikiData.query.search[0];

        // get Wikipedia search result page ID and title to get content
        var wikiPageId = name.pageid;
        var wikiPageTitle = name.title;
        
//        console.log(wikiPageId);
//        console.log(wikiPageTitle);
        
        var wikiIntro = "https://en.wikipedia.org/w/api.php?action=parse&pageid=" + wikiPageId + "&format=json" + "&origin=*";
        
        // make request to server using Wikipedia API call
        $.getJSON(wikiIntro, function (wikiSuburb) {
            
//            console.log(wikiSuburb);
            
            // get Wikipedia suburb page image
            var wikiImage = wikiSuburb.parse.images[0];
            
//            console.log(wikiImage);
                
            // create url to image
            var wikiImageLink = "https://commons.wikimedia.org/wiki/Special:FilePath/" + wikiImage;

            // attribute image to html
            $("#namesakeSection .image img").attr("src", wikiImageLink);
            
        }); // close getJSON

    }); // close getJSON

} // close getSuburbData function


// FUNCTION to load data from WIKIPEDIA API
function getSuburbData(locSuburb, locState, locPC, namesake) {
    
    console.log("in get suburb data");
    console.log(locSuburb + " " + locState + " " + locPC);

    var wikiSearch = "https://en.wikipedia.org/w/api.php?action=query&list=search&srprop&srsearch=" + locSuburb + "," + locState + "," + locPC + "&prop=extracts&format=json" + "&origin=*";
    
//    console.log(wikiSearch);

    // make request to server using Wikipedia API call
    $.getJSON(wikiSearch, function (wikiData) {

        console.log("loading wikipedia data");
//        console.log(wikiData);
        
        // create variable to hold suburb info
        // this is the first result in the array
        var suburb = wikiData.query.search[0];

        // get Wikipedia search result page ID and title to get content
        var wikiPageId = suburb.pageid;
        var wikiPageTitle = suburb.title;
        
        var wikiIntro = "https://en.wikipedia.org/w/api.php?action=parse&pageid=" + wikiPageId + "&format=json" + "&origin=*";
        
        var wikiInfoBox = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + wikiPageTitle + "&origin=*";
        
        var wikiCanSubs = "https://en.wikipedia.org/w/api.php?action=parse&pageid=2524652&format=json&origin=*";
        
        $.getJSON(wikiInfoBox, function (wikiIntroPage) {
            
            console.log(wikiIntroPage);
            
        });
        
        $.getJSON(wikiIntro, function (wikiSuburb) {
            
//            console.log(wikiSuburb);
            
            // get Wikipedia suburb page image
            var wikiImage = wikiSuburb.parse.images[2];
            
//            console.log(wikiImage);
                
            // create url to image
            var wikiImageLink = "https://commons.wikimedia.org/wiki/Special:FilePath/" + wikiImage;

            // attribute image to html
            $("#suburb .image img").attr("src", wikiImageLink);
            
            var wikiPageLinks = "https://en.wikipedia.org/w/api.php?action=parse&pageid=" + wikiPageId + "&prop=links" + "&origin=*";
            
//            console.log(wikiPageLinks);
            
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
            
            // convert population string to number
            var popDataNum = parseInt(popData);
            
            // insert comma for population numbers as required
            function thou(popDataNum){
                var nums = popDataNum.toString().split(".");
                nums[0] = nums[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return nums.join(".");
            };
            
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
            $("#population").html(thou(popDataNum));
            
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