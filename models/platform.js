/**
 * Created by bogdan on 5/14/15.
 * Models the investment platform such as RealtyShares, etc
 */

var mongoose = require('mongoose')

;

// Define schema
var PlatformSchema = new mongoose.Schema({
  name: { type: String, unique: true, index: true } //the friendly name displayed to the user
  , connectorName: {type: String}     //the code connector name where the proxy operations are encapsulated (i.e. login, transaction pull, etc)
  , websiteUrl: {type: String}        //official website where AI can go open an account
  , api: {
      type: String,                   //data type provided by the API: HTML (no real api just jquery parsing of hrml), REST
      authUsernameLabel: String,      //what is the text to be displayed in connect platform "username" label field. if missing, do NOT show the label+field
      authPasswordLabel: String,      //what is the text to be displayed in connect platform "password" label field. if missing, do NOT show the label+field
      url: String,                    //official API url if the site provides one.
      authScheme: String,             //what kind of auth strategy they have: client_secret (api token was issued), basic (username + password), oauth2 (if clientid + clientsecret was issued)
      apiHelpUrl: String              // where is the help page describing how they get that API key (ideally on our helpdesk platform)
  }
  , assetClass: {type: Number, enum: [1,2]} //the group this platform belongs to (only one) such as "Real Estate" or "Consumer Loans". see values of investmentAssetClassEnum
  , protocol: String                  //http or https
  , thumbnailImageUrl: {type: String}  //path to the logo image to display to the UI, defaults to connectorname.jpg
  , status: {type: String}  //allows us to identify connection status ot the platform as a whole. Possible states: 'online', 'down', 'incompatible' (when code broke)
  , lastGlobalSync: {type: Date}  //when last all investments page was processed.
  , paths: {  //url paths to well known objects. we store location logic such as investment detail page etc
      investmentPageUrl: String //it should have template parameters, generally platformInvestmentId, as parameter 0
  },
  syncInterval: {type: String}  //Thr format should be '22:00-04:00', '02:00-12:00' etc.
});

module.exports = exports = mongoose.alphaflow.model('Platform', PlatformSchema);