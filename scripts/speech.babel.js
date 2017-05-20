function openSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.language = 'de';
    return recognition;
}

function speech(callback){
    openSpeechRecognition().addEventListener('result', e => {
        let transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        if (e.results[0].isFinal) {
            callback(transcript);
        }
    });
    openSpeechRecognition().start();
}

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
}s