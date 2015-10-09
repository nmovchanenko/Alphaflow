/**
 * Created by mikalai.mauchanenka on 08.10.2015.
 */
var SignUpPage = function() {
    var emailTextBox = element(by.id('afSignupEmail'));
    var passwordTextBox = element(by.xpath('//form/div[2]/div/input'));
    var firstNameTextBox = element(by.id('afSignupFirstName'));
    var lastNameTextBox = element(by.id('afSignupLastName'));

    var logInButton = element(by.xpath('//div[5]/div/input'));

    this.openSignUpPage = function() {
        browser.get('/signup');
    };

    this.txbPassword = function() {
        return passwordTextBox;
    };

    this.txbEmail = function () {
        return emailTextBox;
    };

    this.txbFirstName = function () {
        return firstNameTextBox;
    };

    this.txbLastName = function () {
        return lastNameTextBox;
    };

};
module.exports = SignUpPage;