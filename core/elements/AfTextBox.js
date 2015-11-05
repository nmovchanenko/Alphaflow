/**
 * Created by mikalai.mauchanenka on 04.11.2015.
 */
var BaseElement = require('./BaseElement.js');

var AfTextBox = function (locator, description) {
    BaseElement.apply(this, arguments);
};

AfTextBox.prototype = Object.create(BaseElement.prototype);
AfTextBox.prototype.constructor = AfTextBox;

AfTextBox.prototype.typeText = function(text) {
    var descr = this.elDesc;
    this.webElement.sendKeys(text).then(function() {
        logger.info(descr + ': type \'' + text + '\'');
    });
};

AfTextBox.prototype.clear = function() {
    var descr = this.elDesc;
    this.webElement.clear().then(function() {
        logger.info(descr + ': cleared');
    });
};

module.exports = AfTextBox;