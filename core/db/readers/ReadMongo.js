var User = require('../model/UserSchema.js'),
    co = require('co'),
    jsonfile = require('jsonfile');

var file = '../../../resources/MongoData.json';

co(function*() {
    // test for local db
    var user1 = yield User.find({'name.first': 'Evgenija'});
    console.log(user1);

    jsonfile.writeFileSync(file, user1, {spaces: 2});

    process.exit(0);
})();