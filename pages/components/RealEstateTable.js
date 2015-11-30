var TextBlock    = require('../../core/elements/TextBlock.js'),
    Link         = require('../../core/elements/Link.js'),
    Button       = require('../../core/elements/Button.js'),
    Investment   = require('../../common/Investment.js');

var RealEstateTable = function() {
    var keyCount            = 0;
    var map                 = new Map();
    var btnDisabledNextPage = new Button(by.xpath("//ul[@class='k-pager-numbers k-reset']/following-sibling::a[@class='k-link k-pager-nav k-state-disabled']"), "Disabled 'Go to the next page'");
    var btnNextPage         = new Link(by.xpath("//a[@title='Go to the next page']"), "Next Page");

    /**
     * Read earnings from all pages
     * @return {Promise} Array with 'Earning' objects
     */
    this.getInvestmentsCollection = function() {
        return readPages().then(function() {
            "use strict";
            return map;
        });
    };

    /**
     * Read earnings on pages and save them into collection
     * @return {[Promise]}
     */
    var readPages = function() {
        var grid = element.all(by.xpath("//tbody[@role='rowgroup']/tr"));

        return grid.each(function(element, index) {
            var rowNumber = index + 1;
            readRow(rowNumber).then(investment => {
                "use strict";
                map.set(keyCount++, investment);
            })
        }).then(function () {
            btnDisabledNextPage.isPresent().then(isPresent => {
                "use strict";
                if (!isPresent) {
                    btnNextPage.click().then(function () {
                        readPages();
                    });
                } else {
                    logger.info("Last page reached");
                }
            })
        });
    };

    /**
     * Read a row and create an Earning
     * @param  {[int]} rowNumber number
     */
    var readRow = function(rowNumber) {
        // focus on table
        browser.executeScript("document.getElementsByClassName('k-grid-header')[0].scrollIntoView();");
        var investment = new Investment();

        // will return a promise with filled earning
        return readAmount(rowNumber).then(amount => {
            investment.setAmount(parseAmount(amount));
            return readName(rowNumber);
        }).then(name => {
            investment.setName(name);
            return investment;
        })
    };

    /**
     * Read a cell of amount
     * @param  {[int]} rowNumber
     * @return {Promise}     String amount
     */
    var readAmount = function(rowNumber) {
        var amountCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[4]//div[@class='text-center ng-binding']"), "Amount");
        return amountCell.getText();
    };

    /**
     * Read a cell of investment name
     * @param  {[int]} rowNumber
     * @return {Promise}     String investment name
     */
    var readName = function(rowNumber) {
        var nameCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[2]//a"), "Investment name");
        return nameCell.getText();
    };

    /**
     * Will parse the number from the table cell: remove symbols '$', '()' or ','
     * If the value is enclosed in parentheses (e.g. '($40,000.00)) it will be parsed to negative number
     * @param displayedValue
     * @returns {*} Float
     */
    var parseAmount = function (displayedValue) {
        var parsedSymbols;
        if (displayedValue.startsWith('(')) {
            parsedSymbols = displayedValue.replace(/[$,()]/g, "");
            return parseFloat(parsedSymbols) * (-1);
        }
        parsedSymbols = displayedValue.replace(/[$,]/g, "");
        return parseFloat(parsedSymbols);
    }
};

module.exports = RealEstateTable;