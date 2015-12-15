"use strict";
var BaseTable = require('./BaseTable.js'),
    TextBlock = require('../../core/elements/TextBlock.js'),
    Link      = require('../../core/elements/Link.js'),
    Earning   = require('../../common/Earning.js');

class CashflowTable extends BaseTable {
    constructor(descr) {
        super(descr);
    }

    readTable() {
        // focus on Earning table
        browser.executeScript("document.getElementsByClassName('af-kendo-grid k-grid k-widget')[1].scrollIntoView();");
        return super.readPages().then(() => {
            return super.getCollection();
        });
    };

    readRow(rowNumber) {
        var earning = new Earning();

        return super.readCategory(rowNumber).then(category => {
            earning.setCategory(category);
            return super.readDate(rowNumber);
        }).then(date => {
            earning.setDate(date);
            return super.readAmount(rowNumber);
        }).then(amount => {
            earning.setAmount(this.parseAmount(amount));
            return super.readName(rowNumber);
        }).then(name => {
            earning.setName(name);
            return super.readType(rowNumber);
        }).then(type => {
            earning.setType(type);
            return earning;
        })
    };

    dateCell(rowNumber) {
        return new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[1]/div"), "Date");
    };

    amountCell(rowNumber) {
        return new TextBlock(by.xpath("//div[@class='af-kendo-grid k-grid k-widget']//tbody[@role='rowgroup']/tr[" + rowNumber + "]/td[2]"), "Amount");
    };

    nameCell(rowNumber) {
        return new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]//span[@ng-bind='dataItem.investmentName']"), "Investment name");
    };

    typeCell(rowNumber) {
        return new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]//span[@ng-bind='dataItem.type']"), "Type");
    };

    categoryCell(rowNumber) {
        return new TextBlock(by.xpath("//tbody[@role='rowgroup']/tr[" + rowNumber + "]//span[@ng-bind='dataItem.category']"), "Category");
    };
}

module.exports = CashflowTable;