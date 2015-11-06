var AfButton    = require('../../core/elements/AfButton.js'),
    AfTextBox   = require('../../core/elements/AfTextBox.js'),
    AfSpan      = require('../../core/elements/AfSpan.js'),
    AfLink      = require('../../core/elements/AfLink.js');

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
    this.profileName        = new AfSpan(by.xpath('//strong[@class=\'font-bold ng-binding\']'), 'Profile Name');
    this.lnkRealEstate      = new AfLink(by.xpath('//a[contains(text(),\'Real Estate\')]'),     '\'Real Estate\' link');
    this.lnkDashboardMenu   = new AfLink(by.xpath('//ul[@id=\'side-menu\']/li[2]/a'),           'Dashboard menu');
    this.lnkAdminMenu       = new AfLink(by.xpath('//ul[@id=\'side-menu\']/li[5]/a'),           'Admin menu');
    this.lnkUsers           = new AfLink(by.xpath('//a[contains(text(),\'Users\')]'),           '\'Users\' link');

    this.getProfileName = function() {
        return this.profileName.getText();
    };

};
module.exports = Sidebar;
