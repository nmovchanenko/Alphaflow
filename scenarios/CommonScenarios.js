var CommonScenarios = function() {

    this.openPage = function(url) {
        browser.get(url);
    };

    this.setText = function(element, text) {
        element.sendKeys(text);
    };

    this.getText = function(element) {
        return element.getText();
    };

    this.clickOn = function(element) {
        return element.click();
    };

    this.getUrl = function() {
        var urls = {
            'signUp': '/signup'
        };
        return urls;
    }
};
module.exports = CommonScenarios;