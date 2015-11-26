var ProtractorJasmineHtmlReporter = require('protractor-jasmine2-html-reporter');

var HtmlReporter = function () {

    this.getReporter = function() {

        return new ProtractorJasmineHtmlReporter({
            savePath: 'report/',
            screenshotsFolder: 'images',
            consolidate: true,
            consolidateAll: true
        });

    };
};

module.exports = new HtmlReporter;