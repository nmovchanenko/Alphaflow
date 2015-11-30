var Investment = function() {
    var earningName = '';
    var earningDate = '';
    var earningAmount = '';

    this.setName = function(name) {
        earningName = name;
    };

    this.setDate = function(date) {
        earningDate = date;
    };

    this.setAmount = function(amount) {
        earningAmount = amount;
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
};

module.exports = Investment;