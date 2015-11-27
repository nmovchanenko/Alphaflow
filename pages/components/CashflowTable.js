var TextBlock = require('../../core/elements/TextBlock.js'),
    Link      = require('../../core/elements/Link.js'),
    Earning   = require('../../common/Earning.js');

var CashflowTable = function() {
    var earningArray  = [];
    var btnDisabledNextPage = element(by.xpath("//ul[@class='k-pager-numbers k-reset']/following-sibling::a[@class='k-link k-pager-nav k-state-disabled']"));
    var btnNextPage      = new Link(by.xpath("//a[@title='Go to the next page']"), "Next Page");

    /**
     * Read earnings from all pages 
     * @return {Promise} Array with 'Earning' objects
     */
    this.getEarnings = function() {
        return readPages().then(function() {
            "use strict";
            return earningArray;
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
            readRow(rowNumber).then(earning => {
                "use strict";
                earningArray.push(earning);
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
        var earning = new Earning();

        // will return a promise with filled earning
        return readCategory(rowNumber).then(category => {
            earning.setCategory(category);
            return readDate(rowNumber);
        }).then(date => {
            earning.setDate(date);
            return readAmount(rowNumber);
        }).then(amount => {
            earning.setAmount(parseAmount(amount));
            return readName(rowNumber);
        }).then(name => {
            earning.setName(name);
            return readType(rowNumber);
        }).then(type => {
            earning.setType(type);
            return earning;
        })
    };

    /**
     * Read a cell of date
     * @param  {[int]} rowNumber
     * @return {Promise}     String date
     */
    var readDate = function(rowNumber) {
        var dateCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[1]"), "Date");
        return dateCell.getText();
    };

    /**
     * Read a cell of amount
     * @param  {[int]} rowNumber
     * @return {Promise}     String amount
     */
    var readAmount = function(rowNumber) {
        var amountCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[2]"), "Amount");
        return amountCell.getText();
    };

    /**
     * Read a cell of investment name
     * @param  {[int]} rowNumber
     * @return {Promise}     String investment name
     */
    var readName = function(rowNumber) {
        var nameCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[3]/span"), "Investment name");
        return nameCell.getText();
    };

    /**
     * Read a cell of investment type
     * @param  {[int]} rowNumber
     * @return {Promise}     String investment type
     */
    var readType = function(rowNumber) {
        var typeCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[6]/span"), "Type");
        return typeCell.getText();
    };

    /**
     * Read a cell of investment category
     * @param  {[int]} rowNumber
     * @return {Promise}     String category
     */
    var readCategory = function(rowNumber) {
        var categoryCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[7]/span"), "Category");
        return categoryCell.getText();
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

module.exports = CashflowTable;