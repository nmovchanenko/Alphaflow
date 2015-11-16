var CustomError = require('../exceptions/CustomError.js');

var BaseElement = function (locator, description) {
    this.webElement         = element(locator);
    this.elementDescription = 'Web Element';

    if(description) {
        this.elementDescription = description;
    }
};

BaseElement.prototype.getAttribute = function(attribute) {
    var descr = this.elementDescription;
    return this.webElement.getAttribute(attribute).then(function(result) {
        logger.info(descr + ': got the attribute \'' + attribute + '\' is: ' + result);
        return result;
    }, function(err){
        throw new CustomError(err.message);
    });
};

BaseElement.prototype.getText = function() {
    var descr = this.elementDescription;
    return this.webElement.getText().then(function(result) {
        logger.info(descr + ': got the text: ' + result);
        return result;
    }, function(err){
        throw new CustomError(err.message);
    })
};

BaseElement.prototype.isDisplayed = function() {
    var descr = this.elementDescription;
    return this.webElement.isDisplayed().then(function(result) {
        logger.info(descr + ': is displayed: ' + result);
        return result;
    }, function(err){
        throw new CustomError(err.message);
    })
};

module.exports = BaseElement;
