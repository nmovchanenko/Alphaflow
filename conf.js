/*
 For using HtmlReporter install 'protractor-html-screenshot-reporter' module in project folder:
 npm install protractor-html-screenshot-reporter
 */

var HtmlReporter = require('protractor-html-screenshot-reporter');
var path = require('path');
var reporter = new HtmlReporter({
    baseDirectory: 'report/screenshots',
    takeScreenShotsOnlyForFailedSpecs: true,
    takeScreenShotsForSkippedSpecs: true,
    pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {

        var monthMap = {
            "1": "Jan",
            "2": "Feb",
            "3": "Mar",
            "4": "Apr",
            "5": "May",
            "6": "Jun",
            "7": "Jul",
            "8": "Aug",
            "9": "Sep",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec"
        };

        var currentDate = new Date(),
            currentHoursIn24Hour = currentDate.getHours(),
            currentTimeInHours = currentHoursIn24Hour>12? currentHoursIn24Hour-12: currentHoursIn24Hour,
            totalDateString = currentDate.getDate()+'-'+ monthMap[currentDate.getMonth()+1]+ '-'+(currentDate.getYear()+1900);
                //+ '-'+ currentTimeInHours+'h-' + currentDate.getMinutes()+'m';

        return path.join(totalDateString,capabilities.caps_.browserName, descriptions.join('-'));
    }
});

exports.config = {
    seleniumAddress: 'http://192.168.88.130:4444/wd/hub',

    //specs: ['tests/*.js'],
    specs: ['tests/CheckMyInvestmentsTable.js'],

    baseUrl: 'http://qa.alphaflow.com',

    capabilities: {
        'browserName': 'firefox',
        'chromeOptions': {
            'args': ['disable-extensions', 'start-maximized', 'enable-crash-reporter-for-testing']
        },
        'loggingPrefs': {
            'browser': 'ALL'
        }
    },

    onPrepare: function() {
        //browser.driver.manage().window().setSize(1920, 1080);
        // Add a screenshot reporter:
        jasmine.getEnv().addReporter(reporter);
    },

    jasmineNodeOpts: {
        // onComplete will be called just before the driver quits.
        onComplete: null,
        // If true, display spec names.
        isVerbose: true,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 240000
    }
};