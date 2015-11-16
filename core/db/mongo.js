var Promise = require("bluebird");
var MongoDB = Promise.promisifyAll(require("mongodb"));
var MongoClient = Promise.promisifyAll(MongoDB.MongoClient);
Promise.promisifyAll(MongoDB.Cursor.prototype);

var Collection = MongoDB.Collection;
Collection.prototype._find = Collection.prototype.find;
Collection.prototype.findAsync = function() {
    var cursor = this._find.apply(this, arguments);
    cursor.toArrayAsync = Promise.promisify(cursor.toArray, cursor);
    cursor.countAsync = Promise.promisify(cursor.count, cursor);
    return cursor;
};

var connectToMongo = MongoClient.connectAsync('mongodb://af_qa_user:8q8a^~&r0U+(7nP@ds045333-a0.mongolab.com:45333,ds045333-a1.mongolab.com:45333/alphaflow_qa?replicaSet=rs-ds045333');
//var connectToMongo = MongoClient.connectAsync('mongodb://localhost:27017/demo');

module.exports = {
    connect: function () {
        return connectToMongo;
    },
    getUserById: function (id) {
        if (!id) {
            throw new Error('No id passed');
        }

        return connectToMongo.then(function (db) {
            var users = db.collection('users');

            return users.findAsync({_id: new MongoDB.ObjectId(id)}).toArrayAsync();
        });
    }
};
