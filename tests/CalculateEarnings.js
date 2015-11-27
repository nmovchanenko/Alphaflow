var Earning = require('../common/Earning.js'),
    config = require('../settings'),
    CashflowTable = require("../pages/components/CashflowTable.js"),
    CashflowPage = require("../pages/CashflowsPage.js");

describe('Test earning', function () {
    var cashflowPage = new CashflowPage();
    var cashFlowTable = new CashflowTable();

    it('read earning', function () {
        step.loginAs(config.get('app:login'), config.get('app:password'));

        step.openCashflows();

        // focus on table
        browser.executeScript("document.getElementsByClassName('k-grid-header')[0].scrollIntoView();");
        cashflowPage.filterInvestmentsByType('Equity');

        cashFlowTable.getEarnings().then(earningsArray => {
            "use strict";
            var calculatedEarnings = 0;

            for (var i = 0; i < earningsArray.length; i++) {
                // if earning's category is 'Principal', skip calculating
                if(earningsArray[i].getCategory().localeCompare("Principal") == 0) {
                    logger.debug("Skipped Principal. Its amount was: %s", earningsArray[i].getAmount());
                } else {
                    calculatedEarnings += earningsArray[i].getAmount();
                }
            }

            cashflowPage.getEarningsLifetimeEquity().then(lifetimeEquity => {
                // we need to parse lifetimeEquity as 'calculatedEarnings' is float
                expect(parseFloat(lifetimeEquity)).toEqual(Math.round(calculatedEarnings));
            })
        });

    });
});