/**
 * Created by mikalai.mauchanenka on 11.11.2015.
 */
var BaseElement = require('./BaseElement.js'),
    CustomError = require('../exceptions/CustomError.js');

var TextBlock = function (locator, description) {
    BaseElement.apply(this, arguments);
};

TextBlock.prototype = Object.create(BaseElement.prototype);
TextBlock.prototype.constructor = TextBlock;

BaseElement.prototype.getText = function() {
    var descr = this.elementDescription;
    return this.webElement.getText().then(function(result) {
        logger.info("TextBlock %s :: get text: %s", descr, result);
        return result;
    }, function(err){
        throw new CustomError("Error while get text of '" + descr + "': "  + err.message);
    })
};

module.exports = TextBlock;