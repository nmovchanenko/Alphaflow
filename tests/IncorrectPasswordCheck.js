var SignUpPage  = require('../pages/SignUpPageExample.js'),
    RandomUtils = require('../core/utils/RandomUtils.js');

describe('Incorrect password during sign up check', function(){
    var signUpPage  = new SignUpPage(),
        randomUtils = new RandomUtils();

    beforeAll(function () {
        signUpPage.openSignUpPage();
    });

    it('Password cannot be less than 8 chars', function(){
        var password = "B" + randomUtils.randomizeString(5) + "1";
        signUpPage.txbPassword.typeText(password);

        expect(signUpPage.errorIncorrectPassword()).toEqual(signUpPage.getMessages().incorrectPassword);
    });

    it('Password should contain at least one UpperCase char', function() {
        var password = randomUtils.randomizeString(7).toLowerCase() + "1";
        signUpPage.txbPassword.typeText(password);
        expect(signUpPage.errorIncorrectPassword()).toEqual(signUpPage.getMessages().incorrectPassword);
    });

    it('Password should contain at least one numeric char', function() {
        var password = randomUtils.randomizeAlphaString(7).toLowerCase() + "B";
        signUpPage.txbPassword.typeText(password);

        expect(signUpPage.errorIncorrectPassword()).toEqual(signUpPage.getMessages().incorrectPassword);
    });
});