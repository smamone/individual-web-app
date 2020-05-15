// JavaScript
// Slider

// call the subMainSlide function on subSec click
$("#subMainButton").click(subMainSlide);

// FUNCTION to create SLIDER for MAIN INFO
// function to hide/show subMain table by sliding
function subMainSlide(event) {

    $("#subMainTable").slideToggle("slow", "linear", function(){
        
        // show up arrow when open
        $("#subMainButton th").toggleClass("fas fa-chevron-up");
        
        // show down arrow when closed
        $("#subMainButton th").toggleClass("fas fa-chevron-down");
        
        // add border-bottom
        $("#subMainButton").css(
            "border-bottom", "0.1em solid #F0F0F0"
        );
        
    }); // toggle the slide show/hide of div depending on its current state    
    
    // if the text of the titleButton heading is equal to Show
    if ($("#subMainButton").css("display") == "inline-table") {
        
        // remove border-bottom
        $("#subMainButton").css(
            "border-bottom", "none"
        );
        
        // change the css display to none
        $("#subMainTable").css(
            "display", "none"
        );

    } else {
        
        // change the css display to inline-table
        $("#subMainTable").css(
            "display", "inline-table"
        );

    } // close if statement
    
} // close subMainSlide function


// call the subSecSlide function on subSec click
$("#subSecButton").click(subSecSlide);

// FUNCTION to create SLIDER for SECONDARY INFO
// function to hide/show secondary table by sliding
function subSecSlide(event) {

    $("#subSecInfo").slideToggle("slow", function(){
        
        // show up arrow when open
        $("#subSecButton th span").toggleClass("fas fa-chevron-up");
        
        // show down arrow when closed
        $("#subSecButton th span").toggleClass("fas fa-chevron-down");
        
        // add border-bottom
        $("#subSecButton").css(
            "border-bottom", "0.1em solid #F0F0F0"
        );
        
    }); // toggle the slide show/hide of div depending on its current state    
    
    // if the text of the titleButton heading is equal to Show
    if ($("#subSecButton").css("display") == "inline-table") {
        
        // remove border-bottom
        $("#subSecButton").css(
            "border-bottom", "none"
        );
        
        // change the css display to inline-table
        $("#subSecInfo").css(
            "display", "inline-table"
        );

    } else {
        
        // change the css display to none
        $("#subSecInfo").css(
            "display", "none"
        );

    } // close if statement
    
} // close subSecSlide function