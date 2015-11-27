
var Earning = function() {
    var earningName = '';
    var earningDate = '';
    var earningAmount = '';
    var earningType = '';
    var earningCategory = '';

    this.setName = function(name) {
        earningName = name;
    };

    this.setDate = function(date) {
        earningDate = date;
    };

    this.setAmount = function(amount) {
        earningAmount = amount;
    };

    this.setType = function(type) {
        earningType = type;
    };

    this.setCategory = function (category) {
        earningCategory = category;
    };

    this.getName = function() {
        return earningName;
    };

    this.getDate = function() {
        return earningDate;
    };

    this.getAmount = function() {
        return earningAmount;
    };

    this.getType = function() {
        return earningType;
    };

    this.getCategory = function () {
        return earningCategory;
    };
};

module.exports = Earning;