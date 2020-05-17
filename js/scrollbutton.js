// JavaScript
// Scroll to top button

$(document).ready(function(){

    // If the window is not at top, show button
    $(window).scroll(function(){
        
        if ($(this).scrollTop() > 100){
            
            $("#top").fadeIn();
            
        } else {
            
            $("#top").fadeOut();
            
        }
        
    }); // close scroll function

    // Click event to scroll to top
    $("#top").click(function(){
        
        $("html, body").animate({scrollTop : 0},800);
        return false;
        
    }); // close click function

}); // close document ready function