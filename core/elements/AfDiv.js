/**
 * Created by mikalai.mauchanenka on 05.11.2015.
 */
var BaseElement = require('./BaseElement.js');

var AfDiv = function (locator, description) {
    BaseElement.apply(this, arguments);
};

AfDiv.prototype = Object.create(BaseElement.prototype);
AfDiv.prototype.constructor = AfDiv;

module.exports = AfDiv;