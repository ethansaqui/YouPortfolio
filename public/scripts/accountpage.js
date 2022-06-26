
function toggleUpload(){
    document.getElementById("uploadpopup").classList.toggle("active");
}
function toggleEdit(){
    document.getElementById("Editpopup").classList.toggle("active");
}

function toggleChange(){
    document.getElementById("PFPPopup").classList.toggle("active");
}

function DeleteWork(clicked_id){
    var UsedId = clicked_id;
    console.log(UsedId)
    switch(UsedId)
    {
        case 'Delete1':
            document.getElementById("work1").id = "Deleted"
            if(document.getElementById("work2") !== null)
            {
                document.getElementById("work2").id = "work1"
                document.getElementById("Delete2").id = "Delete1"
            }
            if(document.getElementById("work3") !== null)
            {
                document.getElementById("work3").id = "work2"
                document.getElementById("Delete3").id = "Delete2"
            }
            if(document.getElementById("work4") !== null)
            {
                document.getElementById("work4").id = "work3"
                document.getElementById("Delete4").id = "Delete3"
            }
            if(document.getElementById("work5") !== null)
            {
                document.getElementById("work5").id = "work4"
                document.getElementById("Delete5").id = "Delete4"
            }
            break;
        case 'Delete2':
            document.getElementById("work2").id = "Deleted"
            if(document.getElementById("work3") !== null)
            {
                document.getElementById("work3").id = "work2"
                document.getElementById("Delete3").id = "Delete2"
            }
            if(document.getElementById("work4") !== null)
            {
                document.getElementById("work4").id = "work3"
                document.getElementById("Delete4").id = "Delete3"
            }
            if(document.getElementById("work5") !== null)
            {
                document.getElementById("work5").id = "work4"
                document.getElementById("Delete5").id = "Delete4"
            }
            break;
        case 'Delete3':
            document.getElementById("work3").id = "Deleted"
            if(document.getElementById("work4") !== null)
            {
                document.getElementById("work4").id = "work3"
                document.getElementById("Delete4").id = "Delete3"
            }
            if(document.getElementById("work5") !== null)
            {
                document.getElementById("work5").id = "work4"
                document.getElementById("Delete5").id = "Delete4"
            }
            break;
        case 'Delete4':
            document.getElementById("work4").id = "Deleted"
            if(document.getElementById("work5") !== null)
            {
                document.getElementById("work5").id = "work4"
                document.getElementById("Delete5").id = "Delete4"
            }
            break;
         case 'Delete5':
            document.getElementById("work5").id = "Deleted"
            break;
        default:
            console.log('Error');
            break;
    }
}

function Follow(){
    document.getElementById("followercount").innerHTML = "1 ";
}