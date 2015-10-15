var RealEstatePage = function() {
    var realEstatePageHeader = element(by.xpath('//h2[contains(text(),\'Real Estate - Investment Dashboard\')]'));

    // elements for active investments table
    var activeEquity = element(by.id('//div[@class=\'col-lg-4\'][1]/div/div[2]/div[2]/div[1]/h2'));
    var activeDebt = element(by.xpath('//div[@class=\'col-lg-4\'][1]/div/div[2]/div[2]/div[2]/h2'));

    // elements for total investments table
    var totalEquity = element(by.id('//div[@class=\'col-lg-4\'][2]/div/div[2]/div[2]/div[1]/h2'));
    var totalDebt = element(by.xpath('//div[@class=\'col-lg-4\'][2]/div/div[2]/div[2]/div[2]/h2'));

    // filters
    var btnPlatformList = element(by.xpath('//input[@class=\'k-input k-readonly\']'));

    // element.all(by.xpath(‘//div[@title='Fundrise']’)).count()

    this.filterInvestmentsByPlatform = function(platform) {
        btnPlatformList.click();
        element(by.xpath('//li[contains(text(),\'' + platform + '\')]')).click();
    };

    this.getRealEstatePageHeader = function() {
        return realEstatePageHeader.getText();
    };

};

module.exports = RealEstatePage;