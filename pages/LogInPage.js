var AfButton    = require('../core/elements/AfButton.js'),
    AfTextBox   = require('../core/elements/AfTextBox.js'),
    AfSpan      = require('../core/elements/AfSpan.js'),
    AfDiv       = require('../core/elements/AfDiv.js'),
    AfLink      = require('../core/elements/AfLink.js');

var LogInPage = function() {
    this.txbEmail               = new AfTextBox(by.id('afEmail'),           'Email');
    this.txbPassword            = new AfTextBox(by.id('afPassword'),        'Password');
    this.btnLogin               = new AfButton(by.id('afLoginFormSubmit'),  'Login');
    this.divValidationMessage   = new AfDiv(by.css('.alert.alert-danger.ng-binding'));

    this.openLoginPage = function() {
        browser.get('/login');
    };

    this.getValidationMessage = function() {
        return this.divValidationMessage.getText();
    };

};
module.exports = LogInPage;