

var mongoose = require('mongoose')
  ;

// Define schema
var MetricSchema = new mongoose.Schema({
  name: String,     //the metric name, i.e. IRR, CoC, LTV
  description: String, //friendly name/description to display in an onpage balloon. max 255 chars just for kicks.
  displayOrder: Number,
  measureUnit: String, //what the values are in i.e. %, mo, K
  uiFormatFilter: String  //a filter to use
});

module.exports = exports = mongoose.alphaflow.model('Metric', MetricSchema);