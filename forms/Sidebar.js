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
    var realEstate = element(by.xpath('//a[contains(text(),\'Real Estate\')]'));
    var dashboardLink = element(by.xpath('//ul[@id=\'side-menu\']/li[2]/a'));

    this.getProfileName = function() {
        return profileName.getText();
    };

    this.lnkRealEstate = function() {
        return realEstate;
    };

    this.lnkDashboard = function() {
        return dashboardLink;
    };
};
module.exports = Sidebar;
