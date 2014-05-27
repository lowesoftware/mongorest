// private
var mongoclient = require('mongodb').MongoClient
var mongoconfig;

// constructor
function MongoRest(expressapp, config) {
	mongoconfig = config;


	// get a document by id
	expressapp.get('/:collection/:id', function(req, res) {
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
	expressapp.get('/:collection', function(req, res) {
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
	expressapp.put('/:collection/:id', function(req, res) {
		mongorest.update(req.params.collection, {_id:new ObjectID(req.params.id)}, req.body, function (err, result) {
			if(err) {
				res.json(500, err);
				return;
			}

			res.json(200);
		});
	    
	});


	// update a document by id
	expressapp.post('/:collection/:id', function(req, res) {
		mongorest.modify(req.params.collection, {_id:new ObjectID(req.params.id)}, req.body, function (err, result) {
			if(err) {
				res.json(500, err);
				return;
			}

			res.json(200);
		});
	    
	});



	// delete a document by id
	expressapp.delete('/:collection/:id', function(req, res) {
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
	expressapp.post('/:collection', function(req, res) {
		mongorest.insert(req.params.collection, req.body, function (err, result) {
			if(err) {
				res.json(500, err);
				return;
			}

			res.json(200, result);
		});
	    
	});

}


// database methods
MongoRest.prototype.find = function(collection, filter, callback) {
	mongoclient.connect(mongoconfig, function(err, db) {
		if(err) {
			callback(err);
			return;
		}
    	db.collection(collection).find(filter).toArray( function(err, result) {
    		if(err) {
    			callback(err);
    			return;
    		}

    		callback(undefined, result);
    	});
	});
}

MongoRest.prototype.insert = function(collection, obj, callback) {
	mongoclient.connect(mongoconfig, function(err, db) {
		if(err) {
			callback(err);
			return;
		}
    	db.collection(collection).insert(
    		obj, 
			{w:1}, 
			function (err, result) {
				if(err) {
					callback(err);
					return;
				}

				callback(undefined, result[0]);
			}
		);
	});
}

MongoRest.prototype.modify = function(collection, filter, values, callback) {
	mongoclient.connect(mongoconfig, function(err, db) {
		if(err) {
			callback(err);
			return;
		}
    	db.collection(collection).findAndModify(
			filter, 
			[],
			{$set: values},
			{},
			function (err, result) {
				if(err) {
					callback(err);
					return;
				}

				callback(undefined, result);
			}
		);
	});
}


MongoRest.prototype.update = function(collection, filter, values, callback) {
	mongoclient.connect(mongoconfig, function(err, db) {
		if(err) {
			callback(err);
			return;
		}
    	db.collection(collection).findAndModify(
			filter, 
			[], 
			values,
			{},
			function (err, result) {
				if(err) {
					callback(err);
					return;
				}

				callback(undefined, result);
			}
		);
	});
}

MongoRest.prototype.remove = function(collection, filter, callback) {
	mongoclient.connect(mongoconfig, function(err, db) {
		if(err) {
			callback(err);
			return;
		}
    	db.collection(collection).remove(
			filter, 
			function (err, result) {
				if(err) {
					callback(err);
					return;
				}

				callback(undefined, result);
			}
		);
	});
}

//export the class
module.exports = MongoRest;