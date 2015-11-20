var mongoose = require('mongoose');

// Build the connection string
var dbURI = 'mongodb://127.0.0.1:27017/test';

// Create the database connection
mongoose.connect('mongodb://af_qa_user:8q8a^~&r0U+(7nP@ds045333-a0.mongolab.com:45333,ds045333-a1.mongolab.com:45333/alphaflow_qa?replicaSet=rs-ds045333');
//mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose;