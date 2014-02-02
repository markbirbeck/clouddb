require('../config/set_defaults');

var _ = require('lodash');
var CONFIG = require('config');
var knox = require('knox');
var util = require('util');


/**
 * Get our AWS keys and region:
 */

var AWS_CONFIG = CONFIG.aws;
var AWS_ACCESS_KEY_ID = AWS_CONFIG.accessKeyId;
var AWS_SECRET_ACCESS_KEY = AWS_CONFIG.secretAccessKey;

exports.client = function(bucket, private) {
  private = private || true;

  /**
   * Make a connection to the bucket:
   */

  var client = knox.createClient({
    key: AWS_ACCESS_KEY_ID
  , secret: AWS_SECRET_ACCESS_KEY
  , bucket: bucket
  });

  /**
   * Return an object with methods for manipulating the
   * bucket:
   */

  return {
    get: function(path, callback){
      client
        .get(path)
        .on('response', function(res){
          var body
            , str = '';

          res.setEncoding('utf8');

          res.on('data', function (chunk) {
            str += chunk;
          });

          res.on('end', function () {
            if (200 === res.statusCode) {
              if (res.headers['content-type'].substring(0, 5) === 'text/'){
                body = str;
              } else {
                body = JSON.parse(str);
              }
              callback(null, res.req.url, body);
            } else {
              callback(
                new Error(
                  util.format(
                   'Failed to GET document from: %s (%s)',
                   res.req.url,
                   res.statusCode
                  )
                )
              );
            }
          });
        })
        .end();
    },

    put: function(path, object, contentType, callback){
      if (typeof contentType === 'function'){
        callback = contentType;
        contentType = undefined;
      }

      /**
       * Work out what we're sending: strings get pushed
       * unmodified, whilst JSON objects get turned into
       * strings and the Content-Type header set:
       */

      var string;

      if (contentType){
        string = object;
      } else {
        if (_.isString(object)){
          string = object;
          contentType = 'text/plain';
        } else {
          string = JSON.stringify(object);
          contentType = 'application/json';
        }
      }

      var headers = {
        'Content-Length': Buffer.byteLength(string)
      , 'Content-Type': contentType
      , 'x-amz-storage-class': 'REDUCED_REDUNDANCY'
      };

      if (!this.private){
        headers['x-amz-acl'] = 'public-read';
      }

      client

        /**
         * NOTE: Don't try to use client.putBuffer() since it doesn't calculate
         * the string length correctly with UTF8.
         */

        .put(path, headers)
        .on('response', function(res){
          if ([200, 201, 204].indexOf(res.statusCode) >= 0) {
            callback(null, res.req.url);
          } else {
            console.log(res.req);
            callback(
              new Error(
                util.format(
                 'Failed to PUT document to: %s (%s)',
                 res.req.url,
                 res.statusCode
                )
              )
            );
          }
        })
        .end(string);
    },

    del: function(path, callback) {
      client
        .del(path)
        .on('response', function(res){
          if ([200, 202, 204].indexOf(res.statusCode) >= 0) {
            callback(null, res.req.url);
          } else {
            callback(
              new Error(
                util.format(
                 'Failed to DELETE document at: %s (%s)',
                 res.req.url,
                 res.statusCode
                )
              )
            );
          }
        })
        .end();
    }
  };
};
