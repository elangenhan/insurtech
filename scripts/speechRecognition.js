function speech(callback){
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

        console.log(transcript);

        if (e.results[0].isFinal) {
            callback(transcript);
        }
    });

    recognition.addEventListener('end', recognition.start);
    recognition.start();

}
