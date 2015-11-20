var Homepage = function() {
    var signInLink = element(by.xpath('//li[5]/a'));

    this.openHomepage = function() {
        browser.get('/');
    };

    this.clickSignIn = function(){
        signInLink.click();
    }
};
module.exports = Homepage;