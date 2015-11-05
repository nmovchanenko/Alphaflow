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

var connectToMongo = MongoClient.connectAsync('mongodb://af_qa_user:8q8a^~&r0U+(7nP@ds045333-a0.mongolab.com:45333,ds045333-a1.mongolab.com:45333/alphaflow_qa?replicaSet=rs-ds045333');   //mongodb://localhost:27017/alphaflow

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

            return users.findOneAsync({_id: new MongoDB.ObjectId(id)});
        });
    },

    getContributionsCollection: function() {
        return connectToMongo.then(function (db) {
            var contributions = db.collection('contributions');

            return contributions;
        });
    },

     getContributionsByPlatform: function(platformId) {
         if (!platformId) {
             throw new Error('No Platform id passed');
         }
         return this.getContributionsCollection().findAsync({_id: new MongoDB.ObjectId(platformId)}).toArrayAsync();
     },

    getContributionsByPlatformIds: function (owner, platformIds) {
        return this.getContributionsCollection().then(function (contributions) {
            return contributions.findAsync({platform: {$in: platformIds}, owner: owner}).toArrayAsync();
        })
    }
};

