<<<<<<< HEAD
"use strict";function speechClick(){speech(function(e){sendText(e),console.log(e)})}function sendText(e){$.ajax({type:"POST",url:"/conversation",data:{text:e},success:function(e){var o=e.output.text[0];console.log(o);new SpeechSynthesisUtterance(o);window.speechSynthesis.speak(o)},error:function(e){console.log(e)}})}var helloWorld=function(){return console.log("Hello World")};helloWorld();
//# sourceMappingURL=main.js.map
=======
"use strict";function speechClick(){speech(function(o){console.log(o),$.ajax({type:"POST",url:"/conversation",data:{text:o},success:function(o){console.log(o)},error:function(o){console.log(o)}})})}var helloWorld=function(){return console.log("Hello World")};helloWorld();
//# sourceMappingURL=main.js.map
>>>>>>> origin/master
