/**
 * Created by mikalai.mauchanenka on 04.11.2015.
 */
var BaseElement = require('./BaseElement.js');

//-------------------------------------------------------------------------------------
var Link = function (locator, description) {
    BaseElement.apply(this, arguments);
};

Link.prototype = Object.create(BaseElement.prototype);
Link.prototype.constructor = Link;

Link.prototype.click = function() {
    var descr = this.elementDescription;
    this.webElement.click().then(function() {
        logger.info(descr + ': clicked');
    });
};

Link.prototype.getHref = function() {
    return this.webElement.getAttribute('href');
};


module.exports = Link;