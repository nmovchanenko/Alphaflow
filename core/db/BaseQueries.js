var User = require('./model/UserSchema.js'),
    co = require('co'),
    mongo = require('../db/mongoose.js');

var BaseQueries = function () {
    var ObjectId = mongo.Types.ObjectId;
    var InvestmentSchema = require('../db/model/InvestmentSchema.js').model('Investment');

    this.getTotalInvestments = function() {
        var numberOfTotalInvestments;
        return InvestmentSchema.find({
            platform: {
                $in: [
                    new ObjectId("55550708f7673300f45816b1"),
                    new ObjectId("55550985f7673300f45816b2"),
                    new ObjectId("555509e9f7673300f45816b3"),
                    new ObjectId("55550a2af7673300f45816b4"),
                    new ObjectId("55550ad9f7673300f45816b5"),
                    new ObjectId("55a704c3f76733011266b4c3")
                ]}
        }).then(totalInvestments => {
            "use strict";
            numberOfTotalInvestments = totalInvestments.length;
            logger.debug("Total Number Of Real Estate Investments: ", numberOfTotalInvestments);
            return numberOfTotalInvestments;
        });
    };
};

module.exports = BaseQueries;