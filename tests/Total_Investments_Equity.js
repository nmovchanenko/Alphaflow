var Earning         = require('../common/Earning.js'),
    config          = require('../settings'),
    RealEstateTable = require("../pages/tables/RealEstateTable.js"),
    RealEstatePage  = require("../pages/RealEstatePage.js"),
    Filter          = require("../pages/components/Filter.js"),
    co              = require('co');

describe('Total Investments', function () {
    var realEstatePage = new RealEstatePage(),
        realEstateTable = new RealEstateTable(),
        filter = new Filter();

    it('calculate Equity', function () {

        co(function * () {
            step.loginAs(config.get('testUser2:login'), config.get('testUser2:password'));
            step.openRealEstate();

            //TODO: switch to enums instead of hardcode
            filter.filterByType("Equity");

            var investments = yield realEstateTable.readTable();

            var sumInvestment = 0;
            for (var investment of investments.values()) {
                sumInvestment += investment.getAmount();
            }
            var totalEquity = yield realEstatePage.getTotalInvestmentsEquity();

            // we need to parse totalEquity as 'sumInvestment' is float
            expect(parseFloat(totalEquity)).toEqual(Math.round(sumInvestment));
        })();

    });
});