/**
 * Created by mikalai.mauchanenka on 04.11.2015.
 */
var AfButton = require('../core/elements/AfButton.js'),
    AfTextBox = require('../core/elements/AfTextBox.js'),
    AfLink = require('../core/elements/AfLink.js');

var SomePage = function() {
    var btnLogin = new AfButton(by.id('afLoginFormSubmit'), 'Login button');
    var txbEmail = new AfTextBox(by.id('afEmail'), 'Email');
    var txbPassword = new AfTextBox(by.id('afPassword'));

    this.doLogin = function(email, pass) {
        txbEmail.typeText(email);
        txbPassword.typeText(pass);
        txbEmail.clear();
        btnLogin.click();
    };
};

module.exports = SomePage;