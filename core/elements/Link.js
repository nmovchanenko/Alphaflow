var CustomError = require('../exceptions/CustomError.js'),
    BaseElement = require('./BaseElement.js');

var Link = function (locator, description) {
    BaseElement.apply(this, arguments);
};

Link.prototype = Object.create(BaseElement.prototype);
Link.prototype.constructor = Link;

Link.prototype.click = function() {
    var descr = this.elementDescription;
    return this.webElement.click().then(function() {
        "use strict";
        logger.info("Link %s :: click", descr);
    }, function(err) {
        "use strict";
        throw new CustomError("Error while click on '" + descr + "' link: "  + err.message);
    });
};

Link.prototype.getHref = function() {
    return this.webElement.getAttribute('href');
};


module.exports = Link;