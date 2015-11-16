var BaseElement = require('./BaseElement.js'),
    CustomError = require('../exceptions/CustomError.js');

var Button = function (locator, description) {
    BaseElement.apply(this, arguments);
};

Button.prototype = Object.create(BaseElement.prototype);
Button.prototype.constructor = Button;

Button.prototype.click = function() {
    var descr = this.elementDescription;
        this.webElement.click().then(function() {
            //logger.info(descr + ': clicked');
            logger.info("%s: clicked", descr);
        }, function(err){
            throw new CustomError(err.message);
        })
};

module.exports = Button;