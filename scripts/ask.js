let langs = ["#asktom","#fragtom","#chiedermitom", "#spørgsmåltom", "#demandeztom", "#cпросиtom", "#onatom", "#preguntatom", "#vraagtom", "#kysymystom", "#pitanjetom", "#frågatom", "#zapytaćtoma", "#freegjetom"];

setInterval(function(){
    var rand = langs[Math.floor(Math.random() * langs.length)];
    $("#asktom").text(rand);
}, 1000*5)
