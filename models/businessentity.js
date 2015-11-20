var mongoose = require('mongoose');

//a business entity. can have multiple roles such as Advertiser, Affiliate (online store, publisher)
BusinessEntitySchema = new mongoose.Schema({
    name: {'type': String, 'required' : true, 'index':{'unique':true}}  //the unique business name
    , legalName: {'type': String, 'required' : true, 'index':{'unique':true}}  //the unique long business name
    , roles: [String]   //sponsor, etc
});

module.exports = exports = mongoose.alphaflow.model('BusinessEntity', BusinessEntitySchema);