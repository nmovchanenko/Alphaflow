"use strict";

var co = require('co');
var mongo = require('./../config/mongo');
var _ = require('lodash');
var constants = require('../constants/businessLogic.js');

co(function *() {
    yield mongo.connect();

    var UserSchema = require('./../models/user.js').model('User');
    var ContributionSchema = require('./../models/contribution').model('Contribution');
    var PlatformSchema = require('./../models/platform').model('Platform');
    var InvestmentSchema = require('./../models/investment').model('Investment');

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

    var userActiveReContribs = _.filter(contributions, c => c.investment
        && c.investment.status <= 40 && c.investment.status !== 15
        && c.investment.assetClass === realEstate);

    var earningsByPlatform = _(userActiveReContribs)
        .forEach(function(c) {
            c.earningSum = _(c.earnings)
                .filter(e => e.type !== 'principal')
                .sum('amount');
        })
        .groupBy(c => c.platform.name)
        .map((platformContribs, platformName) => {
            return {
                platformName: platformName,
                platformEarningsSum: _.sum(platformContribs, 'earningSum')
            }
        })
        .value();

    console.log(earningsByPlatform);


    process.exit(0);
});