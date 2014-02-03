require('../config/set_defaults');

exports.client = function(domain){
  var docStore = require('./s3').client(domain);
  var metaStore = require('./sdb').client(domain);

  return {
    put: function(id, object, meta, callback){
      if (typeof meta == 'function'){
        callback = meta;
        meta = {};
      }

      docStore.put(id, object, function(err, url){
        if (err) {
          callback(err, url);
        } else {
          meta.s3Path = id;
          metaStore.put(id, meta, callback);
        }
      });
    }

  , get: function(id, callback){
      metaStore.get(id, function(err, id, meta){
        if (err) {
          callback(err, id);
        } else {
          docStore.get(meta.s3Path, function(err, path, doc){
            if (err) {
              callback(err, path);
            } else {
              callback(null, id, doc, meta);
            }
          });
        }
      });
    }
  };
};
