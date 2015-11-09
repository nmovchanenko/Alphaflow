'use strict';

/**
 * MongoDB configuration using generators (with the help of co-mongo package).
 */

var comongo = require('kongo'),
    connect = comongo.Client.connect,
    config = require('./config'),
    mongoose = require('mongoose'),
    co = require('co')
  ;

// extending and exposing top co-mongo namespace like this is not optimal but it saves the user from one extra require();
module.exports = comongo;
/**
 * Opens a new connection to the mongo database, closing the existing one if exists.
 */
comongo.connect = function *() {
  comongo.ObjectId = mongoose.Types.ObjectId;

  if (comongo.db) {
    yield comongo.db.close();
  }
  if (comongo.statsdb) {
    yield comongo.statsdb.close();
  }

  // export mongo db instance
  var db = comongo.db = yield connect(config.mongo.url, config.mongo.options);
  var statsdb = comongo.statsdb = yield connect(config.mongoStats.url, config.mongoStats.options);

  // export default collections
  comongo.users = db.collection('users');
  comongo.usersyncs = db.collection('usersyncs');
  comongo.platforms = db.collection('platforms');
  comongo.investments = db.collection('investments');
  comongo.investments_excel = db.collection('investments_excel');
  comongo.contributions = db.collection('contributions');
  comongo.shorturls =  db.collection('shorturls');

  //init mongoose now
  co(function *(){
    mongoose.alphaflow = function() {
      return mongoose.createConnection(config.mongo.url, config.mongo.options, function(err) {
        if (err) {
          console.error('Failed to connect to mongo '+config.mongo.url+' on startup - retrying in 1 sec', err);
          setTimeout(mongoose.alphaflow, 1000);
        }
      });
    }();
    mongoose.alphaflow_stats = function() {
      var mongoOptions = config.mongo.options;
      return mongoose.createConnection(config.mongoStats.url, config.mongoStats.options, function(err) {
        if (err) {
          console.error('Failed to connect to mongo '+config.mongoStats.url+' on startup - retrying in 1 sec', err);
          setTimeout(mongoose.alphaflow_stats, 1000);
        }
      });
    }();

    mongoose.alphaflow
      .on('error', console.error.bind(console, 'Mongo connection error:'))
      .on('connected', console.log.bind(console,'Mongo connected to ' + mongoose.alphaflow.host))
      .on('disconnected',console.log.bind(console,'Mongo LOST connection to ' + mongoose.alphaflow.host))
      .on('reconnected',console.log.bind(console, 'Mongo RE-connected to ' + mongoose.alphaflow.host))
    ;

    mongoose.alphaflow_stats
      .on('error', console.error.bind(console, 'Mongo Stats connection error:'))
      .on('connected', console.log.bind(console,'Mongo Stats connected to ' + mongoose.alphaflow_stats.host))
      .on('disconnected',console.log.bind(console,'Mongo Stats LOST connection to ' + mongoose.alphaflow_stats.host))
      .on('reconnected',console.log.bind(console, 'Mongo Stats RE-connected to ' + mongoose.alphaflow_stats.host))
    ;

  })();
};
