var TextBlock = require('../core/elements/TextBlock.js');

var AdminDashboardPage = function(){
    this.totalNumberOfInvestments = new TextBlock(by.xpath("//span[contains(text(), 'TOTAL')]/../following-sibling::div/div[3]//h5"), 'Total number of Investments');

    this.openAdminDashboardPage = function() {
        browser.get('/admin/dashboard');
    };
};
module.exports = AdminDashboardPage;
