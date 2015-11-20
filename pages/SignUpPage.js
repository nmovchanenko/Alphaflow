var Button    = require('../core/elements/Button.js'),
    TextInput = require('../core/elements/TextInput.js'),
    TextBlock = require('../core/elements/TextBlock.js'),
    Link      = require('../core/elements/Link.js'),
    CheckBox  = require('../core/elements/CheckBox.js');

var SignUpPage = function() {
    this.txbEmail               = new TextInput(by.id('afSignupEmail'), 'Signup Email');
    this.txbRepeatEmail         = new TextInput(by.id('afRepeatSignupEmail'), 'Repeat Signup Email');
    this.txbPassword            = new TextInput(by.id('afSignupPassword'), 'Signup Password');
    this.txbConfirmPassword     = new TextInput(by.id('afSignupPasswordConfirm'), 'Confirm Password');
    this.txbFirstName           = new TextInput(by.id('afSignupFirstName'), 'Signup First Name');
    this.txbLastName            = new TextInput(by.id('afSignupLastName'), 'Signup Last Name');
    this.btnLogin               = new Button(by.id('afLoginFormSubmit'), 'Login Form Submit');
    this.signUpButton           = new Button(by.css('.submit'), 'Sign Up Form Submit');
    this.checkBoxTerms          = new CheckBox(by.xpath("//input[@type='checkbox']"), 'Accept terms and conditions checkbox');
    this.userRegistredMessage   = new TextBlock(by.css(".alert-success"), 'User sucessfully registered message');
    this.errorIncorrectPassword = new TextBlock(by.xpath("//p[contains(@ng-show, 'afSignupPassword.$invalid')]"), 'Incorrect password error message');

    this.openSignUpPage = function() {
        browser.get('/signup');
    };

};
module.exports = SignUpPage;