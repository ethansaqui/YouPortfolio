$(document).ready(function() {
    console.log("index.js online")
    $("#ConfirmUpload").click(() => {
        console.log("clicked");
        var img = $("#image").val();
        var caption = $("#caption").val();

        var newPost = {
            caption: caption,
            content: img,
            artist: "fill",
            likes: 0
        }

        $.post("/upload", newPost, (data, status) => {
            console.log("it works")
        })
    })

    $(".nav-bar-pfp").on('click', () => {
        $.get("/account", (data, status) => {
            

        })
    })
})