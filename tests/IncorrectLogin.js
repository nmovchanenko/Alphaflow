/**
 * Created by mikalai.mauchanenka on 08.10.2015.
 */
var LogInPage = require('../pages/LogInPage.js');
var userData = require('../resources/users.json');

describe('Login page', function() {
    it('should display validation message', function() {
        var logInPage = new LogInPage();
        logInPage.openLoginPage();
        logInPage.loginAs(userData.user2Email, userData.user2Pass);
        expect(logInPage.getValidationMessage()).toEqual('Invalid email or password was passed.');
    });
});
