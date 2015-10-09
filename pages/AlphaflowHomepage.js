/**
 * Created by mikalai.mauchanenka on 08.10.2015.
 */
var AlphaflowHomepage = function() {
    var signInLink = element(by.xpath('//li[5]/a'));

    this.get = function() {
        browser.get('/');
    };

    this.clickSignIn = function(){
        signInLink.click();
    }
};
module.exports = AlphaflowHomepage;