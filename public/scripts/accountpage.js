$(document).ready(function() {

    $('#upload').click(function() {
        $('#uploadpopup').toggleClass("active");
    });

    $('.PFPButton').click(function() {
        $('#PFPPopup').toggleClass("active");
    });

    $('.CoverButton').click(function(){
        $('#CoverPopup').toggleClass("active");
    });

})