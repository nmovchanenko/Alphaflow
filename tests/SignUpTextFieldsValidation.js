/**
 * Created by mikalai.mauchanenka on 08.10.2015.
 */
var SignUpPage = require('../pages/SignUpPage.js');

describe('SignUp page', function() {
    it('should contain Password regexp validation', function() {
        var signUpPage = new SignUpPage();
        signUpPage.navigateToSignUpPage();

        expect(signUpPage.txbPassword().getAttribute('ng-pattern')).toEqual('/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/');
    });

    it('should contain Email regexp validation', function() {
        var signUpPage = new SignUpPage();
        expect(signUpPage.txbEmail().getAttribute('ng-pattern')).toEqual('/^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$/i');
    });

    it('should contain First Name regexp validation', function() {
        var signUpPage = new SignUpPage();
        expect(signUpPage.txbFirstName().getAttribute('ng-pattern')).toEqual('/^[a-z ,.\'-]+$/i');
    });

    it('should contain Last Name regexp validation', function() {
        var signUpPage = new SignUpPage();
        expect(signUpPage.txbLastName().getAttribute('ng-pattern')).toEqual('/^[a-z ,.\'-]+$/i');
    });
});
