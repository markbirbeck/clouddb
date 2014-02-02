require('../config/set_defaults');

var CONFIG = require('config');
var packer = require('./sdb_packer');
var simpledb = require('simpledb');


/**
 * Get our AWS keys and region:
 */

var AWS_CONFIG = CONFIG.aws;
var AWS_ACCESS_KEY_ID = AWS_CONFIG.accessKeyId;
var AWS_SECRET_ACCESS_KEY = AWS_CONFIG.secretAccessKey;
var AWS_REGION = AWS_CONFIG.region;
var host = 'sdb.' + AWS_REGION + '.amazonaws.com';

exports.client = function(domain){

  var sdb = new simpledb.SimpleDB(
    { keyid: AWS_ACCESS_KEY_ID, secret: AWS_SECRET_ACCESS_KEY, host: host }
  // , simpledb.debuglogger
  );

  return {
    put: function(id, attr, callback){
      sdb.createDomain(domain, function(err, res, meta){
        if (err) {
          callback(err, id, attr, meta);
        } else {

          /**
           * Store the attributes:
           */

          sdb.putItem(
            domain,
            id,
            packer.pack(attr),
            function (err){
              callback(err, id);
            }
          );
        }
      });
    },

    get: function(id, callback){
      sdb.getItem(domain, id, function(err, attr, meta){
        if (err) {
          callback(err, id, attr, meta);
        } else {
          delete attr.$ItemName;

          callback(null, id, packer.unpack(attr));
        }
      });
    },

    del: function(id, callback){
      sdb.deleteItem(domain, id, function(err, attr, meta){
        if (err) {
          callback(err, id, attr, meta);
        } else {
          callback(null, id);
        }
      });
    }
  };
};
