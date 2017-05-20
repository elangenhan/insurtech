function openSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    // recognition.continuous = true;
    // recognition.interimResults = true;
    recognition.language = 'de';
    return recognition;
}

function displayMessage(reply, input) {
    if(reply) {
        $('.messageBox').append('<div class="is-12 start left"><h2>' + reply + '</h2></div>');
        $('.messageBox').animate({
        scrollTop: $('.messageBox')[0].scrollHeight}, 2000);
    } else {
        $('.messageBox').append('<div class="is-12 end right"><h2>' + input + '</h2></div>');
        $('.messageBox').animate({
        scrollTop: $('.messageBox')[0].scrollHeight}, 2000);
    }
}

function speech(callback){
    let recognition = openSpeechRecognition();
    recognition.addEventListener('result', e => {
        let transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        $('#mytext').text(transcript);
        displayMessage(false, transcript);

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
            displayMessage(resp, false);

            var msg = new SpeechSynthesisUtterance(resp);
            window.speechSynthesis.speak(msg);

            if (context.uploadPic == "true") {
                context.uploadPic = "false";
                triggerUrlField();
            }
        },
        error: function(err){
            console.log(err);
        }
    });
}

function triggerUrlField() {
    //trigger url field stuff
    $('#watsonFile').show();
}

function sendUrl(url){
    $.ajax({
        type: "POST",
        url: "/visualRecognition",
        data: {
            context: JSON.stringify(context),
            url: url
        },
        success: function(res){
            var resp = res.output.text[0];
            context = res.context;
            console.log(context);
            console.log(resp);
            displayMessage(resp, false);

            var msg = new SpeechSynthesisUtterance(resp);
            window.speechSynthesis.speak(msg);

        },
        error: function(err){
            console.log(err);
        }
    });
}


$('#watsonFile').on('keypress', function (e) {
     if(e.which === 13){
        let watsonFileUrl = $('#watsonFile').val();
        sendUrl(watsonFileUrl);
        $('#watsonFile').hide();

        console.log('Pressed');
     }
});
