$(document).ready(() => {
	init();
});

function init() {
	$(".rightButton").hide();
	$(".footer").hide();
}

function handleClick() {
    speechClick();
    $(".jumboButton").fadeOut(1000);
    $(".rightButton").fadeIn(1000);
    $(".rightButton > .fa-stack").addClass('pulse');
    $(".footer").addClass('active');
    $(".footer").fadeIn(1000);
    console.log("muh");
}
