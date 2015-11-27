"use strict";

var co = require('co');
var _ = require('lodash');
var constants = require('../constants/businessLogic');
var mongoose = require('../core/db/mongoose.js');

co(function *() {

    var UserSchema = require('./../core/db/model/UserSchema.js').model('User');
    var ContributionSchema = require('./../core/db/model/ContributionSchema.js').model('Contribution');
    var PlatformSchema = require('./../core/db/model/PlatformSchema.js').model('Platform');

    var userId = new mongoose.Types.ObjectId('5577e03dd5b0510300e5a38e');
    var user = yield UserSchema.findOne({_id: userId});

    var platformIds = user.connectedPlatforms.map(p => new mongoose.Types.ObjectId(p.platform));

    var contributions = yield ContributionSchema.find({
        owner: userId,
        platform: {$in: platformIds}
    })
        .populate('investment platform')
        .exec();

    var realEstate = constants.investmentAssetClassEnum['Real Estate'];

    console.log(realEstate);

    var userActiveReContribs = _.filter(contributions, c => c.investment
        && c.investment.status != 70
        && c.investment.assetClass === realEstate);

    var earningsByPlatform = _(userActiveReContribs)
        .forEach(function(c) {
            c.earningSum = _(c.earnings)
                .filter(e => e.type !== 'Principal')
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
})();