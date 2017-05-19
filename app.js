/*
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'),
    app = express(),
    fs = require('fs'),
    cors = require('cors'),
    watson = require('watson-developer-cloud'),
    bodyParser = require('body-parser'),
    reQuest = require('request');

app.use(express.static('www'));

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

var conversation = watson.conversation({
    "username": "xxx",
    "password": "xxx",
    version: 'v1',
    version_date: '2016-07-11'
});

app.get('/', function(req, res) {
    res.render('index', {
        ct: req._csrfToken
    });
});

var context = {};

app.post('/conversation', function(req, res) {
    var message = req.body.message;

    conversation.message({
      workspace_id: 'xxx',
      input: {'text': message},
      context: req.body.context
    },  function(err, response) {
      if (err)
        console.log('error:', err);
      else
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(response));
    });
});

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);