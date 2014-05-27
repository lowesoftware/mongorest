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

mongorest = new MongoRest("mongodb://localhost:27017/mongorest");


// get a document by id
app.get('/:collection/:id', function(req, res) {
	mongorest.find(req.params.collection, {_id:new ObjectID(req.params.id)}, function (err, result) {
		if(err) {
			res.json(500, err);
			return;
		}

		if(result.length == 0) {
			res.json(404, {});
			return;
		}

		res.json(200, result[0]);
	});
    
});



// list all documents with an optional filter
app.get('/:collection', function(req, res) {
	if(!req.query.filter) {
		req.query.filter = "{}"
	};
	
	mongorest.find(req.params.collection, JSON.parse(req.query.filter), function (err, result) {
		if(err) {
			res.json(500, err);
			return;
		}

		if(result.length == 0) {
			res.json(404, {});
			return;
		}

		res.json(200, result);
	});
    
});



// replace a document by id
app.put('/:collection/:id', function(req, res) {
	mongorest.update(req.params.collection, {_id:new ObjectID(req.params.id)}, req.body, function (err, result) {
		if(err) {
			res.json(500, err);
			return;
		}

		res.json(200);
	});
    
});


// update a document by id
app.post('/:collection/:id', function(req, res) {
	mongorest.modify(req.params.collection, {_id:new ObjectID(req.params.id)}, req.body, function (err, result) {
		if(err) {
			res.json(500, err);
			return;
		}

		res.json(200);
	});
    
});



// delete a document by id
app.delete('/:collection/:id', function(req, res) {
	mongorest.remove(req.params.collection, {_id:new ObjectID(req.params.id)}, function (err, result) {
		if(err) {
			res.json(500, err);
			return;
		}

		if(result == 0) {

		}

		res.json(200);
	});
    
});


// create a document
app.post('/:collection', function(req, res) {
	mongorest.insert(req.params.collection, req.body, function (err, result) {
		if(err) {
			res.json(500, err);
			return;
		}

		res.json(200, result);
	});
    
});

var port = Number(3030);
app.listen(port);
console.log('Listening on port ' + port + '...');