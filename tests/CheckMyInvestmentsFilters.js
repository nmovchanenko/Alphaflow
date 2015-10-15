var userData = require('../resources/users.json');
var profiles = require('../resources/profiles.json');

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
});