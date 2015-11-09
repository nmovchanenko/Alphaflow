var mongoose = require('mongoose')
    , bcrypt = require('bcrypt')
    , crypto = require('crypto')
    , config = require('../config/config')
    , PlatformSchema = require('./platform.js')
    , co = require('co')
    ;

//holds syncing activity for this user across connected platforms. We choose not to store with main document due to write intensive aspect and to avoid loading a fat object in user session
var UserSyncSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema'},
  platformActivity: [{
    platform: {type: mongoose.Schema.Types.ObjectId, ref: 'PlatformSchema'},
    lastEarningSync: {
      date: Date,
      amount: Number,
      type: String,
      platformInvestmentId: String
    } //what was the last earning syncd from the list. helps knowing how far down to go in the list when syncing
  }]
});

// Define schema
var UserSchema = new mongoose.Schema({
    name : { 
        first: { type: String, required: true } 
      , last: { type: String, required: true }
      , nickname: { type: String, required: false }
    }
    , email: { type: String, unique: true, index: true }
    , activationCode: { type: String }
    , activationCodeDate: { type: Date }
    , passwordResetCode: { type: String }
    , passwordResetRequestDate: { type: Date }
    , phone: { type: String}
    , address1:  { type: String }
    , address2:  { type: String }
    , city:  { type: String }
    , state:  { type: String }
    , zip:  { type: String }
    , birthDate:  { type: Date }
    , profilePictureUrl: { type: String }
    , preferences: {
        email: {
            notifications: {
                email: {type: Boolean, default: true},
                sms: {type: Boolean, default: false},
                push: {type: Boolean, default: false}
            },
            weekly_account_activity: {
                email: {type: Boolean, default: true},
                sms: {type: Boolean, default: false},
                push: {type: Boolean, default: false}
            },
            daily_earnings: {
              email: {type: Boolean, default: true},
              sms: {type: Boolean, default: false},
              push: {type: Boolean, default: false},
              lastNotificationSentOn: {type: Date}
            },
            newsletter: {
                email: {type: Boolean, default: true},
                sms: {type: Boolean, default: false},
                push: {type: Boolean, default: false}
            },
            optOut: {type: Boolean, default: false}
        },
        investment: {
            realEstate: {type: Boolean, default: false},
            consumerLending: {type: Boolean, default: false},
            autoLoans: {type: Boolean, default: false},
            studentLoans: {type: Boolean, default: false},
            smallMediumBusinessLoans: {type: Boolean, default: false},
            earlyStageStartupEquity: {type: Boolean, default: false}
        }
    }
    , completedOnboarding: {type: Boolean}  //for new accounts if we need to go through account setup screens and know where to redirect
    , sso: [{
      provider: {type: String},
      id: {type: String}
    }]
    , connectedPlatforms: [{
      platform: { type: mongoose.Schema.Types.ObjectId, ref: 'Platform' },
      username: {type: String},
      password: {type: String},//3des encrypted
      status: {type: String}, //refresh status for this account ('syncing', 'on', 'off' - off means user chose not to import at this time but still keep it connected
      lastUpdated: {type: Date}, //when was the last time we refreshed this platform for this account
      connectedOn: {type: Date}, //when was the last time we refreshed this platform for this account
      syncScheduledDate: {type: Date}, //when was the last sync job enqueued
      nextWeeklyEmailDate: {type: Date},
      connectionStatusMessage: {type: String} //if there's an error we will specify the status here. Unless NULL, the auto-refresh won't retry
    }]
    , otherPlatformRequest: {type: String}  //user can request us to connect other platforms. free form text.
    , maxSessionLength: {type: Number, default: 1800} //in seconds, default 30 min
    , api : {
      clientSecret: { type: String},
      rateLimiter: {type: Number},  //api throttling overrider at user level
      rateLimiterDuration: {type: Number},  //the duration for the limiter (in ms)
      issuedAPIKeys: [{
        appId: {type: String, default: 'ALL'},  //if no appid restricted it will be available to ALL apps.
        key: String,
        permissions: [String]
      }]
    }
  , belongsToEntityId: [{'type': mongoose.Schema.Types.ObjectId, 'ref': 'BusinessEntity', 'index': true }]
  , securityRoles: [{type: String}]    //list of security roles by name (easy to reference and avoid look-ups)
  , salt: { type: String }
  , hash: { type: String }
  , dateCreated : {type: Date, default: Date.now}
  , dateLastLogin : {type: Date, default: Date.now, required: true}
  , status: {type: String, required: true, default: "active"}  //the status of this account: new | active | suspended | banned | closed | invited. default is new
});

UserSchema.index({ "sso.provider": 1, "sso.id": 1}, {unique: true, sparse: true });

UserSchema
  .virtual('password')
  .get(function () {
      return this._password;
  })
  .set(function (password) {
    this._password = password;
    var salt = this.salt = bcrypt.genSaltSync(10);
    this.hash = bcrypt.hashSync(password, salt);
  });

UserSchema.statics.encryptPassword = function *(password){
  //encrypt passwords
    var cipher, IV;
    //store the IV at the beginning
    IV = crypto.randomBytes(16);
    cipher = crypto.createCipheriv('aes-256-cbc', config.app.AESSecretKey, IV);
    return cipher.update(password, 'utf8', 'hex') + cipher.final('hex') + ':TAG:' + IV.toString('hex');
};

UserSchema.pre('save', function(next){
  //encrypt passwords
  if (this.connectedPlatforms && this.connectedPlatforms.length > 0){
    //encrypt all user passwords, if they were NOT encrypted already
    var cipher, IV;
    this.connectedPlatforms.forEach(function(item){
      //store the IV at the beginning
      if (item.password && item.password.split(':TAG:').length !== 2) {
        IV = crypto.randomBytes(16);
        cipher = crypto.createCipheriv('aes-256-cbc', config.app.AESSecretKey, IV);
        item.password = cipher.update(item.password, 'utf8', 'hex') + cipher.final('hex') + ':TAG:' + IV.toString('hex');
      }
    })
  }
  next();
});

//UserSchema.pre('update', function() {
  //report to mandrill
  //mailchimp.addUpdateUserToAllcustomersList.call(this, {user: this});
//};

UserSchema.method('verifyPassword', function(password, callback) {
  bcrypt.compare(password, this.hash, callback);
});

UserSchema.static('authenticate', function(email, password, callback) {
    if (email) {
        email = email.toLowerCase();
    }

    this.findOne({ email: email }, function(err, user) {
      if (err) { return callback(err); }
      if (!user || !user.hash) { return callback(null, false); }
      user.verifyPassword(password, function(err, passwordCorrect) {
        if (err) { return callback(err); }
        if (!passwordCorrect) { return callback(null, false); }
        return callback(null, user);
      });
    });
});

//helper for facebook/twitter auth strategies
UserSchema.static('findOrCreate', function(profile, callback) {
    this.findOne({ email: profile.email }, function(err, user) {
        if (err) { return callback(err); }

        if (!user) {
            //new one, we return the signup page with the prefilled info
            // so the user can also set a password then we save and log the user in
            user = new UserSchema({
                name: {first: profile.firstname, last: profile.lastname},
                email: profile.email
            });
        }
        return callback(null, user)
    });
});

if (!UserSchema.options.toObject) UserSchema.options.toObject = {};
UserSchema.options.toObject.transform = function (doc, ret, options) {
  ret.id = doc._id;
}

// make the schema available from this module.
module.exports = mongoose.alphaflow.model('User', UserSchema);
module.exports = mongoose.alphaflow.model('UserSync', UserSyncSchema);
