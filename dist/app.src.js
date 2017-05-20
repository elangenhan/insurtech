var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    watson = require('watson-developer-cloud');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

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

app.post('/conversation', function(req, res) {
    var body = req.body;
    var message = body.message;
    var context = "";
    body.context != null ? context = JSON.parse(body.context) : context = {}

    conversation.message({
        workspace_id: '9f919328-5d6f-464b-a2ff-ea9bb86f8c2e',
        input: {
            'text': message
        },
        context: context
    }, function(err, response) {
        if (err) {
            console.log('error:', err);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(response));
        }
    });
});

app.post('/visualRecognition', function(req, response) {
    var body = req.body;
	var context = "";
    body.context != null ? context = JSON.parse(body.context) : context = {}
    var url = req.body.url;

    var image = url;
    var paramsCarFruits = {
        url: url,
        classifier_ids: ['fruits_1741951189']
    };
    // should be empty = car
    var paramsCarAccident = {
        url: url,
        classifier_ids: ['accident_164647303']
    };

    visual_recognition_carfruits.classify(paramsCarFruits, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(res, null, 2));

            if (res.images[0].classifiers.length > 0) {

                context.isCar = "false";
                context.isAccident = "false";
                conversation.message({
                    workspace_id: '9f919328-5d6f-464b-a2ff-ea9bb86f8c2e',
                    input: {
                        'text': 'photo'
                    },
                    context: context
                }, function(err, res) {
                    if (err) {
                        console.log('error:', err);
                    } else {
                        response.setHeader('Content-Type', 'application/json');
                        response.send(JSON.stringify(res));
                    }
                });
            } else {
                visual_recognition_caraccident.classify(paramsCarAccident, function(err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(JSON.stringify(res, null, 2));

                        if (res.images[0].classifiers.length > 0) {
                            context.isCar = "true";
                            context.isAccident = "true";
                            conversation.message({
                                workspace_id: '9f919328-5d6f-464b-a2ff-ea9bb86f8c2e',
                                input: {
                                    'text': 'photo'
                                },
                                context: context
                            }, function(err, res) {
                                if (err) {
                                    console.log('error:', err);
                                } else {
                                    response.setHeader('Content-Type', 'application/json');
                                    response.send(JSON.stringify(res));
                                }
                            });
                        } else {
                            context.isCar = "true";
                            context.isAccident = "false";
                            conversation.message({
                                workspace_id: '9f919328-5d6f-464b-a2ff-ea9bb86f8c2e',
                                input: {
                                    'text': 'photo'
                                },
                                context: context
                            }, function(err, res) {
                                if (err) {
                                    console.log('error:', err);
                                } else {
                                    response.setHeader('Content-Type', 'application/json');
                                    response.send(JSON.stringify(res));
                                }
                            });
                        }
                    }
                });
            }
        }
    });
});

app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();