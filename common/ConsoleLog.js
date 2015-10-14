var fs = require('fs'),
    path = require('path');

// Add global spec helpers in this file
var getDateStr = function () {
    var d = (new Date() + '').replace(new RegExp(':', 'g'), '-').split(' ');
    // "2013-Sep-03-21:58:03"
    return [d[3], d[1], d[2], d[4]].join('-');
};

var errorCallback = function (err) {
    console.log(err);
};

// create a new javascript Date object based on the timestamp
var timestampToDate = function (unix_timestamp) {
    var date = new Date(unix_timestamp);
    // hours part from the timestamp
    var hours = date.getHours();
    // minutes part from the timestamp
    var minutes = date.getMinutes();
    // seconds part from the timestamp
    var seconds = date.getSeconds();

    var timeValues = [hours, minutes, seconds];
    timeValues.forEach(function (val) {
        if (val.length < 2) {
            // padding
            val = '0' + val;
        }
    });
    // will display time in 10:30:23 format
    return hours + ':' + minutes + ':' + seconds;
};

afterEach(function () {
    // Replace all space characters in spec name with dashes
    var specName = jasmine.getEnv().currentSpec.description.replace(new RegExp(' ', 'g'), '-'),
        baseFileName = specName + '-' + getDateStr(),
        reportDir = path.resolve(__dirname + '/../report/'),
        consoleLogsDir = path.resolve(reportDir + '/logs/')

    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir);
    }

    // Flush browser console to file
    var logs = browser.driver.manage().logs(),
    logType = 'browser'; // browser
    logs.getAvailableLogTypes().then(function (logTypes) {
        if (logTypes.indexOf(logType) > -1) {
            var logFileName = path.resolve(consoleLogsDir + '/' + baseFileName + '.txt');
            browser.driver.manage().logs().get(logType).then(function (logsEntries) {
                if (!fs.existsSync(consoleLogsDir)) {
                    fs.mkdirSync(consoleLogsDir);
                }
                // Write the browser logs to file
                console.log('Writing file ' + logFileName);
                var len = logsEntries.length;
                for (var i = 0; i < len; ++i) {

                    var logEntry = logsEntries[i];

                    var msg = timestampToDate(logEntry.timestamp) + ' ' + logEntry.type + ' ' + logEntry.message;
                    fs.appendFileSync(logFileName, msg + '\r\n', {encoding: 'utf8'}, errorCallback);
                }
            }, errorCallback);
        }
    });

});