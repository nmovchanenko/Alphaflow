var NavigationBar = require('../pages/components/NavigationBar.js');

describe('Navigation Bar', function() {
    var navigationBar = new NavigationBar();

    beforeAll(function () {
        logger.info('------------ Test started ------------');
    });

    it('Home link', function() {
        browser.get('/');
        navigationBar.lnkHome().isPresent();
    });

    it('How it works link', function() {
        navigationBar.lnkHowItWorks().isPresent();
    });

    it('FAQ link', function() {
        navigationBar.lnkFAQ().isPresent();
    });

    it('About us', function() {
        navigationBar.lnkAboutUs().isPresent();
    });
});