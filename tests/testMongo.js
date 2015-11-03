var mongo = require('././mongo');

mongo.getUserById('555cb819c6e3ee0300b63876').then(function (user) {
    console.log(user);
});