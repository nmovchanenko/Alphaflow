var NavigationBar = require('../pages/NavigationBar.js');

describe('Navigation Bar', function() {
    var navigationBar = new NavigationBar();

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