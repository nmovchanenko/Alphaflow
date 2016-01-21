var adminDashboard = require('../pages/AdminDashboardPage.js');
var config = require('../settings');
var co = require('co');

var BaseQueries = require('../core/db/BaseQueries.js');

describe('Number of investments on Admin page by Platforms', function () {
    var adminPage = new adminDashboard();
    var numberOfTotalInvestments;
    var query = new BaseQueries();

    it('Total should contain number of all investments', function () {
        step.loginAs(config.get('testUser2:login'), config.get('testUser2:password'));
        adminPage.openAdminDashboardPage();

        query.getTotalInvestments().then(totalNumber => {
            "use strict";
            expect(adminPage.totalNumberOfInvestments.getText()).toEqual(totalNumber);
        })
    });
});

