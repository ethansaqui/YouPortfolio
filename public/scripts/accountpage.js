$(document).ready(function() {

    $('#upload').click(function() {
        $('#uploadpopup').toggleClass("active");
    });

    $('.PFPButton').click(function() {
        $('#PFPPopup').toggleClass("active");
    });

    $('.PFPcontent #Cancel').click(function(){
        $('#PFPPopup').toggleClass("active");
    });

    $('.CoverButton').click(function(){
        $('#CoverPopup').toggleClass("active");
    });

    $('.CoverContent #Cancel').click(function(){
        $('#CoverPopup').toggleClass("active");
    });

    $('#StatusBar').keypress(function(event){
        var Bio = $('#StatusBar').val();
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13'){
            $.get('/ChangeBio', {Bio: Bio}, function(){
                alert("You entered" + Bio);
            })
            
        }
    })

})