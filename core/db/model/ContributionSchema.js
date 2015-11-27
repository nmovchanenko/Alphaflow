
var mongoose = require('../mongoose.js'),
   PlatformSchema = require('./PlatformSchema.js'),
   InvestmentSchema = require('./InvestmentSchema.js'),
  UserSchema = require('./UserSchema.js'),
  Schema   = mongoose.Schema;

var EarningSchema = new Schema({
  date: Date,   //the date when the earning posted
  amount: Number,  //the amount of the earning payment
  type: String,    //the type of this earning (i.e. interest, dividend or profit_sharing
  wasNotified: {type: Boolean, default: false}  //if a notification was sent to the user regarding this earning
  },
  { _id : false });

// Define schema
var ContributionSchema = new Schema({
    platform: { type: mongoose.Schema.Types.ObjectId, ref: 'Platform' } //the platform this came through for a specific user
  , platformContributionId: {type: String}    //a unique identifier in Platform system (their own ID)
  , owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } //who is the AI that owns this contribution
  , investment: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment' } //the investment this is associated with
  , amount: {type: Number}    //the amount or size of this contribution. cannot exceed the size of the linked investment
  , events: { //models the events that can exist in the lifecycle of this contribution
      principalInvestedOn: {type: Date},  //date when the contribution was made, technically when AI wires the money out. Affects the IRR calculation.
      activeOn: {type: Date},   //closed date/started date. also this is when the investment moves in active status and interest gets paid to
      completedOn: {type: Date},   //date when this matured (completed). The platform may specify a date but that differs from the actual date the contribution was returned
      principalReturnedOn: {type: Date}  //the date the principal was returned
  }
  , earningsSummary: {          //purpose is to have a calculated summary of the Earnings array or store as is from 3rd party platform if provided
    netEarningsTotal: Number,   //earnings minus fees
    interestEarned: Number,     //the total amount of interest
    lateFeesEarned: Number,     //extra income earned from late fees
    feesPaid: Number
  }
  , earnings: [EarningSchema]   //the array of dates and amounts the user earned since the contribution date
});

//ContributionSchema.index({owner: 1, platform: 1, investment: 1}, {unique: true});
//ContributionSchema.index({owner: 1, platform: 1, platformContributionId: 1}, {unique: true});

var Contribution = mongoose.model('Contribution', ContributionSchema);
var Earnings = mongoose.model('Earnings', EarningSchema);

module.exports = Contribution;
module.exports = Earnings;