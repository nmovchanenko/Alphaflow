var mysql = require('../node_modules/mysql/index');

var Connection = function(){

    this.connection = mysql.createConnection({
        host : 'localhost',
        user : 'admin',
        password : 'admin',
        database: 'world'
    });

    var x={};

    var query = function(queryToExecute){
        connection.connect();
        connection.query(queryToExecute, function(err, rows, fields) {
            if (err) throw err;
            x = rows[0];
        });
        connection.end();
    };

    var answer = function() {
        return x;
    }
};
module.exports = Connection;
module.exports.query = query;
module.exports.answer = answer;