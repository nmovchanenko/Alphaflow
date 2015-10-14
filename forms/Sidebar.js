var Sidebar = function() {
    var profileName = element(by.xpath('//strong[@class=\'font-bold ng-binding\']'));
    var realEstate = element(by.xpath('//a[contains(text(),\'Real Estate\')]'));
    var dashboardLink = element(by.xpath('//ul[@id=\'side-menu\']/li[2]/a'));

    this.getProfileName = function() {
        return profileName.getText();
    };

    this.openRealEstate = function () {
        dashboardLink.click();
        realEstate.click();
    };

};
module.exports = Sidebar;
