var CustomError = require('../exceptions/CustomError.js');

var BaseElement = function (locator, description) {
    this.webElement         = element(locator);
    this.elementDescription = description || 'Web Element';
};

BaseElement.prototype.click = function() {
    var descr = this.elementDescription;
    return this.webElement.click().then(function() {
        logger.info("'%s' :: click", descr);
    }, function(err){
        throw new CustomError("Error while click on " + descr + ": "  + err.message);
    })
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
    return this.webElement.isDisplayed().then(function(booleanResult) {
        booleanResult ? logger.info('%s: is displayed', descr) : logger.info('%s: is not displayed', descr);
        return booleanResult;
    }, function(err){
        throw new CustomError(err.message);
    })
};

BaseElement.prototype.isPresent = function () {
    var descr = this.elementDescription;
    return this.webElement.isPresent().then(function(booleanResult) {
        booleanResult ? logger.info('%s: is present', descr) : logger.info('%s: is not present', descr);
        return booleanResult;
    }, function(err){
        throw new CustomError(err.message);
    })
};

module.exports = BaseElement;
