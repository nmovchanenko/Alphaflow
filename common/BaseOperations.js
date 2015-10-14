var LogInPage = require('../pages/LogInPage.js');


var BaseOperations = function() {
    var logInPage = new LogInPage();

    this.loginAs = function(email, password) {
        logInPage.openLoginPage();
        logInPage.typeEmail(email);
        logInPage.typePassword(password);
        logInPage.clickLogin();
    };

};
module.exports = BaseOperations;
