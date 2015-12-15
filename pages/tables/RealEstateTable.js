"use strict";
var BaseTable = require('./BaseTable.js'),
    TextBlock = require('../../core/elements/TextBlock.js'),
    Link      = require('../../core/elements/Link.js'),
    Investment   = require('../../common/Investment.js');

class RealEstateTable extends BaseTable {
    constructor(descr) {
        super(descr);
    }

    readTable() {
        // focus on Real Estate investments table
        browser.executeScript("document.getElementsByClassName('af-kendo-grid k-grid k-widget')[0].scrollIntoView();");
        return super.readPages().then(() => {
            return super.getCollection();
        });
    };

    readRow(rowNumber) {
        var investment = new Investment();

        return super.readAmount(rowNumber).then(amount => {
            investment.setAmount(super.parseAmount(amount));
            return super.readName(rowNumber);
        }).then(name => {
            investment.setName(name);
            return investment;
        })
    };

    amountCell(rowNumber) {
        return new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[5]//div[@class='text-left ng-binding']"), "Amount");
    };

    nameCell(rowNumber) {
        return new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[3]//a"), "Investment name");
    };

}

module.exports = RealEstateTable;