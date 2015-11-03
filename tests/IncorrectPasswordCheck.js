var SignUpPage = require('./SignUpPage.js');
var RandomUtils = require('./RandomUtils.js');

describe('Incorrect password during sign up check', function(){
    var signUpPage = new SignUpPage();
    var randomUtilss = new RandomUtils();

    it('Password cannot be less than 8 chars', function(){
        signUpPage.openSignUpPage();

        var password = "B" + randomUtilss.randomizeString(5) + "1";
        signUpPage.setPassword(password);

        expect(signUpPage.gerErrorOfIncorrectPassword()).toEqual(signUpPage.getErrorMessages().incorrectPassword);
    });

    it('Password should contain at least one UpperCase char', function() {
        signUpPage.openSignUpPage();

        var password = randomUtilss.randomizeString(7).toLowerCase() + "1";
        signUpPage.setPassword(password);
        browser.pause();
        expect(signUpPage.gerErrorOfIncorrectPassword()).toEqual(signUpPage.getErrorMessages().incorrectPassword);
    });

    it('Password should contain at least one numeric char', function() {
        signUpPage.openSignUpPage();

        var password = randomUtilss.randomizeAlphaString(7).toLowerCase() + "B";
        signUpPage.setPassword(password);

        expect(signUpPage.gerErrorOfIncorrectPassword()).toEqual(signUpPage.getErrorMessages().incorrectPassword);
    });
});