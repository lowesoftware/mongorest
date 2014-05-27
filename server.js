/*
200 - OK
404 - Not Found
500 - Internal Server Error
201 - Created
304 - Not Modified
400 - Bad Request
401 - Unauthorized
403 - Forbidden
*/

var express = require('express'),
    bodyParser = require('body-parser'),
    MongoRest = require('./mongorest'),
    ObjectID = require('mongodb').ObjectID;

var app = express();

app.use(bodyParser());

mongorest = new MongoRest(app, "mongodb://localhost:27017/mongorest");

var port = Number(5000);
app.listen(port);
console.log('Listening on port ' + port + '...');