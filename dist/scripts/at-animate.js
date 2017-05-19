$(document).ready(() => {
	init();
});

function init() {
	$(".footer").hide();
}

function micClick() {
    $("#micBtn").addClass('clicked');
    $(".footer").addClass('active');
    $(".footer").show('fade', 5000);
    console.log("muh");
}