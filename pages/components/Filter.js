var Button    = require('../../core/elements/Button.js'),
    TextInput = require('../../core/elements/TextInput.js'),
    TextBlock = require('../../core/elements/TextBlock.js'),
    Link      = require('../../core/elements/Link.js'),
    ListBox   = require('../../core/elements/ListBox.js'),
    Earning   = require('../../common/Earning.js');

var Filter = function() {
    var btnCategory = new Button(by.xpath("//h4[text()='Category']/following-sibling::div"), "Show categories");
    //TODO find valid locator
    var lbxType = new ListBox(by.xpath("//h4[text()='Type']/following-sibling::div"), "Type");
    var btnSearch = new Button(by.xpath("//div[@ng-click='setGridFilter();']"), "Search");

    this.filterByCategory = function(category) {
        btnCategory.click();
        var txbCategoryListItem = new TextBlock(by.xpath("//div[@class='k-animation-container']//li[contains(text(),'" + category + "')]"));
        perform.isVisible(txbCategoryListItem);
        txbCategoryListItem.click();
    };

    this.filterByType = function(type) {
        // focus on filter section
        browser.executeScript("document.getElementsByClassName('row external-filter-wrapper')[0].scrollIntoView();");
        lbxType.manualSelect(type);
        btnSearch.click();
    };

};

module.exports = Filter;