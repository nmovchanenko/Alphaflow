/**
 *  This script contains basic operations for working with the app.
 */
var LogInPage = require('../pages/LogInPage.js');
var Sidebar = require('../forms/Sidebar.js');

var BaseOperations = function() {
    var logInPage = new LogInPage();
    var sidebar = new Sidebar();

    /**
     * Login with email and password
     * @param email
     * @param password
     */
    this.loginAs = function(email, password) {
        logInPage.openLoginPage();
        logInPage.typeEmail(email);
        logInPage.typePassword(password);
        logInPage.clickLogin();
    };

    /**
     * Open Real Estate page (user must be logged in).
     */
    this.openRealEstate = function () {
        if (!sidebar.lnkRealEstate().isDisplayed()) {
            sidebar.lnkRealEstate().click();
        } else {
            sidebar.lnkDashboard().click();
            sidebar.lnkRealEstate().click();
        }
        // this will wait Real Estate page to be loaded
        browser.driver.wait(function() {
            return browser.driver.isElementPresent(by.xpath('//h2[contains(text(),\'Real Estate - Investment Dashboard\')]'));
        });
    };

};
module.exports = BaseOperations;
