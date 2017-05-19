const helloWorld = () => console.log('Hello World');

helloWorld();

function speechClick(){
    speech(function(text){
        console.log(text);
    });
}
