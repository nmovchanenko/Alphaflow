var TextBlock = require('../../core/elements/TextBlock.js'),
    Link      = require('../../core/elements/Link.js'),
    Earning   = require('../../common/Earning.js');

var CashflowTable = function() {
    var map           = new Map();
    var earningArray  = [];
    var btnDisabledNextPage = element(by.xpath("//ul[@class='k-pager-numbers k-reset']/following-sibling::a[@class='k-link k-pager-nav k-state-disabled']"));
    var btnNextPage      = new Link(by.xpath("//a[@title='Go to the next page']"), "Next Page");

    /**
     * Read earnings from all pages 
     * @return {Promise} Array with 'Earning' objects
     */
    this.getEarnings = function() {
        return readPage().then(function() {
            "use strict";
            return earningArray;
        });
    };

    /**
     * Read earnings on single page
     * @return {[Promise]} 
     */
    var readPage = function() {
        var grid = element.all(by.xpath("//tbody[@role='rowgroup']/tr"));

        return grid.each(function(element, index) {
            var rowNumber = index + 1;
            readRow(rowNumber).then(earning => {
                "use strict";
                //map.set(index++, earning);
                earningArray.push(earning);
            })
        }).then(function () {
            btnDisabledNextPage.isPresent().then(isPresent => {
                "use strict";
                if (!isPresent) {
                    btnNextPage.click().then(function () {
                        readPage();
                    });
                } else {
                    logger.info("Last page reached");
                }
            })
        });
    };

    /**
     * Read a row and create an Earning
     * @param  {[int]} row number 
     * @return {[Promise]} Earning object
     */
    var readRow = function(row) {
        // focus on table
        browser.executeScript("document.getElementsByClassName('k-grid-header')[0].scrollIntoView();");
        var earning = new Earning();

        // will return a promise with filled earning
        return readDate(row).then(date => {
            earning.setDate(date);
            return readAmount(row);
        }).then(amount => {
            earning.setAmount(parseFloat(amount.replace(/[$,]/g, "")));
            return readName(row);
        }).then(name => {
            earning.setName(name);
            return readType(row);
        }).then(type => {
            "use strict";
            earning.setType(type);
            return earning;
        })
    };

    /**
     * Read a cell of date
     * @param  {[int]} row number
     * @return {Promise}     String date
     */
    var readDate = function(row) {
        var dateCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + row + "]/td[1]"), "'Date' cell");
        return dateCell.getText();
    };

    /**
     * Read a cell of amount
     * @param  {[int]} row number
     * @return {Promise}     String amount
     */
    var readAmount = function(row) {
        var amountCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + row + "]/td[2]"), "'Amount' cell");
        return amountCell.getText();
    };

    /**
     * Read a cell of investment name
     * @param  {[int]} row number
     * @return {Promise}     String investment name
     */
    var readName = function(row) {
        var nameCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + row + "]/td[3]/span"), "'Investment name' cell");
        return nameCell.getText();
    };

    /**
     * Read a cell of investment type
     * @param  {[int]} row number
     * @return {Promise}     String investment type
     */
    var readType = function(row) {
        var nameCell = new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + row + "]/td[6]/span"), "'Type' cell");
        return nameCell.getText();
    };
};

module.exports = CashflowTable;