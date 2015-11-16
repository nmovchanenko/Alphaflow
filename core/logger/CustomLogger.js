var log4js = require('log4js');

var CustomLogger = function() {

    this.getCustomLogger = function() {

        log4js.configure({
            "appenders": [{
                "type": "log4js-protractor-appender"
            }]
        });

        return log4js.getLogger();
    };
};

module.exports = new CustomLogger;