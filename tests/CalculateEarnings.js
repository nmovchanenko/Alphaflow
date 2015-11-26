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
        cashflowPage.filterInvestmentsByCategory('Dividend');

        cashFlowTable.getEarnings().then(earnings => {
            "use strict";
            var calculatedEarnings = 0;
            for (var i = 0; i < earnings.length; i++) {
                calculatedEarnings += earnings[i].getAmount();
            }
            expect(cashflowPage.getEarningsLifetimeEquity()).toEqual(Math.round(calculatedEarnings));
        });

    });
});