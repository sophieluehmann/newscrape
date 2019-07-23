$(document).ready(function() {


 

console.log("app js working");

$(".btn").on("click", function(event) {
    var link = $(this.children).attr("link");
    $.ajax({
        url: "/save",
        type: "POST",
        data: link
    }).then(
        function(link){
            console.log("ajax complete")
        }
    );
    console.log("ajax sent");
    
});

}); 