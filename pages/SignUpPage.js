var SignUpPage = function() {
    var emailTextBox = element(by.id('afSignupEmail'));
    var repeatEmailTextBox = element(by.id('afRepeatSignupEmail'));
    var passwordTextBox = element(by.id('afSignupPassword'));
    var firstNameTextBox = element(by.id('afSignupFirstName'));
    var lastNameTextBox = element(by.id('afSignupLastName'));
    var logInButton = element(by.id('afLoginFormSubmit'));

    this.openSignUpPage = function() {
        browser.get('/signup');
    };

    this.txbPassword = function() {
        return passwordTextBox;
    };

    this.txbEmail = function () {
        return emailTextBox;
    };

    this.txbRepeatEmail = function () {
        return repeatEmailTextBox;
    };

    this.txbFirstName = function () {
        return firstNameTextBox;
    };

    this.txbLastName = function () {
        return lastNameTextBox;
    };

};
module.exports = SignUpPage;