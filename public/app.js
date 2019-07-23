$(document).ready(function() {

console.log("app js working");

$(".btn").on("click", function() {
    console.log($(this.children).attr("link"));
});

});