var Button    = require('../core/elements/Button.js'),
	TextInput = require('../core/elements/TextInput.js'),
	TextBlock = require('../core/elements/TextBlock.js'),
	Link      = require('../core/elements/Link.js'),
	Earning   = require('../common/Earning.js');

var Cashflows = function() {
    var tbEarningsLifetimeEquity = new TextBlock(by.xpath("//div[@k-data-source='cashFlowsTotalsDataSource']//tbody//tr[2]//td[4]//h5"), "Earnings Lifetime: Real Estate Equity");

    this.getEarningsLifetimeEquity = function() {
        // focus on the element
        browser.executeScript("document.getElementsByClassName('k-grid-header')[0].scrollIntoView();");
        return tbEarningsLifetimeEquity.getText().then(sum => {
            "use strict";
            return sum.replace(/[$,]/g, "");
        });
    };

};

module.exports = Cashflows;