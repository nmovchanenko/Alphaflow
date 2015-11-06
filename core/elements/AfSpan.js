/**
 * Created by mikalai.mauchanenka on 05.11.2015.
 */
var BaseElement = require('./BaseElement.js');

//-------------------------------------------------------------------------------------
var AfSpan = function (locator, description) {
    BaseElement.apply(this, arguments);
};

AfSpan.prototype = Object.create(BaseElement.prototype);
AfSpan.prototype.constructor = AfSpan;


module.exports = AfSpan;