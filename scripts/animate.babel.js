let first = null;
$(document).ready(() => {
	init();
	first = 0;
});

function init() {
	$(".rightButton").hide();
	$(".footer").hide();
}

function handleClickStart() {
    speechClick();
    fadeInFooter();
    console.log("muh");
}

function handleClick() {
    speechClick();
    console.log("muh");
}

function fadeInFooter() {
	$(".jumboButton").fadeOut(1000);
	$(".footer").addClass('active');
	$(".footer").fadeIn(1000);
    $(".rightButton").fadeIn(1000);
    $(".rightButton > .fa-stack").addClass('pulse');
    console.log('Only one');
}