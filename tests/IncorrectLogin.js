/**
 * Created by mikalai.mauchanenka on 08.10.2015.
 */
var LogInPage = require('../pages/LogInPage.js');

describe('Login page', function() {
    it('should display validation message', function() {
        var logInPage = new LogInPage();
        logInPage.navigateToLoginPage();
        logInPage.loginAs('qwerty@gmail.com', '12345678');
        expect(logInPage.getValidationMessage()).toEqual('Invalid email or password was passed.');
    });
});
