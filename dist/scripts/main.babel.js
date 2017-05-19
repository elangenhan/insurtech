const helloWorld = () => console.log('Hello World');

helloWorld();

let mytext;

speech(function(text){
    mytext = text;
    console.log(mytext);
});
