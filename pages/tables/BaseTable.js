"use strict";
var TextBlock = require('../../core/elements/TextBlock.js'),
    Link      = require('../../core/elements/Link.js'),
    Button    = require('../../core/elements/Button.js');

var keyCount            = 0,
    map                 = new Map(),
    btnDisabledNextPage = new Button(by.xpath("//ul[@class='k-pager-numbers k-reset']/following-sibling::a[@class='k-link k-pager-nav k-state-disabled']"), "Disabled 'Go to the next page'"),
    btnNextPage         = new Link(by.xpath("//a[@title='Go to the next page']"), "Next Page");

class BaseTable {
    constructor(descr){
        this.description = descr;
    }

    parseAmount(displayedValue) {
        var parsedSymbols;
        if (displayedValue.startsWith('(')) {
            parsedSymbols = displayedValue.replace(/[$,()]/g, "");
            return parseFloat(parsedSymbols) * (-1);
        }
        parsedSymbols = displayedValue.replace(/[$,]/g, "");
        return parseFloat(parsedSymbols);
    };

    getCollection() {
        return map;
    };

    /**
     * Read earnings on pages and save them into collection
     * @return {[Promise]}
     */
     readPages() {
        var grid = element.all(by.xpath("//div[@class='af-kendo-grid k-grid k-widget']//tbody[@role='rowgroup']/tr"));

        return grid.each((element, index) => {
            var rowNumber = index + 1;
            this.readRow(rowNumber).then(earning => {
                map.set(keyCount++, earning);
            })
        }).then( () => {
            btnDisabledNextPage.isPresent().then(isPresent => {
                if (!isPresent) {
                    btnNextPage.click().then( () => {
                        this.readPages();
                    });
                } else {
                    logger.info("Last page reached");
                }
            })
        });
    };

    /**
     * Read a cell of date
     * @param  {[int]} rowNumber
     * @return {}     String date
     */
    readDate(rowNumber){
        return this.dateCell(rowNumber).getText();
    };

    /**
     * Read a cell of amount
     * @param  {[int]} rowNumber
     * @return {} String amount
     */
    readAmount(rowNumber) {
        return this.amountCell(rowNumber).getText();
    };

    /**
     * Read a cell of investment name
     * @param  {[int]} rowNumber
     * @return {}     String investment name
     */
    readName(rowNumber) {
        return this.nameCell(rowNumber).getText();
    };

    /**
     * Read a cell of investment type
     * @param  {[int]} rowNumber
     * @return {}     String investment type
     */
    readType(rowNumber) {
        return this.typeCell(rowNumber).getText();
    };

    /**
     * Read a cell of investment category
     * @param  {[int]} rowNumber
     * @return {}     String category
     */
    readCategory(rowNumber) {
        return this.categoryCell(rowNumber).getText();
    };
}

module.exports = BaseTable;
