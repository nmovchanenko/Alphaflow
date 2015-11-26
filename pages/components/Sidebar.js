var Button    = require('../../core/elements/Button.js'),
    TextInput = require('../../core/elements/TextInput.js'),
    TextBlock = require('../../core/elements/TextBlock.js'),
    Link      = require('../../core/elements/Link.js');

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
    this.profileName      = new TextBlock(by.xpath('//strong[@class=\'font-bold ng-binding\']'),  'Profile Name');
    this.lnkRealEstate    = new Link(by.xpath('//a[contains(text(),\'Real Estate\')]'),           '\'Real Estate\' link');
    this.lnkDashboardMenu = new Link(by.xpath('//ul[@id=\'side-menu\']/li[2]/a'),                 'Dashboard menu');
    this.lnkAdminMenu     = new Link(by.xpath('//ul[@id=\'side-menu\']/li[5]/a'),                 'Admin menu');
    this.lnkUsers         = new Link(by.xpath('//a[contains(text(),\'Users\')]'),                 '\'Users\' link');
    this.lnkCashflows     = new Link(by.xpath("//a[@ui-sref='ai.cashflows']"), "'Cashflows' link");

    this.getProfileName = function() {
        return this.profileName.getText();
    };

};
module.exports = Sidebar;
