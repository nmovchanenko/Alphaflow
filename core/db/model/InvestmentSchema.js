var mongoose = require('../mongoose.js'),
    PlatformSchema = require('./PlatformSchema.js'),
    //MetricsSchema = require('../models/metric.js').model('Metric')
    Schema   = mongoose.Schema;

// Define schema
var InvestmentSchema = new mongoose.Schema({
    name: {type: String}  //a name use to identify this in Platform (i,e. "123 Main St")
  , platform: { type: mongoose.Schema.Types.ObjectId, ref: 'Platform' } //the platform this came through for a specific user
  , platformInvestmentId: {type: String}    //a unique identifier in Platform system (their own ID)
  , pictureUrls: [String] //link to picture urls for this investment. first one is main one displayed
  , amount: {type: Number}    //the amount or size of this investment
  //, sponsor: {'type': mongoose.Schema.Types.ObjectId, 'ref': 'BusinessEntity', 'index': true }  //who is sponsoring this investment
  , sponsor: {type: String}
  , assetClass: {type: Number, enum: [1,2]}  //see values of investmentAssetClassEnum. it's inherited from Platform it comes from unless platform does multiple groups. We use it here to quickly filter investments by group
  , type: {type: String}  //investment type. for Real estate: debt (1st, 2nd, mezz) | equity | hybrid
  , class: {type: String} //SFT, OFF, MF
  , status: {type: Number}      //0 - unknown, 10 - Funding, 20 - Failed, 30 - Funded, 40 - Active, 50 - Default, 60 - Completed
  //, term: {type: Number}      //loan term in months
  , events: { //models the events that can exist in the lifecycle of this investment
      addedOn: {type: Date},    //date when this investment appeared on a specific platform (or we learned about it)
      fundedOn: {type: Date},   //date when a deal was funded (100% money raised)
      closedOn: {type: Date},   //closed date/started date. also this is when the investment moves in active status and interest gets paid to
      maturesOn: {type: Date},   //date in the future when this matures (completes). may get extended
      nextDistributionOn: {type: Date}  //next payment (earnings) date
  }
  , metrics: [{
    metric: { type: mongoose.Schema.Types.ObjectId, ref: 'Metric' },     //the metric name, i.e. IRR, CoC, LTV
    actual: Number,   //actual value
    projected: Number //projected/promised value
  }]
  , platformInvestmentGrade: String //platform specific investment grade if any
  , address: {
      lastGeocoded: {type: Date, default: Date.now},
      addressString: {type: String},
      streetLine1: {type: String},
      streetLine2: {type: String},
      city: {type: String},
      state: {type: String},
      zip: {type: String},
      location: {
        lng: {type: Number},
        lat: {type: Number}
      }
  },
  lastSync: {type: Date, default : Date.now, required: true},  //last time when this was sync'd with the record of truth.
  lastUpdated: {type: Date}
});

var InvestmentUserDataSchema = new mongoose.Schema({
  investment: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //now user data
  data: {
    notes: String   //max 5000 char field that allows the user to save specific notes to this investment
  }
});

var Investment = mongoose.model('Investment', InvestmentSchema);
module.exports = Investment;

var InvestmentUserData = mongoose.model('InvestmentUserData', InvestmentUserDataSchema);
module.exports = InvestmentUserData;
