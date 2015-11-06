var LogInPage   = require('../pages/LogInPage.js'),
    userData    = require('../resources/users.json');

describe('Login page', function() {
    it('should display validation message', function() {
        var logInPage = new LogInPage();

        logInPage.openLoginPage();
        logInPage.txbEmail.typeText(userData.user1Email);
        logInPage.txbPassword.typeText(userData.user1Pass);
        logInPage.btnLogin.click();

        expect(logInPage.getValidationMessage()).toEqual('Invalid email or password was passed.');
    });
});
