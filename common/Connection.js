/*//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/demo';
var mangoConnection = MongoClient.connect('mongodb://localhost:27017/demo');

module.exports = {
    connect: function () {
        return connectToMongo;
    },

    getCity: function (city) {
        if (!city) {
            throw new Error('No id passed');
        }

        return mangoConnection.then(function (db) {
            var codes = db.collection('zipcode');

            return codes.find({city: city}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    console.log('Found:', result);
                } else {
                    console.log('No document(s) found with defined "find" criteria!');
                }
                return result;
            });
        });
    }

};*/

// Use connect method to connect to the Server
/*
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);

        // Get the documents collection
        var collection = db.collection('zipcode');

        collection.find({city: 'LONDON'}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else if (result.length) {
                console.log('Found:', result);
            } else {
                console.log('No document(s) found with defined "find" criteria!');
            }
            //Close connection
            db.close();
        });
    }
});*/
