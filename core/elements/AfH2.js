/**
 * Created by mikalai.mauchanenka on 05.11.2015.
 */
var BaseElement = require('./BaseElement.js');

var AfH2 = function (locator, description) {
    BaseElement.apply(this, arguments);
};

AfH2.prototype = Object.create(BaseElement.prototype);
AfH2.prototype.constructor = AfH2;

module.exports = AfH2;