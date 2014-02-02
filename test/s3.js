var bucket = 'crowdbiz';
var docStore = require('../lib/s3').client(bucket);
var should = require('should');


var fixture = [
  {
    'CompanyName': '"BELLE-VUE" ENTERPRISES LIMITED',
    'CompanyNumber': '06477691',
    'RegAddress': {
      'AddressLine1': 'ST ANN\'S HOUSE',
      'AddressLine2': 'ST ANN\'S STREET',
      'PostTown': 'KINGS LYNN',
      'County': 'NORFOLK',
      'Postcode': 'PE30 1LT'
    },
    'CompanyCategory': 'Private Limited Company',
    'CompanyStatus': 'Active',
    'CountryOfOrigin': 'United Kingdom',
    'IncorporationDate': '30/04/2002',
    'Accounts': {
      'AccountRefDay': '31',
      'AccountRefMonth': '05',
      'NextDueDate': '28/02/2013',
      'LastMadeUpDate': '31/05/2011',
      'AccountCategory': 'TOTAL EXEMPTION SMALL'
    },
    'Returns': {
      'NextDueDate': '25/05/2013',
      'LastMadeUpDate': '27/04/2012'
    },
    'SICCodes': {
      'SicText': [
        '56101 - Licensed restaurants'
      ]
    },
    'id': '06477691'
  }
  , 'A simple string of text'
  , {
    'category': 'unknown'
  , 'product_hash': '5b0e4b4e040652991c7df1ee'
  , 'name': 'Jelly Pong Pong Mascara Lash Extension & Shadow Taffy SAVE £17.00'
  }
];

describe('doc store:', function(){
  describe('JSON:', function(){

    var id = '/test/06477691.json'
      , path = 'https://' + bucket + '.s3.amazonaws.com' + id;

    it('put by id', function(done){
      docStore.put(id, fixture[0], function(err, url){
        should.not.exist(err);
        url.should.equal(path);
        done();
      });
    });

    it('get by id', function(done){
      docStore.get(id, function(err, url, doc){
        should.not.exist(err);
        url.should.equal(path);
        doc.should.eql(fixture[0]);
        done();
      });
    });

    it('delete by id', function(done){
      docStore.del(id, function(err, url){
        should.not.exist(err);
        url.should.equal(path);
        done();
      });
    });
  });

  describe('Plain text:', function(){
    var id = '/test/06477691.txt'
      , path = 'https://' + bucket + '.s3.amazonaws.com' + id;

    it('put by id', function(done){
      docStore.put(id, fixture[1], function(err, url){
        should.not.exist(err);
        url.should.equal(path);
        done();
      });
    });

    it('get by id', function(done){
      docStore.get(id, function(err, url, doc){
        should.not.exist(err);
        url.should.equal(path);
        doc.should.eql(fixture[1]);
        done();
      });
    });

    it('delete by id', function(done){
      docStore.del(id, function(err, url){
        should.not.exist(err);
        url.should.equal(path);
        done();
      });
    });
  });

  describe('JSON with UTF8:', function(){
    var id = '/test/06477691.json'
      , path = 'https://' + bucket + '.s3.amazonaws.com' + id;

    it('put by id', function(done){
      docStore.put(id, fixture[2], function(err, url){
        should.not.exist(err);
        url.should.equal(path);
        done();
      });
    });

    it('get by id', function(done){
      docStore.get(id, function(err, url, doc){
        should.not.exist(err);
        url.should.equal(path);
        doc.should.eql(fixture[2]);
        done();
      });
    });

    it('delete by id', function(done){
      docStore.del(id, function(err, url){
        should.not.exist(err);
        url.should.equal(path);
        done();
      });
    });
  });

});
