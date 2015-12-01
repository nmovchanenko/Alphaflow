var mongoose = require('mongoose');
var config = require('../../settings');

var dbURI = config.get('mongoose:uri');
// Create the database connection
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    logger.info('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    logger.info('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = mongoose;