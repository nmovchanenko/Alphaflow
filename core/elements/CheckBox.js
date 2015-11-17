/**
 * Created by op on 11.11.15.
 */
var BaseElement = require('./BaseElement.js');
var CustomError = require('../exceptions/CustomError.js')

var CheckBox = function(locator, description) {
    BaseElement.apply(this, arguments);
};

CheckBox.prototype = Object.create(BaseElement.prototype);
CheckBox.prototype.constructor = CheckBox;

CheckBox.prototype.isChecked = function() {

    return this.webElement.checked
};

CheckBox.prototype.check = function() {
    var descr = this.elementDescription;
    if(!this.isChecked())
    {
        this.webElement.click().then(function(){
            logger.info(descr + ': checked.');
        });
    };
    logger.info(descr + ': was already checked.');
};

CheckBox.prototype.uncheck = function() {
    var descr = this.elementDescription;
    if(webElement.isChecked())
    {
        this.webElement.click().then(function(){
            logger.info(descr + ': unchecked.');
        });
    };
    logger.info(descr + ': was already unchecked.');
};

module.exports = CheckBox;