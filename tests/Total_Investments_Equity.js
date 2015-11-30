var Earning         = require('../common/Earning.js'),
    config          = require('../settings'),
    RealEstateTable = require("../pages/components/RealEstateTable.js"),
    RealEstatePage  = require("../pages/RealEstatePage.js");

describe('Total Investments', function () {
    var realEstatePage = new RealEstatePage();
    var realEstateTable = new RealEstateTable();

    it('calculate Equity', function () {
        step.loginAs(config.get('app:login'), config.get('app:password'));
        step.openRealEstate();

        realEstatePage.filterInvestmentsByType("Equity");
        realEstatePage.turnOffFilterByStatus();

        realEstateTable.getInvestmentsCollection().then(investments => {
            "use strict";
            var sumInvestment = 0;

            for (var investment of investments.values()) {
                sumInvestment += investment.getAmount();
            }
            realEstatePage.getTotalInvestmentsEquity().then(totalEquity => {
                // we need to parse totalEquity as 'sumInvestment' is float
                expect(parseFloat(totalEquity)).toEqual(Math.round(sumInvestment));
            })
        });

    });
});