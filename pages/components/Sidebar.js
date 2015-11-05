var AfButton = require('../../core/elements/AfButton.js'),
    AfTextBox = require('../../core/elements/AfTextBox.js'),
    AfLink = require('../../core/elements/AfLink.js');

/**
 *  This script describes a sidebar on the dashboard page.
 *  Sidebar contains:
 *   - profile picture and name;
 *   - dashboard menu;
 *   - cashflows link;
 *   - platforms link;
 *   - admin menu.
 */
var Sidebar = function() {
    var profileName = element(by.xpath('//strong[@class=\'font-bold ng-binding\']'));
    var realEstate = new AfLink(by.xpath('//a[contains(text(),\'Real Estate\')]'), '\'Real Estate\' link');
    var dashboardMenu = element(by.xpath('//ul[@id=\'side-menu\']/li[2]/a'));
    var adminMenu = element(by.xpath('//ul[@id=\'side-menu\']/li[5]/a'));
    this.usersLink = new AfLink(by.xpath('//a[contains(text(),\'Users\')]'), '\Users\' link');

    this.getProfileName = function() {
        return profileName.getText();
    };

    this.lnkRealEstate = function() {
        return realEstate;
    };

    this.dashboardMenu = function() {
        return dashboardMenu;
    };

    this.adminMenu = function() {
        return adminMenu;
    };

    this.lnkUsers = function() {
        return this.usersLink;
    };
};
module.exports = Sidebar;
