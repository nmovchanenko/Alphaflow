/**
 * Created by mikalai.mauchanenka on 04.11.2015.
 */
var BaseElement = require('./BaseElement.js');

var TextInput = function (locator, description) {
    BaseElement.apply(this, arguments);
};

TextInput.prototype = Object.create(BaseElement.prototype);
TextInput.prototype.constructor = TextInput;

TextInput.prototype.typeText = function(text) {
    var descr = this.elementDescription;
    this.webElement.sendKeys(text).then(function() {
        logger.info(descr + ': typed \'' + text + '\'');
    });
};

TextInput.prototype.clear = function() {
    var descr = this.elementDescription;
    this.webElement.clear().then(function() {
        logger.info(descr + ': cleared');
    });
};

module.exports = TextInput;