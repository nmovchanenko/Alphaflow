var SignUpPage  = require('../pages/SignUpPage.js'),
    data        = require('../resources/regexpData.json');

describe('SignUp page', function() {
    var signUpPage = new SignUpPage();

    it('should contain Email regexp validation', function() {
        signUpPage.openSignUpPage();
        expect(signUpPage.txbEmail.getAttribute('ng-pattern')).toEqual(data.email);
    });

    it('should contain Repeat Email regexp validation', function() {
        expect(signUpPage.txbRepeatEmail.getAttribute('ng-pattern')).toEqual(data.email);
    });

    it('should contain Password regexp validation', function() {
        expect(signUpPage.txbPassword.getAttribute('ng-pattern')).toEqual(data.userPass);
    });

    it('should contain First Name regexp validation', function() {
        expect(signUpPage.txbFirstName.getAttribute('ng-pattern')).toEqual(data.userName);
    });

    it('should contain Last Name regexp validation', function() {
        expect(signUpPage.txbLastName.getAttribute('ng-pattern')).toEqual(data.userName);
    });
});
