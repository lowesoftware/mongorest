// private
var mongoclient = require('mongodb').MongoClient
var mongoconfig;

// constructor
function MongoRest(config) {
	mongoconfig = config;
}

// methods
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