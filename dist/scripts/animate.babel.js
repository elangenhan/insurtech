let first = 0;

$(document).ready(() => {
	init();
});

function init() {
	$(".rightButton").hide();
	$(".footer").hide();
}

function handleClick() {
    speechClick();
    if(first == 0) {
    	$(".jumboButton").fadeOut(1000);
	    $(".rightButton").fadeIn(1000);
	    $(".rightButton > .fa-stack").addClass('pulse');
	    $(".footer").addClass('active');
	    $(".footer").fadeIn(1000);
	    console.log('Only one');
	    first = 1;
    }
    console.log("muh");
}
