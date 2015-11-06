var BaseElement = require('./BaseElement.js'),
    CustomError = require('../exceptions/CustomError.js');

var AfButton = function (locator, description) {
    BaseElement.apply(this, arguments);
};

AfButton.prototype = Object.create(BaseElement.prototype);
AfButton.prototype.constructor = AfButton;

AfButton.prototype.click = function() {
    var descr = this.elementDescription;
        this.webElement.click().then(function() {
            logger.info(descr + ': clicked');
        }, function(err){
            throw new CustomError(err.message);
        })
};

module.exports = AfButton;