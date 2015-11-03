var LogInPage = require('./LogInPage.js');
var userData = require('../resources/users.json');

describe('Login page', function() {
    it('should display validation message', function() {
        var logInPage = new LogInPage();
        logInPage.openLoginPage();
        logInPage.loginAs(userData.user1Email, userData.user1Pass);
        expect(logInPage.getValidationMessage()).toEqual('Invalid email or password was passed.');
    });
});
