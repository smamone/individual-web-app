// JavaScript
// Slider

// call the futureSlide function on subSec click
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
        
    }); // toggle the slide show/hide of future div depending on its current state    
    
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
    
} // close futureSlide function