var mongoose = require('../mongoose.js'),
    Schema   = mongoose.Schema;

var UserSchema = new Schema({
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

var User = mongoose.model('User', UserSchema);

module.exports = User;