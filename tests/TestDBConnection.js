/**
 * Created by mikalai.mauchanenka on 12.10.2015.
 */
var Connection = require('../common/Connection.js');

describe('MySQL test', function() {
it('check city count', function() {
    var connectDatabase = new Connection();
    var sql = 'select count(*) AS cityCount from city;';
    //var sql = 'select Name from city where Population = 1780000';
    var countResult = {};

    connectDatabase.connection.connect();

    connectDatabase.connection.query(sql, function(err, rows) {
        console.log('Inside query method - ' + rows[0].cityCount);
        //expect(rows[0].result).toEqual(4079);
        countResult = rows[0].cityCount;
        });


    var dbResult = function() {
        return countResult;
    };

    console.log('Outside query method - ' + dbResult());

    });
});