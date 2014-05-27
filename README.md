#mongorest#

##Description##

A general purpose REST interface to node collections. This API is a node app meant to be simply configured to point to a mongodb database. The methods exposed will then allow simple CRUD operations against a collection. 

More advanced options and methods will likely be added in the future to support more mongodb functionality out of the box.

This was initially built to aid in rapid prototyping of JSON document driven SPA web or mobile/Cordova applications. This allows one to spin up a general mongodb and node server and write all of the application logic in the web app while slowly then filling in more application specific REST methods.


##Features##

mongorest supports the following logical operations:

* create a new document
* update properties within a document by _id
* replace an entire document by _id
* delete a document by _id
* list records in a collection using a mongo filter condition


##Setup##

mongorest is dependent on express, body-parser, and mongodb node modules. It uses express for routing, body-parser to parse JSON documents from request bodies, and mongodb to interface with the mongo instance.

	npm install express
	npm install body-parser
	npm install mongodb

Add the mongorest.js file to your project directory. Then, create a new mongorest object with your connection string. For example:

	var express = require('express'),
	    bodyParser = require('body-parser'),
	    MongoRest = require('./mongorest'),
	    ObjectID = require('mongodb').ObjectID;

	var app = express();

	app.use(bodyParser());

	mongorest = new MongoRest(app, "mongodb://localhost:27017/mongorest"); // specify a URI to your mongo instance here

	var port = Number(5000);
	app.listen(port);
	console.log('Listening on port ' + port + '...');


##Usage##

** In process **

###Create a document###

*POST /<collection>*

_Request Body_ A JSON object to insert into the collection

_HTTP Response Codes_ 200 - OK, 500 - Error

_Response Body_ JSON If successful, a JSON object representing the entire document inserted into the mongo collection.

