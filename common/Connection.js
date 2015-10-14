var mysql = require('../node_modules/mysql/index');

var Connection = function(){

    this.connection = mysql.createConnection({
        host : 'localhost',
        user : 'admin',
        password : 'admin',
        database: 'world'
    });

};
module.exports = Connection;