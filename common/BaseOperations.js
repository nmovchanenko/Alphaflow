/**
 *  This script contains basic operations for working with the app.
 */
var LogInPage = require('../pages/LogInPage.js');
var Sidebar = require('../forms/Sidebar.js');

var BaseOperations = function() {
    var condition = protractor.ExpectedConditions;
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
            sidebar.dashboardMenu().click();
            sidebar.lnkRealEstate().click();
        }
        // this will wait Real Estate page to be loaded
        browser.wait(condition.visibilityOf(element(by.xpath('//h2[contains(text(),\'Real Estate - Investment Dashboard\')]'))), 15000);
    };

    /**
     * Log in with email and password and open Real Estate page.
     * @param email
     * @param password
     */
    this.loginAndOpenRealEstate = function (email, password) {
        this.loginAs(email, password);
        this.openRealEstate();
    };

    /**
     * Temporary hack to open Bogdan Cirlig real estate page with investment data
     * @param email
     * @param password
     */
    this.openBogdanRealEstate = function (email, password) {
        this.loginAs(email, password);
        sidebar.lnkUsers().click();
        // wait for 'User Administration' page
        browser.wait(condition.visibilityOf(element(by.xpath('//h2[contains(text(),\'User Administration\')]'))), 15000);
        // click 'Impersonate user' button
        element(by.xpath('//div[@class=\'ui-grid-row ng-scope\'][1]//button')).click();
        // we have to wait until a new browsertab will be opened
        browser.sleep(5000);
        // switch to the opened tab
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]);
            var bogdanRealEstatePage = element(by.xpath('//h2[contains(text(),\'Real Estate - Investment Dashboard\')]'));
            browser.wait(condition.visibilityOf(bogdanRealEstatePage), 15000);
        });
    };

};
module.exports = BaseOperations;
