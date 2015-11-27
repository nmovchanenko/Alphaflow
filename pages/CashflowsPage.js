var Button    = require('../core/elements/Button.js'),
	TextInput = require('../core/elements/TextInput.js'),
	TextBlock = require('../core/elements/TextBlock.js'),
	Link      = require('../core/elements/Link.js'),
	Earning   = require('../common/Earning.js');

var Cashflows = function() {
    var btnCategoryList = new Button(by.xpath("//span[@data-field='type']//span[@class='k-icon k-i-arrow-s']"), 'Show categories');
    var btnInvestmentTypeList = new Button(by.xpath("//span[@data-field='investmentType']//span[@class='k-icon k-i-arrow-s']"), 'Show investment types');
    var tbEarningsLifetimeEquity = new TextBlock(by.xpath("//div[@class='col-lg-4'][3]//h2[@class='font-bold ng-binding']"), "Earnings Lifetime: Real Estate Equity");

    this.filterInvestmentsByCategory = function(category) {
        btnCategoryList.click();
        perform.isVisible(element(by.xpath("//li[contains(text(),'" + category + "')]")));
        element(by.xpath("//li[contains(text(),'" + category + "')]")).click();
    };

    this.filterInvestmentsByType = function(type) {
        btnInvestmentTypeList.click();
        perform.isVisible(element(by.xpath("//li[contains(text(),'" + type + "')]")));
        element(by.xpath("//li[contains(text(),'" + type + "')]")).click();
    };

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