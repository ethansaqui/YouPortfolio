$(document).ready(function() {
    console.log("WTF IS GOING ON");
    // Comment Functions
    const user = "Anya";

    
    
    // Comment Functionality
    $(".comment-button").on("click", function () {
        var comBtn = $(this);
        var postID = comBtn.parents(".comment-box").siblings(".image-container").children(".post-image").attr('id');
        console.log("post id" + postID)
        var commentDOM = $("<form id=\"comment-form\" method=\"POST\" action=\"/uploadcomment\"></form>").html(`
            <button id="cancel-comment" type="button"> &times; </button>
            <input type="text" id="comment" name="comment">
            <input type="hidden" name="postID" value="${postID}">
            <input type="submit" id="submit-comment" value="Comment">
        `)

        comBtn.after(commentDOM);

        $(".comment-button").each(function () {
            $(this).css("display", "block");
        })

        comBtn.css("display", "none");
    })

    $(".comment-container").on("click","#cancel-comment", function() {
        $(this).parent().siblings(".comment-button").css("display", "block");
        console.log($(this).parent().siblings(".comment-button"));
        $(this).parent("#comment-form").remove();
    })

    $(".comment-container").on("click","#submit-comment", function() {
        console.log("clicked");
    })

    // Reply Functionality
    

    $(".reply").on("click", function () {
        console.log("clicked");
        var comBtn = $(this);
        var postID = comBtn.parents(".comment-box").siblings(".image-container").children(".post-image").attr('id');
        var parentCommentId = comBtn.parents(".comment").attr('id');
        console.log(comBtn);
        var replyDOM = $("<form id=\"reply-form\" method=\"POST\" action=\"/uploadreply\"></form>").html(`
            <button id="cancel-reply" type="button"> &times; </button>
            <input type="text" id="reply" name="reply">
            <input type="hidden" name="postID" value="${postID}">
            <input type="hidden" name="parentCommentId" value="${parentCommentId}">
            <input type="submit" id="submit-reply" value="Reply">
        `)
        comBtn.parent().after(replyDOM);

        $(".reply").each(function () {
            $(this).css("display", "block");
        })

        comBtn.css("display", "none");
    })

    $(".comment-container").on("click","#cancel-reply", function() {
        $(this).parent().siblings(".comment-footer").children(".reply").css("display", "block");
        console.log($(this).parent().siblings(".reply"));
        $(this).parent("#reply-form").remove();
    })

    $(".comment-container").on("click","#submit-reply", function() {
        console.log("clicked");
    })

    // Hide Show Replies for comments without replies
    $(".comment").each(function (){
        let c = $(this);
        
        var containers = c.next(".comment-container");
        if (containers.length == 0) {
            c.find(".show-replies").css("display", "none");
        }
    })

 
   

    
    var replyHidden = false;
    // change all show reply to hide reply
    $(".show-replies").text("Hide Replies")

    $(".show-replies").on("click", function() {
        var reply = $(this).closest(".comment").next(".comment-container");
        if(replyHidden) {
            reply.css("display", "block");
            replyHidden = false;
            $(this).text("Hide Replies");
            return;
        }
        reply.css("display", "none");
        replyHidden = true;
        $(this).text("Show Replies");
    })

    // Popup Modal Image Functions
    $(".posts-wrapper .popup-image span").on("click", () => {
        $(".posts-wrapper .popup-image").css("display", "none");
    })

    $(".posts-wrapper .post-image").on("click", function() { // Update the Image, Caption, and Artist of a Modal
        var imgsrc = $(this).attr('src');
        
        const img = new Image();

        var size;
        img.src = imgsrc;

        var caption = $(this).parents(".image-container").find(".caption").text();
        $(".posts-wrapper .popup-image .caption").text(caption);

        var artist = $(this).parents(".image-container").find(".artist").text();
        $(".posts-wrapper .popup-image .artist").text(artist);

        var pfpsrc = $(this).parents(".parent").find("#profile-picture img").attr('src');
        $(".popup-image #profile-picture img").attr('src', pfpsrc);

        $(".posts-wrapper .popup-image").css("display", "block");
        $(".popup-image .popup").attr('src', imgsrc);
    })

    $("#profile-picture img").each(function() { 
        var imgsrc = $(this).attr('src');
        const img = new Image();
        img.src = imgsrc;
        if(img.width > img.height) {
            $(this).width = img.height;
        }
    })

    

})

function toggleUpload(){
    document.getElementById("uploadpopup").classList.toggle("active");
}



