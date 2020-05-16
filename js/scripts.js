// JavaScript
// APIs

$(document).ready(function () {

    $("#page2").hide();
    
    // on current location button click
    $("#currentLoc").click(function (event){
        
        $("#page1").hide();
        $("#page2").show();
        
        // call function to get location after showing page 2
        getLocation();
            
    }); // close click function

    // on form submit button click
    $("#submit").click(function (event){

        // get data from form
        var locSuburb = document.getElementById("suburbField").value;
        var locStateCode = document.getElementById("stateField").value;
        var locPC = document.getElementById("pcField").value;
        
        // call autocomplete function for suburb input
//        autocomplete();
        
        $("#page1").hide();
        $("#page2").show();

        // call loadFormData function
        loadFormData(locSuburb, locStateCode, locPC);
        
    }); // close click function

}); // close document ready


// --- FUNCTIONS --- //

// FUNCTION to GET LOCATION DATA on PAGE 2 LOAD
function getLocation() {
            
    var newLocation = "";

    if (navigator.geolocation) {

        // FUNCTION for SUCCESS
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
            
            // call function to get population data from AEC API
            getElectoralData(coords);

        } // close success function

        // FUNCTION for ERROR
        function error(err) {

            // display error
            console.log(err);
            
            $("#current").html("You're currently viewing the suburb of");

            // default location is Canberra lat long
            var defaultLocation = "-35.3156,149.1442";

            // get weather data for default location
            getWeatherData(defaultLocation);

            // display default location
            var locSuburb = "Kingston";
            var locState = "Australian Capital Territory";
            var locStateCode = "ACT";
            var locPC = "2604";
            
            $("#location").append(locSuburb);
            $("#state").html(locState + " (" + locStateCode + ")");
            $("#postcode").html(locPC);
            $(".locName").html(locSuburb);
            $("#coords").html(defaultLocation);

            // call function to get suburb data from Wikipedia API
            getSuburbData(locSuburb, locState, locPC);

            // call function to get suburb profile data from Domain API
            getProfileData(locSuburb, locStateCode, locPC, newLocation);
    
            // call function to get place data from ACTmapi API
            getPlaceData(locSuburb);

        } // close error function

        // trigger the browser prompt
        navigator.geolocation.getCurrentPosition(success, error);

    } // close if statement

} // close getLocation function


// FUNCTION to PASS DATA from PAGE 1 FORM to PAGE 2
function loadFormData(locSuburb, locStateCode, locPC) {

    console.log(locSuburb);
    console.log(locStateCode);
    console.log(locPC);
    
    // declare locState based on locState value
    var locState = "Australian Capital Territory";
            
    $("#current").html("You're currently viewing the suburb of");
    
    // append location to data to page 2
    $("#location").append(locSuburb);
    $("#location").css("text-transform", "capitalize");
    $("#state").html(locState + " (" + locStateCode + ")");
//        $("#district").append(locDistrict);
    $("#postcode").html(locPC);
    $(".locName").html(locSuburb);
    
    // call function to get coordinates from Open Cage API
    getLatLong(locSuburb, locState, locStateCode, locPC);

} // close getFormData function


// FUNCTION to get LOCATION NAME from OPEN CAGE API
function getLocationName(latLongCoords) {

    console.log("loading Open Cage data");

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
        $("#state").html(locState + " (" + locStateCode + ")");
//        $("#district").append(locDistrict);
        $("#postcode").html(locPC);
        $(".locName").html(locSuburb);
        
        // call function to get suburb data from Wikipedia API
        getSuburbData(locSuburb, locState, locPC);
            
        // call function to get suburb profile data from Domain API
        getProfileData(locSuburb, locStateCode, locPC);
    
        // call function to get place data from ACTmapi API
        getPlaceData(locSuburb);
            
        // call function from Google API
//        getGoogleData(locSuburb, locState, locPC);

    }); // close getJSON

} // close getLocationName function


// FUNCTION to get LOCATION COORDINATES from OPEN CAGE API
function getLatLong(locSuburb, locState, locStateCode, locPC) {

    console.log("loading Open Cage data");

    // my Open Cage Data API key
    var keyOpenCage = "135d8af66fb04c9bac0092208a55e2a7";

    // Open Cage Data API call
    var urlGeocode = "https://api.opencagedata.com/geocode/v1/json?q=" + locSuburb + "," + locState + "," + locPC + "&key=" + keyOpenCage;
    
    // make request to server using Open Cage API call
    $.getJSON(urlGeocode, function (locationData) {

//        console.log(locationData.results[0]);

        var locLat = locationData.results[0].bounds.southwest.lat;
        var locLong = locationData.results[0].bounds.southwest.lng;
        var currentLocation = locLat + "," + locLong;
    
        // append location to data to html
        $("#coords").html(currentLocation);
        
        // call function to get temperature data from Dark Sky API
        getWeatherData(currentLocation);
        
        // call function to get suburb data from Wikipedia API
        getSuburbData(locSuburb, locState, locPC);
            
        // call function to get suburb profile data from Domain API
        getProfileData(locSuburb, locStateCode, locPC);
    
        // call function to get place data from ACTmapi API
        getPlaceData(locSuburb);

    }); // close getJSON

} // close getLocationName function


// FUNCTION to get CURRENT TEMP from DARK SKY API
function getWeatherData(currentLocation) {
    
    console.log("loading Dark Sky data");

    // my Dark Sky API key
    var keyDarkSky = "008bf272749fe7c833b4606af967ab5e";

    // Dark Sky API call
    var urlDarkSky = "https://api.darksky.net/forecast/" + keyDarkSky + "/" + currentLocation + "?units=auto&callback=?";
    
    // make request to server using Dark Sky API call
    $.getJSON(urlDarkSky, function (data) {
    
        var temp = data.currently.temperature;
    
        // TEMPERATURE
        $("#temp").html(temp.toFixed(1));
        
    }); // close getJSON

} // close getWeatherData function


// FUNCTION to load data from AEC API
function getElectoralData(coords) {

    // Data AEC API call
//    var urlAec = "https://data.gov.au/data/dataset/8edfead5-009a-434e-90c3-fba58abd7904";
    
    var aecQuery = "https://services1.arcgis.com/E5n4f1VY84i0xSjy/arcgis/rest/services/ACT_Electoral_Boundary/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"

//            console.log(urlAec);

    // make request to server using AEC API call
    $.getJSON(aecQuery, function (data) {

        console.log(data);

        var locElectoral = data[0];

        // add electoral result to html
        $("#subMain .dataTableRow #electorate").html(locElectoral);

    }); // close getJSON

} // close getElectoralData function


// FUNCTION to get SUBURB DATA from ACTMAPI API
function getPlaceData(locSuburb){
    
    var placeNames = "https://data.actmapi.act.gov.au/arcgis/rest/services/actmapi/PlaceNames/MapServer/find?searchText=" + locSuburb + "&contains=true&searchFields=Name&sr=&layers=None&layerDefs=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&dynamicLayers=&returnZ=true&returnM=true&gdbVersion=&historicMoment=&returnUnformattedValues=true&returnFieldName=true&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&f=pjson";
    
    $.getJSON(placeNames, function (data) {
        
        console.log("loading ACTmapi data");
//        console.log(data);
        
        // get last item of array
        var placeString = data.results[data.results.length-1].attributes.DESCRIPTION;
        
        // split placeString and store as array
        var placeData = placeString.split("<br>");
        
        var surname = placeData[0].replace("Feature Name: ","");
        var givenNames = placeData[2].replace("Given Names: ","");
        var namesake = givenNames + " " + surname;
        var title = placeData[3].replace("Title: ","");
        var birth = placeData[5].replace("Birth Year: ","");
        var death = placeData[6].replace("Death Year: ","");
        var bioString = placeData[placeData.length-1].replace("Biography: ","");
        
        // split bioString and store as array
        var bio = bioString.split("; ");
        
//        console.log(bio);
        
        $("#nsBio").html("");
        
        // for loop to make each instance of string to format on new line
        for (var i = 0; i < bio.length; i++){
            
            $("#nsBio").append("<li class='list'>" + bio[i] + ".</li>");
            
        };
        
//        console.log(bio);
        
//        console.log(placeData);
        $("#nsName").html(namesake);
        $("#nsTitle").html(title);
//        $("#nsBio").html(bio);
        $("#nsLife").html(birth + "-" + death);
        
        // call function to get namsake image from Wikipedia API
        getNamesakeImage(namesake);

    }); // close getJSON
    
} // close getPlaceData function


// FUNCTION to get NAMESAKE IMAGE from WIKIPEDIA API
function getNamesakeImage(namesake) {

    var wikiNamesakeSearch = "https://en.wikipedia.org/w/api.php?action=query&list=search&srprop&srsearch=" + namesake + "&prop=extracts&format=json" + "&origin=*";

    // make request to server using Wikipedia API call
    $.getJSON(wikiNamesakeSearch, function (wikiData) {
        
//        console.log(wikiData);
        
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
            
            console.log("loading Wikipedia namesake image");
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


// FUNCTION to get SUBURB SUMMARY from WIKIPEDIA API
function getSuburbData(locSuburb, locState, locPC, namesake) {
    
//    console.log(locSuburb + " " + locState + " " + locPC);

    var wikiSearch = "https://en.wikipedia.org/w/api.php?action=query&list=search&srprop&srsearch=" + locSuburb + "," + locState + "," + locPC + "&prop=extracts&format=json" + "&origin=*";
    
//    console.log(wikiSearch);

    // make request to server using Wikipedia API call
    $.getJSON(wikiSearch, function (wikiData) {

        console.log("loading Wikipedia location data");
//        console.log(wikiData);
        
        // create variable to hold suburb info
        // this is the first result in the array
        var suburb = wikiData.query.search[0];

        // get Wikipedia search result page ID and title to get content
        var wikiPageId = suburb.pageid;
        var wikiPageTitle = suburb.title;
        
        var wikiPage = "https://en.wikipedia.org/w/api.php?action=parse&pageid=" + wikiPageId + "&format=json" + "&origin=*";
        
        var wikiPageIntro = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + wikiPageTitle + "&origin=*";
        
        $.getJSON(wikiPageIntro, function (wikiIntro) {
            
            console.log("loading Wikipedia intro data");
//            console.log(wikiIntro);
           
            // add summary to html
            $("#summary").html(wikiIntro.query.pages[wikiPageId].extract);
            
        });
        
        $.getJSON(wikiPage, function (wikiSuburb) {
            
            console.log("loading Wikipedia suburb image");
            
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


// FUNCTION to get SUBURB DATA from DOMAIN API
function getProfileData(locSuburb, locStateCode, locPC) {

    // my Domain API key
    var keyDomain = "key_845f270a8ad388a68456361972c842bf";

    // Domain API call
    var domainSearch = "https://api.domain.com.au/v1/addressLocators?searchLevel=Suburb&suburb=" + locSuburb + "&state=" + locStateCode + "&postcode=" + locPC + "&api_key=" + keyDomain;
    
//    console.log(domainSearch);
    
    // make request to server using Domain API call
    $.getJSON(domainSearch, function (domainData) {
        
//        console.log(domainData);
    
        var suburbId = domainData[0].ids[0].id;

//        console.log(suburbId);
            
        var urlDomain = "https://api.domain.com.au/v1/locations/profiles/" + suburbId + "?api_key=" + keyDomain;
    
        var domainDemo = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&api_key=" + keyDomain;
        
        $.getJSON(urlDomain, function (domainData) {
        
            console.log("loading Domain data");
            console.log(domainData);

            var districtData = domainData.areaName;
            var regionData = domainData.regionName;
            var popData = domainData.data.population;
            var age = domainData.data.mostCommonAgeBracket;
            var fams = domainData.data.marriedPercentage;
            
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

                // create new list item for each suburb
                var list = $("<li class='surroundSubs'></li>");
                
                $("#surroundsInfo").append(list);
                list.append(surroundSubs.name);

            } // close for loop

            // append data to html
            $("#district").html(districtData);
            $("#region").html(regionData);
            $("#population").html(thou(popDataNum));
            $("#age").html(age);
            $("#fams").html((fams *100).toFixed(0) + "%");
            
            // get occupation data
            var domainOcc = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&types=Occupation&year=2016" + "&api_key=" + keyDomain;
            
            $.getJSON(domainOcc, function (domainData) {

//                console.log(domainData);

                var avOcc = domainData.demographics[0].items[domainData.demographics[0].items.length-1].label;
                
                $("#occ").html(avOcc);
                
            });
            
            // get employment data
            var domainEmploy = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&types=16&year=2016" + "&api_key=" + keyDomain;
            
            $.getJSON(domainEmploy, function (domainData) {

//                console.log(domainData);

                var employ = domainData.demographics[0].items[domainData.demographics[0].items.length-1].label;
                
                $("#employ").html(employ);
                
            });
            
            // get family composition data
            var domainFamComp = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&types=FamilyComposition&year=2016" + "&api_key=" + keyDomain;
            
            $.getJSON(domainFamComp, function (domainData) {

//                console.log(domainData);

                var famComp = domainData.demographics[0].items[domainData.demographics[0].items.length-1].label;
                
                $("#famComp").html(famComp);
                
            });
            
            // get country data
            var domainCountry = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&types=CountryOfBirth&year=2016" + "&api_key=" + keyDomain;
            
            $.getJSON(domainCountry, function (domainData) {

//                console.log(domainData);

                var country = domainData.demographics[0].items[domainData.demographics[0].items.length-1].label;
                
                $("#country").html(country);
                
            });
            
            // get religion data
            var domainReligion = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&types=Religion&year=2016" + "&api_key=" + keyDomain;
            
            $.getJSON(domainReligion, function (domainData) {

//                console.log(domainData);

                var religion = domainData.demographics[0].items[domainData.demographics[0].items.length-1].label;
                
                $("#religion").html(religion);
                
            });
            
            // get education data
            var domainEducation = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&types=EducationAttendance&year=2016" + "&api_key=" + keyDomain;
            
            $.getJSON(domainEducation, function (domainData) {

//                console.log(domainData);

                var edu = domainData.demographics[0].items[domainData.demographics[0].items.length-1].label;
                
                $("#edu").html(edu);
                
            });
            
            // get transport data
            var domainTransport = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&types=TransportToWork&year=2016" + "&api_key=" + keyDomain;
            
            $.getJSON(domainTransport, function (domainData) {

//                console.log(domainData);

                var transport = domainData.demographics[0].items[domainData.demographics[0].items.length-1].label;
                
                $("#transport").html(transport);
                
            });
            
            // get marital status data
            var domainMarital = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&types=MaritalStatus&year=2016" + "&api_key=" + keyDomain;
            
            $.getJSON(domainMarital, function (domainData) {

//                console.log(domainData);

                var marital = domainData.demographics[0].items[domainData.demographics[0].items.length-1].label;
                
                $("#marital").html(marital);
                
            });
            
            // get occupancy data
            var domainOccupancy = "https://api.domain.com.au/v1/demographics?level=Suburb&id=" + suburbId + "&types=NatureOfOccupancy&year=2016" + "&api_key=" + keyDomain;
            
            $.getJSON(domainOccupancy, function (domainData) {

//                console.log(domainData);

                var occupancy = domainData.demographics[0].items[domainData.demographics[0].items.length-1].label;
                
                $("#occupancy").html(occupancy);
                
            });
    
//            $.getJSON(domainDemo, function (domainData) {
//
////                console.log(domainData);
////                
//                var schools = "https://api.domain.com.au/v1/locations/schools?coordinate=" + document.getElementById("coords").value + "&api_key=" + keyDomain;
//                
//                $.getJSON(schools, function (domainData) {
//                    
////                    console.log(domainData);
//                    
//                }); // close getJSON
//
//            }); // close getJSON
            
        }); // close getJSON
        
    }); // close getJSON

} // close getProfileData function


// FUNCTION to load data from Google Search API
//function getGoogleData(locSuburb, locState, locPC){
//    
//    var keyGoogle = "AIzaSyCCy1xoop4IL-HQxJPMjuzMYt9Xf7SUg1E";  
//    var searchId = "008379666768099928482:0rfqenjzl81";
//    var urlGoogle = "https://www.googleapis.com/customsearch/v1?key=" + keyGoogle + "&cx=" + searchId + "&q=" + locSuburb + ",_" + locState + "%20" + locPC;
//    
//    console.log(urlGoogle);
//    
//    // make request to server using Google API call
//    $.getJSON(urlGoogle, function (data) {
//     
////        console.log(data);
//        
//    }); // close getJSON
//    
//} // close getGoogleData function