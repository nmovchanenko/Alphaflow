/**
 * Created by mikalai.mauchanenka on 06.11.2015.
 */
var log4js = require('log4js');

var CustomLogger = function() {

    this.getLogger = function() {
        log4js.configure({
            "appenders": [{
                "type": "log4js-protractor-appender"
            }]
        });
        return log4js.getLogger();
    };
};

module.exports = new CustomLogger;