var User = require('../model/UserSchema.js'),
    co = require('co'),
    jsonfile = require('jsonfile');

var outputFile = '../../../resources/MongoData.json';

co(function*() {

    var user1 = yield User.find({'name.first': 'Evgenija'});
    //console.log(user1);

    jsonfile.writeFileSync(outputFile, user1, {spaces: 2});
    process.exit(0);
})();