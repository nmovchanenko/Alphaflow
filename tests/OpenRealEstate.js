var profiles        = require('../resources/profiles.json'),
    Sidebar         = require('../pages/components/Sidebar.js'),
    RealEstatePage  = require('../pages/RealEstatePage.js'),
    config          = require('../settings');

describe('Real Estate - Investment Dashboard', function() {
    var sidebar     = new Sidebar(),
        realEstate  = new RealEstatePage();

    it('User name should be displayed ', function() {
        step.loginAs(config.get('testUser2:login'), config.get('testUser2:password'));
        expect(sidebar.getProfileName()).toEqual(profiles.evgenijadr);
    });

    it('should open Real Estate page', function() {
        step.openRealEstate();
        expect(realEstate.getRealEstatePageHeader()).toEqual('Active Real Estate Investments');
    });
});