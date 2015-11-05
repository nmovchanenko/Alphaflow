var basePage = require('../core/BasePage');

var LogInPage = function() {
    var emailTextField = element(by.id('afEmail'));
    var passwordTextField = element(by.id('afPassword'));
    var logInButton = element(by.id('afLoginFormSubmi'));
    var validationMessage = element(by.xpath('//div[1]/div/p'));

    this.openLoginPage = function() {
        perform.openPage('/login');
    };

    this.typeEmail = function(email) {
        perform.typeText(emailTextField, email);
    };

    this.typePassword = function(password) {
        perform.typeText(passwordTextField, password);
    };

    this.clickLogin = function() {
        perform.clickOn(logInButton);
    };

    //this.loginAs = function(email, password) {
    //    emailTextField.sendKeys(email);
    //    passwordTextField.sendKeys(password);
    //    logInButton.click();
    //};

    this.getValidationMessage = function() {
        return validationMessage.getText();
    };

};
module.exports = LogInPage;