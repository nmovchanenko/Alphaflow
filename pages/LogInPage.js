var Button      = require('../core/elements/Button.js'),
    TextInput   = require('../core/elements/TextInput.js'),
    TextBlock   = require('../core/elements/TextBlock.js'),
    Link        = require('../core/elements/Link.js');

var LogInPage = function() {
    this.txbEmail               = new TextInput(by.id('afEmail'),           'Email');
    this.txbPassword            = new TextInput(by.id('afPassword'),        'Password');
    this.btnLogin               = new Button(by.id('afLoginFormSubmit'),    'Login');
    this.divValidationMessage   = new TextBlock(by.css('.alert.alert-danger.ng-binding'));

    this.openLoginPage = function() {
        browser.get('/login');
    };

    this.getValidationMessage = function() {
        return this.divValidationMessage.getText();
    };

};
module.exports = LogInPage;