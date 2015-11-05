/**
 * Created by mikalai.mauchanenka on 04.11.2015.
 */
var BaseElement = function (locator, description) {
    this.webElement = element(locator);
    this.elDesc = 'Web Element';

    if(description) {
        this.elDesc = description;
    }
};

BaseElement.prototype.isEnabled = function() {
    return this.webElement.isEnabled();
};


module.exports = BaseElement;
