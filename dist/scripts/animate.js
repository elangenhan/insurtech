"use strict";function init(){$(".rightButton").hide(),$(".footer").hide(),$(".messageBox").hide(),$("#watsonFile").hide()}function handleClickStart(){speechClick(),fadeInFooter(),console.log("muh")}function handleClick(){speechClick(),console.log("muh")}function fadeInFooter(){$(".jumboButton").fadeOut(1e3),$(".startButton").hide(),$(".messageBox").css({display:"inline-flex"}),$(".footer").addClass("active"),$(".footer").fadeIn(1e3),$(".rightButton").fadeIn(1e3),$(".rightButton > .fa-stack").addClass("pulse"),console.log("Only one")}var first=null;$(document).ready(function(){init(),first=0});
//# sourceMappingURL=animate.js.map