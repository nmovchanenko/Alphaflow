var Button    = require('../core/elements/Button.js'),
    TextInput   = require('../core/elements/TextInput.js'),
    TextBlock   = require('../core/elements/TextBlock.js'),
    Link      = require('../core/elements/Link.js');

var SignUpPage = function() {
    this.txbEmail       = new TextInput(by.id('afSignupEmail'),         'Signup Email');
    this.txbRepeatEmail = new TextInput(by.id('afRepeatSignupEmail'),   'Repeat Signup Email');
    this.txbPassword    = new TextInput(by.id('afSignupPassword'),      'Signup Password');
    this.txbFirstName   = new TextInput(by.id('afSignupFirstName'),     'Signup First Name');
    this.txbLastName    = new TextInput(by.id('afSignupLastName'),      'Signup Last Name');
    this.btnLogin       = new Button(by.id('afLoginFormSubmit'),        'Login Form Submit');

    this.openSignUpPage = function() {
        browser.get('/signup');
    };

};
module.exports = SignUpPage;