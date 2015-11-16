"use strict";

var co = require('co');
var mongo = require('./../config/mongo');

co(function *() {
    yield mongo.connect();

    var ObjectId = mongo.ObjectId;
    var InvestmentSchema = require('./../models/investment').model('Investment');
    var numberOfTotalInvestments =  yield InvestmentSchema.find({
        platform: {
            $in: [new ObjectId("55550708f7673300f45816b1"),
                new ObjectId("55550985f7673300f45816b2"),
                new ObjectId("555509e9f7673300f45816b3"),
                new ObjectId("55550a2af7673300f45816b4"),
                new ObjectId("55550ad9f7673300f45816b5"),
                new ObjectId("55a704c3f76733011266b4c3")]
        }
    });

    console.log("Total Number Of Real Estate Investments: ", numberOfTotalInvestments.length);
})();


