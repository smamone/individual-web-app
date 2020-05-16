// JavaScript
// Slider

// call the originsSlide function on originsButton click
$("#originsButton").click(originsSlide);

// FUNCTION to create SLIDER for ORIGINS INFO
// function to hide/show subMain table by sliding
function originsSlide(event) {

    $("#originsTable").slideToggle("slow", "linear", function(){
        
        // show up arrow when open
        $("#originsButton th span").toggleClass("fas fa-chevron-up");
        
        // show down arrow when closed
        $("#originsButton th span").toggleClass("fas fa-chevron-down");
        
        // add border-bottom
//        $("#originsButton").css(
//            "border-bottom", "0.1em solid #F0F0F0"
//        );
        
    }); // toggle the slide show/hide of div depending on its current state    
    
    // if the text of the originsButton heading is equal to Show
    if ($("#originsButton").css("display") == "inline-block") {
        
        // remove border-bottom
//        $("#originsButton").css(
//            "border-bottom", "none"
//        );
        
        // change the css display to none
        $("#originsTable").css(
            "display", "inline-block"
        );

    } else {
        
        // change the css display to inline-table
        $("#originsTable").css(
            "display", "none"
        );

    } // close if statement
    
} // close originsSlide function


// call the areaSlide function on areaButton click
$("#areaButton").click(areaSlide);

// FUNCTION to create SLIDER for AREA INFO
// function to hide/show subMain table by sliding
function areaSlide(event) {

    $("#areaTable").slideToggle("slow", "linear", function(){
        
        // show up arrow when open
        $("#areaButton th span").toggleClass("fas fa-chevron-up");
        
        // show down arrow when closed
        $("#areaButton th span").toggleClass("fas fa-chevron-down");
        
        // add border-bottom
//        $("#areaButton").css(
//            "border-bottom", "0.1em solid #F0F0F0"
//        );

    }); // toggle the slide show/hide of div depending on its current state
    
    // if the text of the areaButton heading is equal to Show
    if ($("#areaButton").css("display") == "inline-block") {
        
        // remove border-bottom
//        $("#areaButton").css(
//            "border-bottom", "none"
//        );
        
        // change the css display to none
        $("#areaTable").css(
            "display", "inline-block"
        );

    } else {
        
        // change the css display to inline-table
        $("#areaTable").css(
            "display", "none"
        );

    } // close if statement
    
} // close areaSlide function


// call the demoSlide function on demoButton click
$("#demoButton").click(demoSlide);

// FUNCTION to create SLIDER for DEMO INFO
// function to hide/show subMain table by sliding
function demoSlide(event) {

    $("#demoTable").slideToggle("slow", "linear", function(){
        
        // show up arrow when open
        $("#demoButton th span").toggleClass("fas fa-chevron-up");
        
        // show down arrow when closed
        $("#demoButton th span").toggleClass("fas fa-chevron-down");
        
        // add border-bottom
//        $("#demoButton").css(
//            "border-bottom", "0.1em solid #F0F0F0"
//        );
        
    }); // toggle the slide show/hide of div depending on its current state    
    
    // if the text of the demoButton heading is equal to Show
    if ($("#demoButton").css("display") == "inline-block") {
        
        // remove border-bottom
//        $("#demoButton").css(
//            "border-bottom", "none"
//        );
        
        // change the css display to none
        $("#demoTable").css(
            "display", "inline-block"
        );

    } else {
        
        // change the css display to inline-table
        $("#demoTable").css(
            "display", "none"
        );

    } // close if statement
    
} // close demoSlide function


// call the commonSlide function on commonButton click
$("#commonButton").click(commonSlide);

// FUNCTION to create SLIDER for COMMON INFO
// function to hide/show subMain table by sliding
function commonSlide(event) {

    $("#commonTable").slideToggle(1000, "linear", function(){
        
        // show up arrow when open
        $("#commonButton th span").toggleClass("fas fa-chevron-up");
        
        // show down arrow when closed
        $("#commonButton th span").toggleClass("fas fa-chevron-down");
        
        // add border-bottom
//        $("#commonButton").css(
//            "border-bottom", "0.1em solid #F0F0F0"
//        );
        
    }); // toggle the slide show/hide of div depending on its current state    
    
    // if the text of the commonButton heading is equal to Show
    if ($("#commonButton").css("display") == "inline-block") {
        
        // remove border-bottom
//        $("#commonButton").css(
//            "border-bottom", "none"
//        );
        
        // change the css display to none
        $("#commonTable").css(
            "display", "inline-block"
        );

    } else {
        
        // change the css display to inline-table
        $("#commonTable").css(
            "display", "none"
        );

    } // close if statement
    
} // close commonSlide function


// call the streetsSlide function on surroundsButton click
$("#streetsButton").click(streetsSlide);

// FUNCTION to create SLIDER for STREETS INFO
// function to hide/show secondary table by sliding
function streetsSlide(event) {

    $("#streetsInfo").slideToggle("slow", function(){
        
        // show up arrow when open
        $("#streetsButton th span").toggleClass("fas fa-chevron-up");
        
        // show down arrow when closed
        $("#streetsButton th span").toggleClass("fas fa-chevron-down");
        
        // add border-bottom
        $("#streetsButton").css(
            "border-bottom", "0.1em solid #F0F0F0"
        );
        
    }); // toggle the slide show/hide of div depending on its current state    
    
    // if the text of the surroundsButton heading is equal to show
    if ($("#streetsButton").css("display") == "inline-block") {
        
        // remove border-bottom
        $("#streetsButton").css(
            "border-bottom", "none"
        );
        
        // change the css display to inline-block
        $("#streetsInfo").css(
            "display", "inline-block"
        );

    } else {
        
        // change the css display to none
        $("#streetsInfo").css(
            "display", "none"
        );

    } // close if statement
    
} // close streetsSlide function


// call the surroundsSlide function on surroundsButton click
$("#surroundsButton").click(surroundsSlide);

// FUNCTION to create SLIDER for SURROUNDS INFO
// function to hide/show secondary table by sliding
function surroundsSlide(event) {

    $("#surroundsInfo").slideToggle("slow", function(){
        
        // show up arrow when open
        $("#surroundsButton th span").toggleClass("fas fa-chevron-up");
        
        // show down arrow when closed
        $("#surroundsButton th span").toggleClass("fas fa-chevron-down");
        
        // add border-bottom
        $("#surroundsButton").css(
            "border-bottom", "0.1em solid #F0F0F0"
        );
        
    }); // toggle the slide show/hide of div depending on its current state    
    
    // if the text of the surroundsButton heading is equal to show
    if ($("#surroundsButton").css("display") == "inline-block") {
        
        // remove border-bottom
        $("#surroundsButton").css(
            "border-bottom", "none"
        );
        
        // change the css display to inline-block
        $("#surroundsInfo").css(
            "display", "inline-block"
        );

    } else {
        
        // change the css display to none
        $("#surroundsInfo").css(
            "display", "none"
        );

    } // close if statement
    
} // close surroundsSlide function