var packer = require('../lib/sdb_packer');
require('should');

describe('SimpleDB data packer', function(){
  describe('Numbers', function(){
    it('should pack numbers', function(){
      packer.pack({'age': 23}).should.eql({'age': 'number:0000000023'});
    });

    it('should unpack numbers', function(){
      packer.unpack({'price': 'number:0000001234'}).should.eql({'price': 1234});
    });
  });

  describe('Strings', function(){
    it('should pack strings', function(){
      packer.pack(
        {'name': 'James Bond'}
      ).should.eql(
        {'name': 'string:James Bond'}
      );
    });

    it('should unpack strings', function(){
      packer.unpack(
        {'name': 'string:Dr. Evil'}
      ).should.eql(
        {'name': 'Dr. Evil'}
      );
    });

    it('should pack strings with the separator character in', function(){
      packer.pack({
        'title': 'Job: The Story of a Simple Man'
      }).should.eql({
        'title': 'string:Job: The Story of a Simple Man'
      });
    });

    it('should unpack strings with the separator character in', function(){
      packer.unpack({
        'title': 'string:On Tolerance: The Life Style Wars: A Defence of Moral Independence'
      }).should.eql({
        'title': 'On Tolerance: The Life Style Wars: A Defence of Moral Independence'
      });
    });
  });

  describe('Objects', function(){
    it('should pack a full object', function(){
      packer.pack({
        'author': 'Ivan Turgenev'
      , 'title': 'Fathers and Sons'
      , 'price': 499
      }).should.eql({
        'author': 'string:Ivan Turgenev'
      , 'title': 'string:Fathers and Sons'
      , 'price': 'number:0000000499'
      });
    });

    it('should unpack a full object', function(){
      packer.unpack({
        'author': 'string:Hans Fallada'
      , 'title': 'string:Alone in Berlin'
      , 'price': 'number:0000000689'
      }).should.eql({
        'author': 'Hans Fallada'
      , 'title': 'Alone in Berlin'
      , 'price': 689
      });
    });

    it('should round-trip an object', function(){
      var book = {
        'author': 'Ralph Ellison'
      , 'title': 'Invisible Man'
      , 'price': 689
      };
      book.should.eql(packer.unpack(packer.pack(book)));
    });
  });
});
