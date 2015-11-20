var Platform = require('./model/PlatformSchema.js'),
	User = require('./model/UserSchema.js'),
	mongoose = require('./mongoose.js');

//Platform.find({}, function(err, data) {
//	if (err) throw err;
//	console.log(data);
//}).then(function() {
//	mongoose.disconnect();
//});

User.find({_id: '555cb819c6e3ee0300b63876'}, function(err, userInfo) {
	if (err) {
		throw err;
	}
	console.log(userInfo);
}).then(function() {
	mongoose.disconnect();
});
