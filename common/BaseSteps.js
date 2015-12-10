/**
 *  This script contains basic operations for working with the app.
 */
var LogInPage   = require('../pages/LogInPage.js'),
    Sidebar     = require('../pages/components/Sidebar.js');

var BaseSteps = function() {
    var condition   = protractor.ExpectedConditions,
        logInPage   = new LogInPage(),
        sidebar     = new Sidebar();

    /**
     * Login with email and password
     * @param email
     * @param password
     */
    this.loginAs = function(email, password) {
        logInPage.openLoginPage();
        logInPage.txbEmail.typeText(email);
        logInPage.txbPassword.typeText(password);
        logInPage.btnLogin.click();
        //browser.wait(condition.visibilityOf(element(by.id('side-menu'))), 15000);
    };

     /**
     * Open Real Estate page (user must be logged in).
     */
    this.openRealEstate = function () {
        if (!sidebar.lnkRealEstate.isDisplayed()) {
            sidebar.lnkRealEstate.click();
        } else {
            sidebar.lnkDashboardMenu.click();
            sidebar.lnkRealEstate.click();
        }
        // this will wait Real Estate page to be loaded
        browser.wait(condition.visibilityOf(element(by.xpath('//h2[contains(text(),\'Real Estate - Investment Dashboard\')]'))), 15000);
    };

    /**
     * Open Real Estate - Cashflows (user must be logged in).
     */
    this.openCashflows = function () {
        sidebar.lnkCashflows.click();
        // this will wait Cashflows page to be loaded
        //browser.wait(condition.visibilityOf(element(by.xpath('//h2[contains(text(),\'Real Estate - Cashflows\')]'))), 15000);
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
        sidebar.lnkUsers.click();

        // wait for 'User Administration' page
        perform.isVisible(element(by.xpath('//h2[contains(text(),\'User Administration\')]')));
        //browser.wait(condition.visibilityOf(), 15000);
        // click 'Impersonate user' button
        element(by.xpath('//div[contains(text(),\'Bogdan\')]/../preceding-sibling::div//button')).click();
        // we have to wait until a new browsertab will be opened
        browser.sleep(5000);
        // switch to the opened tab
        perform.switchToWindow(1);
        perform.isVisible(element(by.xpath('//h2[contains(text(),\'Real Estate - Investment Dashboard\')]')));
    };
};
module.exports = BaseSteps;
