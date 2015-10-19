var BaseOperations = require('../common/BaseOperations.js');
var base = new BaseOperations();

var RealEstatePage = function() {
    var realEstatePageHeader = element(by.xpath('//h2[contains(text(),\'Real Estate - Investment Dashboard\')]'));
    /* My Investments table: */
    var btnSelectItemsPerPage = element(by.xpath('//span[@class=\'k-select\']/span[@class=\'k-icon k-i-arrow-s\']'));
    var itemsCounter = element(by.xpath('//span[@class=\'k-pager-info k-label\']'));
    var lnkDisabledGoLastPage = element(by.xpath('//div[@class=\'k-pager-wrap k-grid-pager k-widget k-floatwrap\']/a[last()][@class=\'k-link k-pager-nav k-pager-last k-state-disabled\']'));
    var lnkGoNextPage = element(by.xpath('//a[@title=\'Go to the next page\']/span'));
    var nextPage = element(by.xpath('//a[@title=\'Go to the next page\']'));
    // filters
    var btnPlatformList = element(by.xpath('//span[@data-field=\'platformName\']//div'));
    // element.all(by.xpath(‘//div[@title='Fundrise']’)).count()



    this.filterInvestmentsByPlatform = function(platform) {
        btnPlatformList.click();
        element(by.xpath('//li[contains(text(),\'' + platform + '\')]')).click();
    };



    this.hasNextPage = function() {
        browser.executeScript("document.getElementsByClassName('k-pager-wrap k-grid-pager k-widget k-floatwrap')[0].scrollIntoView();");
        return nextPage.getAttribute('class') == "k-link k-pager-nav";
    };

    this.clickNextPage = function () {
        lnkGoNextPage.click();
        console.log('clicked')
    };

    this.getRealEstatePageHeader = function() {
        return realEstatePageHeader.getText();
    };

};
module.exports = RealEstatePage;