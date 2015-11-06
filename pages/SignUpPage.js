var AfButton    = require('../core/elements/AfButton.js'),
    AfTextBox   = require('../core/elements/AfTextBox.js'),
    AfSpan      = require('../core/elements/AfSpan.js'),
    AfDiv       = require('../core/elements/AfDiv.js'),
    AfLink      = require('../core/elements/AfLink.js');

var SignUpPage = function() {
    this.txbEmail       = new AfTextBox(by.id('afSignupEmail'),         'Signup Email');
    this.txbRepeatEmail = new AfTextBox(by.id('afRepeatSignupEmail'),   'Repeat Signup Email');
    this.txbPassword    = new AfTextBox(by.id('afSignupPassword'),      'Signup Password');
    this.txbFirstName   = new AfTextBox(by.id('afSignupFirstName'),     'Signup First Name');
    this.txbLastName    = new AfTextBox(by.id('afSignupLastName'),      'Signup Last Name');
    this.btnLogin       = new AfButton(by.id('afLoginFormSubmit'),      'Login Form Submit');

    this.openSignUpPage = function() {
        browser.get('/signup');
    };

};
module.exports = SignUpPage;