"use strict";function openSpeechRecognition(){window.SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;var e=new SpeechRecognition;return e.continuous=!0,e.interimResults=!0,e.language="de",e}function speech(e){var n=openSpeechRecognition();n.addEventListener("result",function(t){var o=Array.from(t.results).map(function(e){return e[0]}).map(function(e){return e.transcript}).join("");$("#mytext").text(o),t.results[0].isFinal&&(e(o),n.stop())}),n.start()}function speechClick(){speech(function(e){sendText(e),console.log(e)})}function sendText(e){$.ajax({type:"POST",url:"/conversation",data:{text:e},success:function(e){var n=e.output.text[0];console.log(n);var t=new SpeechSynthesisUtterance(n);window.speechSynthesis.speak(t)},error:function(e){console.log(e)}})}
//# sourceMappingURL=speech.js.map