var NavigationBar = function() {

    this.lnkHome = function () {
        return element(by.partialLinkText('Home'));
    };

    this.lnkHowItWorks = function () {
        return element(by.partialLinkText('How It Works'));
    };

    this.lnkAboutUs = function () {
        return element(by.linkText('About Us'));
    };

    this.lnkFAQ = function () {
        return element(by.linkText('FAQ'));
    };
};
module.exports = NavigationBar;