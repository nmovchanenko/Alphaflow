/**
 * Created by mikalai.mauchanenka on 04.11.2015.
 */
var BaseElement = require('./BaseElement.js');

//-------------------------------------------------------------------------------------
var AfButton = function (locator, description) {
    BaseElement.apply(this, arguments);
};

AfButton.prototype = Object.create(BaseElement.prototype);
AfButton.prototype.constructor = AfButton;

AfButton.prototype.click = function() {
    var descr = this.elDesc;
    this.webElement.click().then(function() {
        logger.info(descr + ': click');
    });
};

module.exports = AfButton;