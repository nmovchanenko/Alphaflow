var mongoose = require('../core/db/mongoose.js'),
    readFile = require('../resources/MongoData.json');

describe('Test mongo', function () {
    it('get user', function () {

        console.log('First name: ' + readFile[0].name.first);

        expect(readFile[0].name.first).toEqual('Evgenija');
    });
});
