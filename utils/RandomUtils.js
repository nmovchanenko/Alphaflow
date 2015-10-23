var RandomUtils = function () {

    this.randomizeString = function (len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    };

    this.randomizeAlphaString = function(len) {
        return this.randomizeString(len, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')
    };

    this.randomizeEmail = function () {
        return this.randomizeString(7) + "@" + this.randomizeString(4) + "." + this.randomizeAlphaString(3);
    };
};
module.exports = RandomUtils;
