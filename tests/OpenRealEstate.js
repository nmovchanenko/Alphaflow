var userData        = require('../resources/users.json'),
    profiles        = require('../resources/profiles.json'),
    Sidebar         = require('../pages/components/Sidebar.js'),
    RealEstatePage  = require('../pages/RealEstatePage.js');
var config = require('../settings');

describe('Real Estate - Investment Dashboard', function() {
    var sidebar     = new Sidebar(),
        realEstate  = new RealEstatePage();

    beforeAll(function () {
        logger.info('------------ Test started ------------');
    });

    it('User name should be displayed ', function() {
        step.loginAs(config.get('app:login'), config.get('app:password'));
        expect(sidebar.getProfileName()).toEqual(profiles.evgenijadr);
    });

    it('should open Real Estate page', function() {
        step.openRealEstate();
        expect(realEstate.getRealEstatePageHeader()).toEqual('Real Estate - Investment Dashboard');
    });
});