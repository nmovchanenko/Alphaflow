var SignUpPageExample = function() {

    this.txbEmail = function () {
        return element(by.id('afSignupEmail'));
    };

    this.txbRepeatEmail = function () {
        return element(by.id('afRepeatSignupEmail'));
    };

    this.txbPassword = function() {
        return element(by.id('afSignupPassword'));
    };

    this.confirmPasswordTextBox = function() {
        return element(by.id('afSignupPasswordConfirm'));
    };

    this.txbFirstName = function () {
        return element(by.id('afSignupFirstName'));
    };

    this.txbLastName = function () {
        return element(by.id('afSignupLastName'));
    };

    this.btnLogin = function () {
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
module.exports = SignUpPageExample;