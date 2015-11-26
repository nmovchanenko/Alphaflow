
var Earning = function() {
    var earningName = '';
    var earningDate = '';
    var earningAmount = '';
    var earningType = '';


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
};

module.exports = Earning;