var BaseSteps = require('../common/BaseSteps.js'),
    TextBlock = require('../core/elements/TextBlock.js'),
    Button    = require('../core/elements/Button.js'),
    Link      = require('../core/elements/Link.js');

var RealEstatePage = function() {
    var realEstatePageHeader     = new TextBlock(by.xpath('//h2').first, 'Real Estate Header');
    var btnPlatformList          = new Button(by.xpath("//span[@data-field='platformName']//div"), 'Show Platforms');
    var btnTypeList              = new Button(by.xpath("//span[@data-field='investment.type']//div"), 'Show Types');
    var tbTotalInvestmentsEquity = new TextBlock(by.xpath("//div[@class='col-lg-4'][2]//h2[@class='no-margins ng-binding']"), "Total Investments - Equity");
    var btnClearStatusFilter     = new Button(by.xpath("//th[9]//button[@title='Clear']"), "Clear 'Status' filter");

    this.filterInvestmentsByPlatform = function(platform) {
        btnPlatformList.click();
        perform.isVisible(element(by.xpath("//li[contains(text(),'" + platform + "')]")));
        element(by.xpath('//li[contains(text(),\'' + platform + '\')]')).click();
    };

    this.filterInvestmentsByType = function(type) {
        btnTypeList.click();
        perform.isVisible(element(by.xpath("//li[contains(text(),'" + type + "')]")));
        element(by.xpath("//li[contains(text(),'" + type + "')]")).click();
    };

    this.getTotalInvestmentsEquity = function() {
        // focus on the element
        browser.executeScript("document.getElementsByClassName('k-grid-header')[0].scrollIntoView();");
        return tbTotalInvestmentsEquity.getText().then(sum => {
            "use strict";
            return sum.replace(/[$,]/g, "");
        });
    };

    this.turnOffFilterByStatus = function () {
        btnClearStatusFilter.click();
    };

    this.getRealEstatePageHeader = function() {
        return realEstatePageHeader.getText();
    };

};
module.exports = RealEstatePage;