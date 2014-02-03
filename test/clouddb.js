var mainStore = require('../lib/clouddb').client('crowdbiz');
var should = require('should');

var fixture = [];

fixture[0] = {
  'CompanyName': '"BELLE-VUE" ENTERPRISES LIMITED'
, 'CompanyNumber': '06477691'
, 'RegAddress': {
    'AddressLine1': 'ST ANN\'S HOUSE'
  , 'AddressLine2': 'ST ANN\'S STREET'
  , 'PostTown': 'KINGS LYNN'
  , 'County': 'NORFOLK'
  , 'Postcode': 'PE30 1LT'
  }
, 'CompanyCategory': 'Private Limited Company'
, 'CompanyStatus': 'Active'
, 'CountryOfOrigin': 'United Kingdom'
, 'IncorporationDate': '30/04/2002'
, 'Accounts': {
    'AccountRefDay': '31'
  , 'AccountRefMonth': '05'
  , 'NextDueDate': '28/02/2013'
  , 'LastMadeUpDate': '31/05/2011'
  , 'AccountCategory': 'TOTAL EXEMPTION SMALL'
  }
, 'Returns': {
    'NextDueDate': '25/05/2013'
  , 'LastMadeUpDate': '27/04/2012'
  }
, 'SICCodes': {
    'SicText': [
      '56101 - Licensed restaurants'
    ]
  }
, 'id': '06477691'
};

fixture[1] = '<p>Hello, world!</p>';

describe('clouddb: ', function(){

  describe('JSON', function(){
    it('should put doc+metadata by id', function(done){
      mainStore.put('/test/06477691', fixture[0], function(err, id){
        should.not.exist(err);
        id.should.equal('/test/06477691');
        done();
      });
    });

    it('should get doc+metadata by id', function(done){
      mainStore.get('/test/06477691', function(err, id, doc, meta){
        should.not.exist(err);
        id.should.equal('/test/06477691');
        doc.should.eql(fixture[0]);
        meta.should.eql({s3Path: id});
        done();
      });
    });
  });

  describe('HTML', function(){
    var path = '/test/blog-post';

    it('should put doc+metadata by id', function(done){
      mainStore.put(path, fixture[1], {contentType: 'text/html'},
        function(err, id){
          should.not.exist(err);
          id.should.equal(path);
          done();
        }
      );
    });

    it('should get doc+metadata by id', function(done){
      mainStore.get(path, function(err, id, doc, meta){
        should.not.exist(err);
        id.should.equal(path);
        doc.should.eql(fixture[1]);
        meta.should.eql({
          s3Path: id
        , contentType: 'text/html'
        });
        done();
      });
    });
  });
});
