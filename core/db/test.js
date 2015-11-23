var Platform = require('./model/PlatformSchema.js'),
	User = require('./model/UserSchema.js'),
	mongoose = require('./mongoose.js'),
	co = require('co'),
	config = require('../../settings');

co(function*() {

	// test for local db
	var user1 = yield User.find({'name.nickname': 'Test nickname'});

	console.log(user1);
})();