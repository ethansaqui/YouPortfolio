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

    $('#StatusBar').keypress(function(event){
        var Status = $('#StatusBar').val();
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13'){
            alert('You Entered ' + Status);
        }
    })

})