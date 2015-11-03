var userData = require('../resources/users.json');
var profiles = require('../resources/profiles.json');

var BaseOperations = require('../common/BaseSteps.js');
var Sidebar = require('./Sidebar.js');
var RealEstatePage = require('./RealEstatePage.js');

describe('Real Estate - Investment Dashboard', function() {
    var base = new BaseOperations();
    var sidebar = new Sidebar();

    it('User name should be displayed ', function() {
        base.loginAs(userData.validEmail, userData.validPass);
        expect(sidebar.getProfileName()).toEqual(profiles.evgenijadr);
    });

    it('should open Real Estate page', function() {
        base.openRealEstate();

        var realEstate = new RealEstatePage();
        expect(realEstate.getRealEstatePageHeader()).toEqual('Real Estate - Investment Dashboard');
    });
});