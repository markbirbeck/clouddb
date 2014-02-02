var _ = require('lodash');
var metaStore = require('../lib/sdb').client('crowdbiz');
var should = require('should');

var fixture = {
  'CompanyName': '"BELLE-VUE" ENTERPRISES LIMITED'
, 'CompanyNumber': '06477691'
};

describe('Meta store:', function(){
  var id = '/test/06477691';

  it('should put by id', function(done){
    metaStore.put(id, fixture, function(err, _id){
      should.not.exist(err);
      _id.should.equal(id);
      done();
    });
  });

  it('should get by id', function(done){
    metaStore.get(id, function(err, _id, attr){
      should.not.exist(err);
      _id.should.equal(id);
      var meta = _.clone(fixture);
      meta.s3Path = id + ".json";
      attr.should.eql(meta);
      done();
    });
  });

  it('should delete by id', function(done){
    metaStore.del(id, function(err, _id){
      should.not.exist(err);
      _id.should.equal(id);
      done();
    });
  });
});
