var BaseOperations = require('../common/BaseOperations.js');
var base = new BaseOperations();

var RealEstatePage = function() {
    var realEstatePageHeader = element(by.xpath('//h2[contains(text(),\'Real Estate - Investment Dashboard\')]'));
    /* My Investments table: */
    var lnkGoNextPage = element(by.xpath('//a[@title=\'Go to the next page\']/span'));
    var nextPage = element(by.xpath('//a[@title=\'Go to the next page\']'));
    // filters
    var btnPlatformList = element(by.xpath('//span[@data-field=\'platformName\']//div'));

    this.filterInvestmentsByPlatform = function(platform) {
        btnPlatformList.click();
        element(by.xpath('//li[contains(text(),\'' + platform + '\')]')).click();
    };

    /**
     *
     * @param tableSelector - the css selector for the table rows, e.g. "#leftGridContainer .ngRow"
     * @param columnSelector - the additional css selector for the columns in a row, e.g. ".ng-binding"
     * @param colNames - an array of strings with the names of the columns
     * @returns {webdriver.promise.Promise<T[]>}
     */
    var getTableValues = function(tableSelector, columnSelector, colNames) {
        return element.all(by.css(tableSelector)).map(function(row, index) {
            var columns = row.all(by.css(columnSelector));

            return columns.then(function(cols){
                var result = {};
                cols.forEach(function(col, idx) {
                    result[colNames[idx]] = col.getText();
                    result.rowElm = row;
                });
                return result;
            });
        });
    };

    /**
     *
     * @param tableSelector
     * @param columnSelector
     * @param colNames
     * @returns {*}
     */
    this.getTableValues2 = function(tableSelector, columnSelector, colNames) {
        return browser.driver.executeScript("return (function(){" +
            "var rows = []; var row = {}; var colNames = " + JSON.stringify(colNames) + ";" +
            "angular.element('" + tableSelector + " " + columnSelector + "')" +
            ".each(function(idx, c) {" +
            "  var colIdx = idx % colNames.length;" +
            "  row[colNames[colIdx]] = $(c).text();" +
            "  if (colIdx == colNames.length - 1) {" +
            "    rows.push(row);" +
            "    row = {};" +
            "  }" +
            "});" +
            "return JSON.stringify(rows);" +
            "})();").
            then(function(s) {
                var data = JSON.parse(s);
                // We have the table data, now supplement it with the WebElement for each row
                return element.all(by.css(tableSelector)).then(function(rows) {
                    _.each(rows, function(row, idx) {
                        data[idx].rowElm = row;
                    });
                    return data;
                });
            });
    };

    this.hasNextPage = function() {
        browser.executeScript("document.getElementsByClassName('k-pager-wrap k-grid-pager k-widget k-floatwrap')[0].scrollIntoView();");
        return nextPage.getAttribute('class') == "k-link k-pager-nav";
    };

    this.clickNextPage = function () {
        lnkGoNextPage.click();
    };

    this.getRealEstatePageHeader = function() {
        return realEstatePageHeader.getText();
    };

};
module.exports = RealEstatePage;