var platforms = require('../resources/platforms.json');
var userData = require('../resources/users.json');

var BaseOperations = require('../common/BaseOperations.js');
var Sidebar = require('../forms/Sidebar.js');
var RealEstatePage = require('../pages/RealEstatePage.js');

describe('Real Estate - Investment Dashboard', function() {
    var base = new BaseOperations();
    var realEstate = new RealEstatePage();

    it('should open Real Estate page', function() {
        base.openBogdanRealEstate(userData.validEmail, userData.validPass);
        expect(realEstate.getRealEstatePageHeader()).toEqual('Real Estate - Investment Dashboard');
    });

    it('filter by platform', function() {
        realEstate.filterInvestmentsByPlatform(platforms.fundrise);

        var isReachedLastPage;

        do{
            isReachedLastPage = realEstate.hasNextPage();
            realEstate.clickNextPage();
        } while (isReachedLastPage);

        expect(element(by.xpath('//tr[@class=\'k-alt ng-scope\'][last()]/td[2]//a')).getText()).toEqual('Dupont Circle Condominiums');
    });
});