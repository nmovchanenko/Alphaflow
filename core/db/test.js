var
	User = require('./model/UserSchema.js'),
	co = require('co');

require('./mongoose.js');

co(function*() {

	// test for local db
	var user1 = yield User.find({'name.first': 'Evgenija'});

	console.log(user1);

	process.exit(0);
})();