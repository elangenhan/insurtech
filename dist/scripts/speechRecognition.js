window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


function speech(callback){
    console.log("speech function started");

    recognition.addEventListener('result', e => {
        let transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        if (e.results[0].isFinal) {
            callback(transcript);
        }
    });

//    recognition.addEventListener('end', recognition.start);
    recognition.start();
}
