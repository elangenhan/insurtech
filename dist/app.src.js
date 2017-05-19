var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    watson = require('watson-developer-cloud');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/sayHello", function(request, response) {
    var user_name = request.query.user_name;
    response.end("Hello " + user_name + "!");
});

var conversation = watson.conversation({
    "username": "b5c986f3-3d3d-418d-8351-44c6d9f20c15",
    "password": "OaBSf0dRUPuk",
    "url": "https://gateway.watsonplatform.net/conversation/api",
    "version": "v1",
    "version_date": "2016-09-20"
});

var visual_recognition_carfruits = watson.visual_recognition({
    api_key: '7e68869fb2fa809332453fd95f94f5117d8d53ee',
    version_date: '2016-05-20',
    version: 'v3'
});
var visual_recognition_caraccident = watson.visual_recognition({
    api_key: '3768bac1246cdd7a709e4cb94604f1b08ea9d24c',
    version_date: '2016-05-20',
    version: 'v3'
});

var context = {};
context.actionUploadCar = null;
context.isFruit = null;
context.carDamaged = null;
context.isValid = null;

app.post('/conversation', function(req, res) {
    var message = req.body.message;

    conversation.message({
        workspace_id: '9f919328-5d6f-464b-a2ff-ea9bb86f8c2e',
        input: {
            'text': message
        },
        context: req.body.context
    }, function(err, response) {
        if (err) {
            console.log('error:', err);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(response));
        }
    });
});

app.post('/visualRecognition', function(req, res) {

});

app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();
