var Button    = require('../../core/elements/Button.js'),
    TextInput = require('../../core/elements/TextInput.js'),
    TextBlock = require('../../core/elements/TextBlock.js'),
    Link      = require('../../core/elements/Link.js'),
    ListBox   = require('../../core/elements/ListBox.js'),
    Earning   = require('../../common/Earning.js');

var Filter = function() {
    var btnCategory = new Button(by.xpath("//h4[text()='Category']/following-sibling::div"), "Show categories");
    var lbxType = new ListBox(by.xpath("//h4[text()='Type']/following-sibling::div"), "Type");
    var btnSearch = new Button(by.xpath("//div[@ng-click='setGridFilter();']"), "Search");

    this.filterByCategory = function(category) {
        //TODO
    };

    this.filterByType = function(type) {
        // focus on table filters
        browser.executeScript("document.getElementsByClassName('row external-filter-wrapper')[0].scrollIntoView();");

        // TODO: get rid of waiters
        var EC = protractor.ExpectedConditions;
        browser.wait(EC.visibilityOf($(".row.external-filter-wrapper")), 5000);

        lbxType.selectByText(type);
        btnSearch.click();
    };

};

module.exports = Filter;