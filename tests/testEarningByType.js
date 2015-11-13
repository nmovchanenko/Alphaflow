"use strict";

var co = require('co');
var mongo = require('./../config/mongo');
var _ = require('lodash');
var constants = require('./constants/businessLogic').model('investmentAssetClassEnum');

co(function *() {
    yield mongo.connect();

    var UserSchema = require('./../models/user.js').model('User');
    var ContributionSchema = require('./../models/contribution').model('Contribution');

    var userId = new mongo.ObjectId('555cb819c6e3ee0300b63876');
    var user = yield UserSchema.findOne({_id: userId});

    var platformIds = user.connectedPlatforms.map(p => new mongo.ObjectId(p.platform));

    var contributions = yield ContributionSchema.find({
        owner: userId,
        platform: {$in: platformIds}
    })
        .populate('investment platform')
        .exec();

       var realEstate = constants.investmentAssetClassEnum['Real Estate'];
      var consumerLoans = constants.investmentAssetClassEnum['Consumer Loan'];

    var userActiveReContribsEquity = _.filter(contributions, c => c.investment
        && c.investment.status <= 40 && c.investment.type && c.investment.type.contains('Equity')
        && c.investment.assetClass === realEstate);

    var earningsByPlatformEquity = _(userActiveReContribsEquity)
        .forEach(function(c) {
            c.earningSum = _(c.earnings)
                .filter(e => e.type !== 'Principal' && e.amount >0)
                .sum('amount');
        })
        .sum('earningSum');

    console.log('Real Estate Equity: ' + earningsByPlatformEquity);

    var userActiveReContribsDebt = _.filter(contributions, c => c.investment
    && c.investment.status <= 40  && c.investment.type && c.investment.type.contains('Debt')
    && c.investment.assetClass === realEstate);


    var earningsByPlatformDebt = _(userActiveReContribsDebt)
        .forEach(function(c) {
            c.earningDebtSum = _(c.earnings)
                .filter(e => e.type !== 'Principal' && e.amount >0)
                .sum('amount');
        })
        .sum('earningDebtSum');

    console.log('Real Estate Debt:  '+ earningsByPlatformDebt);

    var userConsumerLoans = _.filter(contributions, c => c.investment
    && c.investment.status <= 40 && c.investment.type && c.investment.type.contains('Debt')
    && c.investment.assetClass === consumerLoans);

    var earningsByConsumer = _(userConsumerLoans)
        .forEach(function(c) {
            c.earningConsSum = _(c.earnings)
                .filter(e => e.type !== 'Principal' && e.amount >0)
                .sum('amount');
        })
        .sum('earningConsSum');

    console.log("Consumer Loans: " + earningsByConsumer);

    process.exit(0);
})();