'use strict';

/**
 * Environment variables and application configuration.
 */

var path = require('path'),
    _ = require('lodash'),
    constants = require("../business-logic/constants.js")
  ;

String.prototype.initCap = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var baseConfig = {
  app: {
    port: process.env.PORT || 3200,
    root: path.normalize(__dirname + '/../..'),
    env: process.env.NODE_ENV,
    proxy: process.env.TRUSTED_PROXY || false,
    httpproxy: process.env.PROXY,
    httpwait: process.env.HTTP_WAIT || 5000, //the delay between http requests in ms
    AESSecretKey: process.env.AES_SECRET_KEY,
    forceSSL: Boolean(process.env.FORCE_SSL == "true"),
    syncWorkers: process.env.SYNC_WORKERS || 2,
    enableSyncScheduler: Boolean(process.env.ENABLE_SYNC_SCHEDULER == "true"), //if we want to enable auto sync scheduler (defautl off for local dev)
    maxhttpsockets: process.env.HTTP_SOCKETS || 2,
    minInvestmentStatusToSync: process.env.MIN_INVESTMENT_STATUS_TO_SYNC || constants.investmentStatusEnum.Completed,
    secret: 'Alpha0 Rocks!', /* used in signing the jwt tokens */
    loggingLevel: process.env.LOGGING_LEVEL || 'debug',
    useCachedReponses: Boolean(process.env.USE_CACHED_RESPONSES == "true"), //defaults to false if undefined
    cacheResponses: Boolean(process.env.CACHE_RESPONSES == "true") //defaults to false if undefined
  },
  google: {
    serverAPI: "AIzaSyB0GXiq7b4izEs8mggZ5bw5chrgBZkkBnY"
  },
  mailchimp: {
    mandrillAPIKey: process.env.MANDRILL_API_KEY || false,
    mandrillEndpointUrl: process.env.MANDRILL_API_ENDPOINT || 'https://mandrillapp.com/api/1.0',
    mailChimpAPIKey: process.env.MAILCHIMP_API_KEY || false,
    mailChimpEndpointUrl: process.env.MAILCHIMP_API_ENDPOINT || 'https://us11.api.mailchimp.com/3.0',
    allCustomersListId: '2e8995f662'  //specific listid for all AF customers where we sign them up
  },
  wp: {
    endpoint: 'http://www.alphaflow.com/wp-json/wp/v2'
  },
  //prerender.io options
  prerender: {
    prerender: process.env.PRERENDER_SERVER_URL,   // optional, default:'http://service.prerender.io/',
    stopNext: true,
    //protocol: 'http',                 // optional, default: this.protocol
    prerenderToken: process.env.PRERENDER_TOKEN || ''                // optional or process.env.PRERENDER_TOKEN
  },
  mongo: {
    url: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/alphaflow',
    options : {
      server: { poolSize: 20, socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
      replset: { poolSize: 20, socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
    }
  },
  mongoStats: {
    url: process.env.MONGOSTATS_URL || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/alphaflow',
    options : {
      server: { poolSize: 10, socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
      replset: { poolSize: 10, socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
    }
  },
  redis: {
    url: process.env.REDISCLOUD_URL || process.env.REDISTOGO_URL,
    retry_max_delay: 1000,
    cache_short: process.env.CACHE_SHORT || 120,
    cache_long: process.env.CACHE_LONG || 600
  },
  redis_log: {  //the error log sink server
    url: process.env.REDISCLOUD_LOG_URL || process.env.REDISCLOUD_URL || process.env.REDISTOGO_URL,
    retry_max_delay: 1000,
    max_log_entries: process.env.REDISCLOUD_LOG_MAX_ENTRIES || 1000
  },
  oauth: {
    google: {
      clientID: '462158458166-nrf4lhsf070cpkuvurqvhmlph6tkqe2i.apps.googleusercontent.com',
      clientSecret: 'Zdo0CMovBfkz3ypliOfc11YI',
      callbackURL: "/auth/google/callback",
      scope: 'openid email profile'
    },
    facebook: {
      clientID: "867235093324721",
      clientSecret: "f417dfdf7af0078c9c119d620925842f",
      callbackURL: "/auth/facebook/callback",
      scope: ['email','public_profile']
    },
    linkedin: {
      clientID: '75j9zxrckccz1u',
      clientSecret: 'sDlxpZSHCowUbbzz',
      callbackURL: "/auth/linkedin/callback",
      scope: ['r_emailaddress', 'r_basicprofile']
    }
  },
  /*
   * This object can be used as a container for strings, messages etc. It good to have all messages in one place.
   */
  messages: {
    errors: {
      endpointError: endpointAction => "Sorry, we can't " + endpointAction + " now due to specific circumstances. Please contact our support for help."
    }
  }
};

var platformConfig = {
  development: {
    app: {
      authCallback: 'http://auth-local.alphaflow.co',
      APIAuthSuccessRedirect: 'http://api-local.alphaflow.co',
      clientAuthSuccessRedirect: 'http://localhost:9000',
      clientAuthFailureRedirect: 'http://localhost:9000/#!/login',
      platformSyncInterval: process.env.ALL_INVESTMENTS_SYNC_INTERVAL || 60 //10 min
      //ipratelimit: 100,
      //ratelimitduration: (60*60*1000)
    }
  },
  dev: {
    app: {
      authCallback: 'http://auth-dev.alphaflow.com',
      APIAuthSuccessRedirect: 'http://api-dev.alphaflow.com',
      clientAuthSuccessRedirect: 'http://dev.alphaflow.com',
      clientAuthFailureRedirect: 'http://dev.alphaflow.com/#!/login',
      platformSyncInterval: process.env.ALL_INVESTMENTS_SYNC_INTERVAL || 3600, //60 min default
      ipratelimit: parseInt(process.env.IP_RATE_LIMIT || 500),
      ratelimitduration: parseInt((process.env.RATE_LIMIT_DURATION || 24*60*60*1000)) //per day
    }
  },
  qa: {
    app: {
      authCallback: 'http://auth-qa.alphaflow.com',
      APIAuthSuccessRedirect: 'http://api-qa.alphaflow.com',
      clientAuthSuccessRedirect: 'http://qa.alphaflow.com',
      clientAuthFailureRedirect: 'http://qa.alphaflow.com/#!/login',
      platformSyncInterval: process.env.ALL_INVESTMENTS_SYNC_INTERVAL || 3600, //60 min default
      ipratelimit: parseInt(process.env.IP_RATE_LIMIT || 500),
      ratelimitduration: parseInt((process.env.RATE_LIMIT_DURATION || 24*60*60*1000)) //per day
    }
  },
  stage: {
    app: {
      authCallback: 'http://auth-stage.alphaflow.com',
      APIAuthSuccessRedirect: 'http://api-stage.alphaflow.com',
      clientAuthSuccessRedirect: 'http://stage.alphaflow.com',
      clientAuthFailureRedirect: 'http://stage.alphaflow.com/#!/login',
      platformSyncInterval: process.env.ALL_INVESTMENTS_SYNC_INTERVAL || 3600, //60 min default
      ipratelimit: parseInt(process.env.IP_RATE_LIMIT || 500),
      ratelimitduration: parseInt((process.env.RATE_LIMIT_DURATION || 24*60*60*1000)) //per day
    }
  },

  production: {
    app: {
      authCallback: 'https://auth.alphaflow.com',
      APIAuthSuccessRedirect: 'https://api.alphaflow.com',
      clientAuthSuccessRedirect: 'https://secure.alphaflow.com',
      clientAuthFailureRedirect: 'https://secure.alphaflow.com/#!/login',
      platformSyncInterval: process.env.ALL_INVESTMENTS_SYNC_INTERVAL || 21600, //6 hours default
      ipratelimit: parseInt((process.env.IP_RATE_LIMIT || 60)),
      ratelimitduration: parseInt((process.env.RATE_LIMIT_DURATION || 60 * 1000)), //per minute
      cacheTime: 7 * 24 * 60 * 60 * 1000 /* default caching time (7 days) for static files, calculated in milliseconds */
    }
  }
};

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, platformConfig[baseConfig.app.env || (baseConfig.app.env = 'development')]);
