var BaseElement = require('./BaseElement.js'),
    CustomError = require('../exceptions/CustomError.js');

var ListBox = function (locator, description) {
    BaseElement.apply(this, arguments);
};

ListBox.prototype = Object.create(BaseElement.prototype);
ListBox.prototype.constructor = ListBox;

ListBox.prototype.getOptions = function() {
    //TODO
    this.webElement.all(by.tagName('option'));
};

ListBox.prototype.getSelectedOptions = function() {
    //TODO
    this.webElement.all(by.css('option[selected="selected"]'));
};

ListBox.prototype.selectByValue = function(value) {
    var descr = this.elementDescription;
    this.webElement.all(by.css('option[value="' + value + '"]')).click().then(function() {
        logger.info("ListBox '%s':: select '%s'", value);
    }, function(err){
        throw new CustomError("Error while select '" + value + "' from '" + descr + "' ListBox: " + err.message);
    });
};

ListBox.prototype.selectByPartialText = function(text) {
    //TODO
    this.webElement.all(by.cssContainingText('option', text)).click();
};

ListBox.prototype.selectByText = function(text) {
    browser.executeScript("document.evaluate(\"//li[text()='" + text + "']\"," +
        " document.documentElement," +
        " null," +
        " XPathResult.ORDERED_NODE_SNAPSHOT_TYPE," +
        " null).snapshotItem(0).click();");
};

module.exports = ListBox;