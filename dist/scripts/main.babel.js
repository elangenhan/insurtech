const helloWorld = () => console.log('Hello World');

helloWorld();

function speechClick(){
    speech(function(text){
        console.log(text);
        $.ajax({
            type: "POST",
            url: "/conversation",
            data: {
                text: text
            },
            success: function(res){
                console.log(res);
            },
            error: function(err){
                console.log(err);
            }
        });
    });
}
