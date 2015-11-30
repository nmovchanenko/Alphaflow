var adminDashboard = require('../pages/AdminDashboardPage.js');
var config = require('../settings');
var co = require('co');
var mongo = require('../core/db/mongoose.js');

describe('Number of investments on Admin page by Platforms', function () {

    var adminPage = new adminDashboard();
    step.loginAs(config.get('testUser2:login'), config.get('testUser2:password'));
    adminPage.openAdminDashboardPage();

    it('Total should contain number of all investments', function () {

        "use strict";
        var numberOfTotalInvestments;
        co(function * ()
        {
            var ObjectId = mongo.Types.ObjectId;
            var InvestmentSchema = require('../core/db/model/InvestmentSchema.js').model('Investment');
            var totalInvestments = yield InvestmentSchema.find({
                platform: {
                    $in: [new ObjectId("55550708f7673300f45816b1"),
                        new ObjectId("55550985f7673300f45816b2"),
                        new ObjectId("555509e9f7673300f45816b3"),
                        new ObjectId("55550a2af7673300f45816b4"),
                        new ObjectId("55550ad9f7673300f45816b5"),
                        new ObjectId("55a704c3f76733011266b4c3")]
                }
            });
            numberOfTotalInvestments = totalInvestments.length;
            console.log("Total Number Of Real Estate Investments: ", numberOfTotalInvestments);


            expect(adminPage.totalNumberOfInvestments.getText()).toEqual(numberOfTotalInvestments);
        })();
    });
});

