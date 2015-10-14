var LogInPage = function() {
    var emailTextField = element(by.id('afEmail'));
    var passwordTextField = element(by.id('afPassword'));
    var logInButton = element(by.xpath('//div[5]/div/input'));
    var validationMessage = element(by.xpath('//div[1]/div/p'));

    this.openLoginPage = function() {
        browser.get('/login');
    };

    this.setEmail = function(email) {
        emailTextField.sendKeys(email);
    };

    this.setPassword = function(password) {
        passwordTextField.sendKeys(password);
    };

    this.clickLogin = function() {
        logInButton.click();
    };

    this.loginAs = function(email, password) {
        emailTextField.sendKeys(email);
        passwordTextField.sendKeys(password);
        logInButton.click();
    };

    this.getValidationMessage = function() {
        return validationMessage.getText();
    };

};
module.exports = LogInPage;