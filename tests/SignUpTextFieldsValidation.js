/**
 * Created by mikalai.mauchanenka on 08.10.2015.
 */
var SignUpPage = require('../pages/SignUpPage.js');
var data = require('../resources/regexpData.json');

describe('SignUp page', function() {
    it('should contain Password regexp validation', function() {
        var signUpPage = new SignUpPage();
        signUpPage.openSignUpPage();

        expect(signUpPage.txbPassword().getAttribute('ng-pattern')).toEqual(data.password);
    });

    it('should contain Email regexp validation', function() {
        var signUpPage = new SignUpPage();
        expect(signUpPage.txbEmail().getAttribute('ng-pattern')).toEqual(data.email);
    });

    it('should contain First Name regexp validation', function() {
        var signUpPage = new SignUpPage();
        expect(signUpPage.txbFirstName().getAttribute('ng-pattern')).toEqual(data.userName);
    });

    it('should contain Last Name regexp validation', function() {
        var signUpPage = new SignUpPage();
        expect(signUpPage.txbLastName().getAttribute('ng-pattern')).toEqual(data.userName);
    });
});
