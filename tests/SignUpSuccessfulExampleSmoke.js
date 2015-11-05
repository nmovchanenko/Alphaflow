var SignUpPage = require('./SignUpPageExample.js');
var RandomUtils = require('./RandomUtils.js');
var Scenarios = require('./CustomCommands.js');

describe('Sign up with valid parameters should be successful', function() {
    var signUpPage = new SignUpPage;
    var randomUtilss = new RandomUtils();
    var scenarios = new Scenarios();

    it('Fill in all required fields and sign up', function(){
        scenarios.openPage(scenarios.getUrl().signUp);

        var email = randomUtilss.randomizeEmail();
        var password = "0" + randomUtilss.randomizeString(6) + "Z";

        scenarios.typeText(signUpPage.emailTextBox(), email);
        scenarios.typeText(signUpPage.repeatEmailTextBox(), email);
        scenarios.typeText(signUpPage.confirmPasswordTextBox(), password);
        scenarios.typeText(signUpPage.firstNameTextBox(), randomUtilss.randomizeAlphaString(6));
        scenarios.typeText(signUpPage.lastNameTextBox(), randomUtilss.randomizeAlphaString(6));

        scenarios.clickOn(signUpPage.checkBoxTerms());

        browser.driver.wait(protractor.until.elementIsVisible(signUpPage.userRegistredMessage().getWebElement()));


        expect(scenarios.getText(signUpPage.userRegistredMessage())).toEqual(signUpPage.getMessages().successfulLogin);
    });
}, 2500);
