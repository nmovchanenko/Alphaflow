var mongoose    = require('mongoose'),
    config      = require('../../config');

var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
    var movieSchema = new mongoose.Schema({
        title: { type: String }
        , rating: String
        , releaseYear: Number
        , hasCreditCookie: Boolean
    });

    var Movie = mongoose.model('Movie', movieSchema);

    var thor = new Movie({
        title: 'Thor'
        , rating: 'PG-13'
        , releaseYear: '2011'
        , hasCreditCookie: true
    });

    thor.save(function(err, thor) {
        if (err) return console.error(err);
        console.dir(thor);
    });

    Movie.findOne({ title: 'Thor' }, function(err, thor) {
        if (err) return console.error(err);
        console.dir(thor);
    });

});

mongoose.connect(config.get('mongoose:uri'));

module.exports = mongoose;