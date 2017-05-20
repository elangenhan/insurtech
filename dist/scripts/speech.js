"use strict";function openSpeechRecognition(){window.SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;var e=new SpeechRecognition;return e.language="de",e}function displayMessage(e,t){e?($(".messageBox").append('<div class="is-12 start left"><h2>'+e+"</h2></div>"),$(".messageBox").animate({scrollTop:$(".messageBox")[0].scrollHeight},2e3)):($(".messageBox").append('<div class="is-12 end right"><h2>'+t+"</h2></div>"),$(".messageBox").animate({scrollTop:$(".messageBox")[0].scrollHeight},2e3))}function speech(e){var t=openSpeechRecognition();t.addEventListener("result",function(n){var o=Array.from(n.results).map(function(e){return e[0]}).map(function(e){return e.transcript}).join("");$("#mytext").text(o),displayMessage(!1,o),n.results[0].isFinal&&(e(o),t.stop())}),t.start()}function speechClick(){console.log("clicked"),$("#mytext").text(""),speech(function(e){sendText(e)})}function sendText(e){var t={message:e,context:JSON.stringify(context)};$.ajax({type:"POST",url:"/conversation",data:t,success:function(e){var t=e.output.text[0];context=e.context,console.log(context),console.log(t),displayMessage(t,!1);var n=new SpeechSynthesisUtterance(t);window.speechSynthesis.speak(n),"true"==context.uploadPic&&(context.uploadPic="false",triggerUrlField())},error:function(e){console.log(e)}})}function triggerUrlField(){$("#watsonFile").show()}function sendUrl(e){$.ajax({type:"POST",url:"/visualRecognition",data:{context:JSON.stringify(context),url:e},success:function(e){var t=e.output.text[0];context=e.context,console.log(context),console.log(t);var n=new SpeechSynthesisUtterance(t);window.speechSynthesis.speak(n)},error:function(e){console.log(e)}})}var context;$("#watsonFile").on("keypress",function(e){if(13===e.which){sendUrl($("#watsonFile").val()),$("#watsonFile").hide(),console.log("Pressed")}});
//# sourceMappingURL=speech.js.map