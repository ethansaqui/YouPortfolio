$(document).ready(function() {
    // Comment Functions
    var user = $(".sessionuser").attr('id');

    
    
    // Comment Functionality
    $(".comment-button").on("click", function () {
        var comBtn = $(this);
        var postID = comBtn.parents(".comment-box").siblings(".image-container").children(".post-image").attr('id');
        console.log("post id" + postID)
        var commentDOM = $("<form id=\"comment-form\"></form>").html(`
            <button id="cancel-comment" type="button"> &times; </button>
            <input type="text" id="comment" name="comment">
            <input type="hidden" id="postID" name="postID" value="${postID}">
            <input type="submit" id="submit-comment" value="Comment">
        `)

        comBtn.after(commentDOM);

        $(".comment-button").each(function() {
            $(this).css("display", "block");
        })

        comBtn.css("display", "none");
    })

    $(".comment-container").on("click", "#cancel-comment", function() {
        $(this).parent().siblings(".comment-button").css("display", "block");
        console.log($(this).parent().siblings(".comment-button"));
        $(this).parent("#comment-form").remove();
    })

    $(".comment-container").on("click", "#submit-comment", function() {
        $(".comment-container").off("click")
        var comment = $("#comment").val();
        var postID = $("#postID").val();

        var tempComment = {
            comment : comment,
            postID : postID
        }

        $.post('/uploadcomment', tempComment, (data, status) => {
            console.log(status)
        })
    })

    // Reply Functionality
    

    $(".reply").on("click", function() {
        $("#reply-form").remove();
        $(".reply").css("display", "block");
        var comBtn = $(this);
        var postID = comBtn.parents(".comment-box").siblings(".image-container").children(".post-image").attr('id');
        var parentCommentId = comBtn.parents(".comment").attr('id');

        var replyDOM = $("<form id=\"reply-form\"></form>").html(`
            <button id="cancel-reply" type="button"> &times; </button>
            <input type="text" id="reply" name="reply">
            <input type="hidden" id="postIDReply" name="postID" value="${postID}">
            <input type="hidden" id="parentCommentId" name="parentCommentId" value="${parentCommentId}">
            <input type="submit" id="submit-reply" value="Reply">
        `)
        comBtn.parent().after(replyDOM);

        
        $(this).css("display", "block");
        

        comBtn.css("display", "none");
    })
    
    $(".comment-container").on("click", "#cancel-reply", function() {
        console.log("clicked")
        $("#reply-form").remove();
        $(".reply").css("display", "block");
        console.log($(this).parent().siblings(".reply"));
    })

    $(".comment-container").on("click", "#submit-reply", function() {
        $(".comment-container").off("click")
        var reply = $("#reply").val();
        var postID = $("#postIDReply").val();
        var parentCommentId = $("#parentCommentId").val();

        var tempComment = {
            reply: reply,
            postID: postID,
            parentCommentId : parentCommentId
        }
        $.post('/uploadreply', tempComment, (data, status) => {
            console.log(status)
        })
    })
    console.log("this ran")
    // Hide Show Replies for comments without replies
    $(".comment").each(function() {
        let c = $(this);

        var containers = c.next(".comment-container");
        if (containers.length == 0) {
            c.find(".show-replies").css("display", "none");
        }
    })

 
   
    // Give only Anya the power to delete and edit her comments
    $(".comment-text h3").each(function() {
        var cText = $(this);
        if (cText.text() != user) {
            cText.parents(".comment").find(".user").css("display", "none")
        }
    })


    // change all show reply to hide reply
    $(".show-replies").text("Hide Replies")

    $(".show-replies").on("click", function() {
        var reply = $(this).closest(".comment").siblings(".comment-container");
        if ($(this).html() == "Show Replies") {
            reply.css("display", "block");
            $(this).text("Hide Replies");
            return;
        }
        reply.css("display", "none");
        $(this).text("Show Replies");
    })

    

    //delete and edit comment
    $(".editcomment").on("click", function() {
        $("#edit-form").remove();

        // makes sure that only the user who owns the account can edit or delete their comments
        $(".comment-text h3").each(function() {
            var cText = $(this);
            if (cText.text() != user) {
                cText.parents(".comment").find(".user").css("display", "none")
            }
            else {
                cText.parents(".comment").find(".user").css("display", "block")
            }
        })  

        // form generator
        var comBtn = $(this);
        var commentID = $(this).parents(".comment").attr("id");
        var initVal = $(this).parents(".comment-footer").siblings(".comment-text").children("p").text();
        var editDOM = $("<form id=\"edit-form\"></form>").html(`
            <button id="cancel-edit" type="button"> &times; </button>
            <input type="text" id="edit" name="edit" value="${initVal}">
            <input type="hidden" id="commentID" name="commentID" value="${commentID}">
            <input type="submit" id="submit-edit" value="Edit">
        `)
        comBtn.parent().after(editDOM);
        
        // hide button after form is made
        comBtn.css("display", "none");
    });
    // remove button after function
    $(".comment-container").on("click", "#cancel-edit", function() {
        
        console.log($(this).siblings());
        $(this).parents("#edit-form").siblings(".comment-footer").children(".editcomment").css("display", "block");
        $("#edit-form").remove();
    });

    $(".comment-container").on("click", "#submit-edit", function() {
        $(".comment-container").off("click")
        var edit = $("#edit").val();
        var commentID = $("#commentID").val();
        
        var tempComment = {
            edit: edit,
            commentID: commentID,
        }
        $.post('/editcomment', tempComment, (data, status) => {
            console.log(status)
        })
    });

    $(".deletecomment").on("click", function() {
        var commentID = $(this).parents(".comment").attr("id");
        $.post("/deletecomment", {commentID : commentID}, (data, status) => {
            window.location.assign('/home');
        })
    })

    // Popup Modal Image Functions
    $(".posts-wrapper .popup-image span").on("click", () => {
        $(".posts-wrapper .popup-image").css("display", "none");
    });

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
    });

    $("#profile-picture img").each(function() {
        var imgsrc = $(this).attr('src');
        const img = new Image();
        img.src = imgsrc;
        if (img.width > img.height) {
            $(this).width = img.height;
            
        }
    });

    $("#ConfirmUpload").click(() => {
        console.log("TEST")
        var formData =  new FormData($("#uploadForm").get(0));
        if($("#captionIn").val() != "" && $("#imageIn").val() != "") {
            $.ajax({
                type: "POST",
                url: "/uploadPost",
                data: formData,
                processData: false,
                contentType: false,
                success: function(r){
                    console.log("result",r)
                },
                error: function (e) {
                    console.log("some error", e);
                }
            });
        }
        else {
            console.log("empty")
        }
    });

    // heart functionality
    $(".heart").on("click", function() {
        var likeCount = $(this).siblings(".like-count")
        var likeButton = $(this).children(".like-button");
        var liked =  likeButton.attr('liked')
        var likes;
        var post = $(this).parents(".post-quality").siblings(".child").find(".post-image").attr('id');
        console.log(post)

        if(liked == "false") {
            likeButton.attr('src', "/images/filled-heart.png");
            likes = likeCount.text();
            likeCount.html(parseInt(likes) + 1);
            likeButton.attr('liked', "true")
        }

        if(liked == "true") {
            likeButton.attr('src', "/images/empty-heart.png");
            likes = likeCount.text();
            likeCount.html(parseInt(likes) - 1);
            likeButton.attr('liked', "false")
        }

        var updateLike = {
            likes : parseInt(likeCount.text()),
            post : post
        }

        $.post("/updatelikes", updateLike, () => {
            
        })
        
    })

    // From AccountPage.js
    $('#upload').click(function() {
        $('#uploadpopup').toggleClass("active");
    });

    $("#Cancel").click(function() {
        $('#uploadpopup').toggleClass("active");
    })

    $('.PFPButton').click(function() {
        $('#PFPPopup').toggleClass("active");
    });

    $('.PFPcontent #Cancel').click(function(){
        console.log(' this runs ')
        $('#PFPPopup').toggleClass("active");
    });

    $('.CoverButton').click(function(){
        $('#CoverPopup').toggleClass("active");
    });

    $('.CoverContent #Cancel').click(function(){
        $('#CoverPopup').toggleClass("active");
    });

    $('.Edit').click(function(){
        $('#Editpopup').toggleClass("active");
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        var parent = $(this).parent().parent();
        var WorkID =($(parent).attr('id')); 
        $('.EditContent #ConfirmUpload').click(function(){
            var Caption = $('#CaptionInput').val();
            var ID = WorkID;
            $('#Editpopup').toggleClass("active");
            $.get('/ChangeCaption',{Id:ID , Caption:Caption},function(){
            })
        })
     });

     $('.EditContent #Cancel').click(function(){
        $('#Editpopup').toggleClass("active");
     });

    $('#StatusBar').keypress(function(event){
        var Bio = $('#StatusBar').val();
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13'){
            $.get('/ChangeBio', {Bio: Bio}, function(){
                alert("You entered" + Bio);
            })
            
        }
    });

    $('.Delete').click(function(){
        var parent = $(this).parent().parent();
        var WorkID =($(parent).attr('id'));
        $.get('/DeletePost', {id: WorkID}, function(){
            $(parent).remove();
        });
    });

    $('.profile-pic-container').click(function(){
        var children = $(this).children();
        var username = $(children).children('img').attr('id');
        var sessionUser = $('.sessionuser').attr('id');
        console.log(sessionUser);
        console.log(username)
        if (sessionUser == username){
            location.href="/account";
        }
        else{
            location.href="/VisitAccount/"+username;
        }
       
    });

})