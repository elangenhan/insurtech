const helloWorld = () => console.log('Hello World');

helloWorld();

function speechClick(){
    speech(function(text){
        sendText(text);
        console.log(text);
    });
}

function sendText(text){
    $.ajax({
        type: "POST",
        url: "/conversation",
        data: {text: text},
        success: function(res){
            var resp = res.output.text[0];
            console.log(resp);

            var msg = new SpeechSynthesisUtterance(resp);
            window.speechSynthesis.speak(resp);
        },
        error: function(err){
            console.log(err);
        }
    });
}
