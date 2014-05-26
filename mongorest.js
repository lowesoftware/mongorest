// private
var mongoclient = require('mongodb').MongoClient


// constructor
function MongoRest(conn, db) {
	this.conn = conn;
	this.db = db;
}

// methods
MongoRest.prototype.find() {

}

MongoRest.prototype.add() {

}

MongoRest.prototype.update() {

}

MongoRest.prototype.remove() {
	
}

//export the class
modules.exports = MongoRest;