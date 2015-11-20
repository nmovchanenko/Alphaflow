var SignUpPage = require('../pages/SignUpPage.js'),
    RandomUtils = require('../core/utils/RandomUtils.js'),
    ErrorMessages = require('../constants/errorMessages.js');

    describe('Sign up with valid parameters should be successful', function() {
            var signUpPage = new SignUpPage;
            var randomUtilss = new RandomUtils();

        beforeAll(function () {
            signUpPage.openSignUpPage();
        });

        it('Fill in all required fields and sign up', function(){
            var email = randomUtilss.randomizeEmail();
            var password = "0" + randomUtilss.randomizeString(6) + "Z";
            signUpPage.txbEmail.typeText(email);
            signUpPage.txbRepeatEmail.typeText(email);
            signUpPage.txbPassword.typeText(password);
            signUpPage.txbConfirmPassword.typeText(password);
            signUpPage.txbFirstName.typeText(randomUtilss.randomizeAlphaString(6));
            signUpPage.txbLastName.typeText(randomUtilss.randomizeAlphaString(6));
            signUpPage.checkBoxTerms.check();
            signUpPage.signUpButton.click();

            /*browser.driver.wait(protractor.until.elementIsVisible(signUpPage.userRegistredMessage().getWebElement()));*/
            expect(signUpPage.userRegistredMessage.getText()).toEqual(ErrorMessages.errorMessagesEnum['successfulLogin']);
                    });
        }, 2500);