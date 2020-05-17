// JavaScript
// Slider

$(document).ready(function(){

    // call the detailsSlide function on detailsButton click
    $("#detailsButton").click(detailsSlide);

    // FUNCTION to create SLIDER for DETAILS INFO
    // function to hide/show subMain table by sliding
    function detailsSlide(event) {

        $("#detailsTable").slideToggle("slow", function(){

            // show up arrow when open
            $("#detailsButton h3 span").toggleClass("fas fa-chevron-up");

            // show down arrow when closed
            $("#detailsButton h3 span").toggleClass("fas fa-chevron-down");

        }); // toggle the slide show/hide of div depending on its current state

        // if the text of the detailsButton heading is equal to Show
        if ($("#detailsButton").css("display") == "inline-block") {

            // change the css display to none
            $("#detailsTable").css(
                "display", "inline-block"
            );

        } else {

            // change the css display to inline-table
            $("#detailsTable").css(
                "display", "none"
            );

        } // close if statement

    } // close detailsSlide function
    
    
    // call the demoSlide function on demoButton click
    $("#demoButton").click(demoSlide);

    // FUNCTION to create SLIDER for DEMO INFO
    // function to hide/show subMain table by sliding
    function demoSlide(event) {

        $("#demoTable").slideToggle(1000, function(){

            // show up arrow when open
            $("#demoButton h3 span").toggleClass("fas fa-chevron-up");

            // show down arrow when closed
            $("#demoButton h3 span").toggleClass("fas fa-chevron-down");

            // add border-bottom
            $("#demoButton").css(
                "border-bottom", "0.1em solid #F0F0F0"
            );

        }); // toggle the slide show/hide of div depending on its current state    

        // if the text of the demoButton heading is equal to show
        if ($("#demoButton").css("display") == "inline-block") {

            // remove border-bottom
            $("#demoButton").css(
                "border-bottom", "none"
            );

            // change the css display to inline-block
            $("#demoTable").css(
                "display", "inline-block"
            );

        } else {

            // change the css display to none
            $("#demoTable").css(
                "display", "none"
            );

        } // close if statement

    } // close demoSlide function


    // call the surroundsSlide function on surroundsButton click
    $("#commonButton").click(commonSlide);

    // FUNCTION to create SLIDER for COMMON INFO
    // function to hide/show secondary table by sliding
    function commonSlide(event) {

        $("#commonTable").slideToggle(1000, function(){

            // show up arrow when open
            $("#commonButton h3 span").toggleClass("fas fa-chevron-up");

            // show down arrow when closed
            $("#commonButton h3 span").toggleClass("fas fa-chevron-down");

            // add border-bottom
            $("#commonButton").css(
                "border-bottom", "0.1em solid #F0F0F0"
            );

        }); // toggle the slide show/hide of div depending on its current state    

        // if the text of the commonButton heading is equal to show
        if ($("#commonButton").css("display") == "inline-block") {

            // remove border-bottom
            $("#commonButton").css(
                "border-bottom", "none"
            );

            // change the css display to inline-block
            $("#commonTable").css(
                "display", "inline-block"
            );

        } else {

            // change the css display to none
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
            $("#streetsButton h4 span").toggleClass("fas fa-chevron-up");

            // show down arrow when closed
            $("#streetsButton h4 span").toggleClass("fas fa-chevron-down");

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
            $("#surroundsButton h4 span").toggleClass("fas fa-chevron-up");

            // show down arrow when closed
            $("#surroundsButton h4 span").toggleClass("fas fa-chevron-down");

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
    
}); // close document ready function