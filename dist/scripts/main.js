"use strict";function speechClick(){speech(function(o){console.log(o),$.ajax({type:"POST",url:"/conversation",data:{text:o},success:function(o){console.log(o)},error:function(o){console.log(o)}})})}var helloWorld=function(){return console.log("Hello World")};helloWorld();
//# sourceMappingURL=main.js.map
