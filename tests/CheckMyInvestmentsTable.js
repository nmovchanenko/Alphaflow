var platforms = require('../resources/platforms.json');
var userData = require('../resources/users.json');

var BaseOperations = require('../common/BaseOperations.js');
var RealEstatePage = require('../pages/RealEstatePage.js');

describe('Real Estate - Investment Dashboard', function() {
    var base = new BaseOperations();
    var realEstate = new RealEstatePage();
    // array with random Investment data
    var dbData = [
    {
        "platform" : "Fundrise",
        "title" : "Modern Industrial Columbia Heights Condominiums",
        "type" : "Preferred Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Fundrise Income Portfolio I",
        "type" : "",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Salt Lake City Ground-Up Multifamily",
        "type" : "Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "New Class-A Seattle Boutique Apartment",
        "type" : "Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Brooklyn 7-Asset Cash-Flowing Multifamily",
        "type" : "Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "DC Cash-Flowing Office & Warehouse",
        "type" : "Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "DC Luxury 2 Townhome Renovation",
        "type" : "Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Palm Springs 14-Unit Luxury Home Development",
        "type" : "Preferred Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Northern Virginia 100% Occupied Flex Office",
        "type" : "Preferred Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Charlotte Land Acquisition and Pre-Development Loan",
        "type" : "Senior Debt",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Bend, OR Stabilized Multifamily Recapitalization",
        "type" : "Preferred Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Denver Ground-Up Mixed-Use Apartment Development",
        "type" : "Preferred Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Seattle First Hill Modern Apartments",
        "type" : "Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Brooklyn 3-Unit Apartment Repositioning - Senior Loan",
        "type" : "Debt",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "DC Capitol Riverfront Condo Pre-Development",
        "type" : "Preferred Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Contemporary H Street Apartment Development",
        "type" : "Preferred Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Iconic Georgetown, DC Townhome Rehab",
        "type" : "Preferred Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "Upscale Seattle Single Family Home",
        "type" : "Preferred Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "New York Multifamily Rehab",
        "type" : "Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    },
    {
        "platform" : "Fundrise",
        "title" : "141 South Meridian Street",
        "type" : "Equity",
        "invested" : "5000",
        "class" : "Multifamily",
        "maturity" : "",
        "sponsor" : "Brook Rose",
        "state" : "DC",
        "status" : "Active",
        "percentOfDollar" : "0.26"
    }
    ];

    it('should open Real Estate page', function() {
        base.openBogdanRealEstate(userData.validEmail, userData.validPass);
        realEstate.filterInvestmentsByPlatform(platforms.fundrise);

        // variable 'grid' contains rows, which are represented on the first page of Investment table
        var grid = $$('tbody[role=\'rowgroup\']>tr');
        grid.each(function() {
            // array index of 'dbData'
            var index = 0;
            var rowNumber = 1;
            describe('Investment table', function() {
                it('check each row', function () {
                    // focus on the 'My Investments' table
                    browser.executeScript("document.getElementsByClassName('k-grid-content')[0].scrollIntoView();");

                    var platformName = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[1]//div[@class=\'text-center\']'));
                    expect(platformName.getWebElement().getAttribute('title')).toEqual(dbData[index].platform);

                    var investmentTitle = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[2]//a'));
                    expect(investmentTitle.getText()).toEqual(dbData[index].title);

                    var investmentType = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[3]//div[@class=\'text-center ng-binding\']'));
                    expect(investmentType.getText()).toEqual(dbData[index].type);

                    var invested = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[4]//div[@class=\'text-center ng-binding\']'));
                    expect(invested.getText().then(function(text) {
                        return text.replace(/[$,]/g, "");
                    })).toEqual(dbData[index].invested);

                    var investmentClass = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[5]//div[@class=\'text-center ng-binding\']'));
                    expect(investmentClass.getText()).toEqual(dbData[index].class);

                    var investmentSponsor = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[7]/div[@class=\'ng-binding\']'));
                    expect(investmentSponsor.getText()).toEqual(dbData[index].sponsor);

                    var investmentState = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[8]//div[@class=\'text-center ng-binding\']'));
                    expect(investmentState.getText()).toEqual(dbData[index].state);

                    var investmentStatus = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[9]//div[@class=\'text-center\']'));
                    expect(investmentStatus.getWebElement().getAttribute('title')).toEqual(dbData[index].status);

                    var investmentPercentOfDollar = element(by.xpath('//tbody[@role=\'rowgroup\']/tr[' + rowNumber + ']//td[10]//div[@class=\'ng-binding\']'));
                    expect(investmentPercentOfDollar.getText().then(function(text) {
                        return text.replace(/[%]/g, "");
                    })).toEqual(dbData[index].percentOfDollar);

                    rowNumber++;
                    index++;
                })
            })
        })
    });
});