/**
 * Created by bogdan on 9/8/15.
 * Models user dashboard analytics, that is, pre-calculated stats & charts to avoid angular side real time computations
 * It is intended to be updated once an account syncs and then used for store & retrieve from client side (angular).
 */

var mongoose = require('mongoose')
  , PlatformSchema = require('./platform.js')
  , InvestmentSchema = require('./investment.js')
  , ContributionSchema = require('./contribution.js')
  , UserSchema = require('./user.js')
  ;

// Define schema
var DashboardSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true } //who is the AI that owns this dashboard
  , realestate: {       //stats pertaining to realestate investments
      overview: {
        debt: {
          active: {
            count: Number,
            amount: Number
          },
          count: Number,
          amount: Number,
        },
        equity: {
          active: {
            count: Number,
            amount: Number
          },
          count: Number,
          amount: Number
        }
      },
      breakdown: {
        activeByPlatform:[{
          platform: {type: mongoose.Schema.Types.ObjectId, ref: 'Platform'},
          amount: Number,
          count: Number
        }],
        activeByAssetClass:[{
          assetClass: String,
          amount: Number, //dollar amount
          count: Number   //number of items
        }]
      }
    }
  , consumerloans: {    //stats pertaining to consumer loan investments
    overview: {
      paymentsReceived: Number,   //dollar amount
      principalRepaid: Number,    //dollar amount
      chargeOffs: Number          //dollar amt
    },
    notesSummary:{
      active: {
        count: Number,
        amount: Number
      },
      count: Number,
      amount: Number
    }
  }
});

ContributionSchema.index({owner: 1, investment: 1}, {unique: true});

module.exports = exports = mongoose.alphaflow.model('Dashboard', DashboardSchema);