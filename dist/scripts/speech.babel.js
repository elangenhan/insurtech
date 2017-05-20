function openSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
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
    speech(function(text){
        sendText(text);
        console.log(text);
    });
}

var context;

function sendText(text, context){
    $.ajax({
        type: "POST",
        url: "/conversation",
        data: {text: text, context: context},
        success: function(res){
            var resp = res.output.text[0];
            context = res.context;
            console.log(resp);

            var msg = new SpeechSynthesisUtterance(resp);
            window.speechSynthesis.speak(msg);
        },
        error: function(err){
            console.log(err);
        }
    });
}