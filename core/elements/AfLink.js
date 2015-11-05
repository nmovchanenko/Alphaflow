/**
 * Created by mikalai.mauchanenka on 04.11.2015.
 */
var BaseElement = require('./BaseElement.js');

//-------------------------------------------------------------------------------------
var AfLink = function (locator, description) {
    BaseElement.apply(this, arguments);
};

AfLink.prototype = Object.create(BaseElement.prototype);
AfLink.prototype.constructor = AfLink;

AfLink.prototype.click = function() {
    var descr = this.elDesc;
    this.webElement.click().then(function() {
        logger.info(descr + ': click');
    });
};

AfLink.prototype.getHref = function() {
    return this.webElement.getAttribute('href');
};


module.exports = AfLink;