function openSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    // recognition.continuous = true;
    // recognition.interimResults = true;
    recognition.language = 'de';
    return recognition;
}

function speech(callback){
    let recognition = openSpeechRecognition();
    recognition.addEventListener('result', e => {
        let transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        $('#mytext').text(transcript);

        if (e.results[0].isFinal) {
            callback(transcript);
            recognition.stop();

        }
    });
    recognition.start();
}

function speechClick(){
    console.log("clicked");
    $('#mytext').text("");
    speech(function(text){
        sendText(text);
    });
}

var context;

function sendText(text){
    var data = {
            message: text, 
            context: JSON.stringify(context)
        }
    $.ajax({
        type: "POST",
        url: "/conversation",
        data: data,
        success: function(res){
            var resp = res.output.text[0];
            context = res.context;
            console.log(context);
            console.log(resp);

            var msg = new SpeechSynthesisUtterance(resp);
            window.speechSynthesis.speak(msg);

            if (context.uploadPic) {
                context.uploadPic = false;
                uploadPic();
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

function uploadPic() {
    var data = null;
    $.ajax({
        type: "POST",
        url: "/visualRecognition",
        data: data,
        success: function(res){
            var resp = res.output.text[0];
            context = res.context;
            console.log(context);
            console.log(resp);

            var msg = new SpeechSynthesisUtterance(resp);
            window.speechSynthesis.speak(msg);

            if (context.uploadPic) {
                context.uploadPic = false;
                uploadPic();
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}