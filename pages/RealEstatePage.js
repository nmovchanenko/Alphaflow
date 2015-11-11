var BaseSteps   = require('../common/BaseSteps.js'),
    TextBlock   = require('../core/elements/TextBlock.js'),
    Button    = require('../core/elements/Button.js'),
    Link      = require('../core/elements/Link.js');

var RealEstatePage = function() {
    this.realEstatePageHeader   = new TextBlock(by.xpath('//h2'),                                       'Real Estate Header');
    this.lnkGoNextPage          = new TextBlock(by.xpath('//a[@title=\'Go to the next page\']/span'),   'Go to the next page');
    this.nextPage               = new Link(by.xpath('//a[@title=\'Go to the next page\']'));
    this.btnPlatformList        = new Button(by.xpath('//span[@data-field=\'platformName\']//div'),     'Show Platforms');

    this.filterInvestmentsByPlatform = function(platform) {
        this.btnPlatformList.click();
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
        return this.nextPage.getAttribute('class') == "k-link k-pager-nav";
    };

    this.clickNextPage = function () {
        this.lnkGoNextPage.click();
    };

    this.getRealEstatePageHeader = function() {
        return this.realEstatePageHeader.getText();
    };

    function readRow(rowNumber) {

        return new Promise(function(resolve, reject) {
            var investmentDataInRow = new Map();

            var platformName = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[1]//div[@class=\'text-center\']'));
            investmentDataInRow.set('platform', platformName.getWebElement().getAttribute('title'));

            var investmentTitle = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[2]//a'));
            investmentDataInRow.set('title', investmentTitle.getText());

            var investmentType = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[3]//div[@class=\'text-center ng-binding\']'));
            investmentDataInRow.set('type', investmentType.getText());

            var investedSum = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[4]//div[@class=\'text-center ng-binding\']'));
            investmentDataInRow.set('invested', investedSum.getText().then(function (text) {return text.replace(/[$,]/g, "");}));

            var investmentClass = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[5]//div[@class=\'text-center ng-binding\']'));
            investmentDataInRow.set('class', investmentClass.getText());

            var investmentSponsor = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[7]/div[@class=\'ng-binding\']'));
            investmentDataInRow.set('sponsor', investmentSponsor.getText());

            var investmentState = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[8]//div[@class=\'text-center ng-binding\']'));

            var investmentStatus = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[9]//div[@class=\'text-center\']'));

            var investmentPercentOfDollar = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[10]//div[@class=\'ng-binding\']'));

            resolve(investmentDataInRow);
        });
    }

    this.readInvestmentsOnPage = function() {

        return new Promise(function(resolve, reject) {
            // variable 'grid' contains rows, which are represented on the first page of Investment table
            var grid = $$('tbody[role=\'rowgroup\']>tr');
            // array index of 'dbData'
            var index = 0;
            var rowNumber = 1;

            grid.each(function () {
                describe('Investment table', function() {
                    it('check each row', function () {
                        // focus on the 'My Investments' table
                        browser.executeScript("document.getElementsByClassName('k-grid-content')[0].scrollIntoView();");
                        readRow(rowNumber).then(investmentMap => {
                            expect(investmentMap.get('platform')).toEqual(dbData[index].platform);
                            expect(investmentMap.get('title')).toEqual(dbData[index].title);

                        });
                        index++;
                        rowNumber++;
                    })
                })
            });

            resolve(RealEstatePage.hasNextPage());
        });

    };

    this.readTable = function() {
        return new Promise(function(resole, reject) {
            var tableData = new Map();
            var pageAmount = getPageAmount();

            pageAmount.each(function() {
                readPage().then(map => {
                    tableData.set('platform', map.get(0));
                    tableData.set('title', map.get(1));
                })
            });

            resole(tableData);
        });
    };

    function getRowAmount() {
        return element.all(by.xpath('//tbody[@role=\'rowgroup\']/tr')).count();
    }

    function getPageAmount() {
        return element(by.xpath('//a[@title=\'Go to the last page\']')).getAttribute('data-page');
    }

    function readPage() {
        return new Promise(function(resolve, reject){
            var dataMap = new Map();
            var rows = $$('tbody[role=\'rowgroup\']>tr');
            var rowNumber = 1;

            rows.each(function() {
                readRow(rowNumber).then(map => {
                    dataMap.set('platform', map.get(0));
                    dataMap.set('title', map.get(1));
                });
                rowNumber++;
            });

            resolve(dataMap);
        })
    }


};
module.exports = RealEstatePage;