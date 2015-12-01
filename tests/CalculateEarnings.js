var Earning = require('../common/Earning.js'),
    config = require('../settings'),
    CashflowTable = require("../pages/components/CashflowTable.js"),
    CashflowPage = require("../pages/CashflowsPage.js");

describe('Test earning', function () {
    var cashflowPage = new CashflowPage();
    var cashFlowTable = new CashflowTable();

    it('read earning', function () {
        step.loginAs(config.get('testUser2:login'), config.get('testUser2:password'));

        step.openCashflows();

        // focus on table
        browser.executeScript("document.getElementsByClassName('k-grid-header')[0].scrollIntoView();");
        cashflowPage.filterInvestmentsByType('Equity');

        cashFlowTable.getCollection().then(earningsCollection => {
            "use strict";
            var calculatedEarnings = 0;

            for (var earning of earningsCollection.values()) {
                // if earning's category is 'Principal', skip calculating
                if(earning.getCategory().localeCompare("Principal") == 0) {
                    logger.debug("Skipped Principal. Its amount was: %s", earning.getAmount());
                } else {
                    calculatedEarnings += earning.getAmount();
                }
            }

            cashflowPage.getEarningsLifetimeEquity().then(lifetimeEquity => {
                // we need to parse lifetimeEquity as 'calculatedEarnings' is float
                expect(parseFloat(lifetimeEquity)).toEqual(Math.round(calculatedEarnings));
            })
        });

    });
});