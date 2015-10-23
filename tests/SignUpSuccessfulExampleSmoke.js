var SignUpPage = require('../pages/SignUpPageExample.js');
var RandomUtils = require('../utils/RandomUtils.js');
var Scenarios = require('../scenarios/CommonScenarios.js');

describe('Sign up with valid parameters should be successful', function() {
    var signUpPage = new SignUpPage;
    var randomUtilss = new RandomUtils();
    var scenarios = new Scenarios();

    it('Fill in all required fields and sign up', function(){
        scenarios.openPage(scenarios.getUrl().signUp);

        var email = randomUtilss.randomizeEmail();
        var password = "0" + randomUtilss.randomizeString(6) + "Z";

        scenarios.setText(signUpPage.emailTextBox(), email);
        scenarios.setText(signUpPage.repeatEmailTextBox(), email);
        scenarios.setText(signUpPage.confirmPasswordTextBox(), password);
        scenarios.setText(signUpPage.firstNameTextBox(), randomUtilss.randomizeAlphaString(6));
        scenarios.setText(signUpPage.lastNameTextBox(), randomUtilss.randomizeAlphaString(6));

        scenarios.clickOn(signUpPage.checkBoxTerms());

        browser.driver.wait(protractor.until.elementIsVisible(signUpPage.userRegistredMessage().getWebElement()));


        expect(scenarios.getText(signUpPage.userRegistredMessage())).toEqual(signUpPage.getMessages().successfulLogin);
    });
}, 2500);
