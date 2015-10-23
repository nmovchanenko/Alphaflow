var SignUpPage = function() {

    this.emailTextBox = function () {
        return element(by.id('afSignupEmail'));
    };

    this.repeatEmailTextBox = function () {
        return element(by.id('afRepeatSignupEmail'));
    };

    this.passwordTextBox = function() {
        return element(by.id('afSignupPassword'));
    };

    this.confirmPasswordTextBox = function() {
        return element(by.id('afSignupPasswordConfirm'));
    };

    this.firstNameTextBox = function () {
        return element(by.id('afSignupFirstName'));
    };

    this.lastNameTextBox = function () {
        return element(by.id('afSignupLastName'));
    };

    this.logInButton = function () {
      return element(by.css('.submit'));
    };

    this.checkBoxTerms = function () {
      return element(by.xpath("//input[@type='checkbox']"));
    };

    this.userRegistredMessage = function () {
        return element(by.css(".alert-success"));
    };

    this.errorIncorrectPassword = function () {
        return element(by.xpath("//p[contains(@ng-show, 'afSignupPassword.$invalid')]"));
    };

   this.getMessages = function() {
        var messages = {
            'incorrectPassword': 'Password field length should be at least 8 characters, contain at least one number and one uppercase letter.',
            'successfulLogin': 'Your account has been created and needs to be activated, please check your email for an activation link.'
        };
        return messages;
    }

};
module.exports = SignUpPage;