var should = require('should'),
    mongoose = require('mongoose'),
    Item = require('../models/item.server.model'),
    config = require('../config/config');

var listing, id;

item =  {
  name: "test",
  price: 2,
  vendor: "test vendor"
}

describe('Item Schema Unit Tests', function() {

  before(function(done) {
    mongoose.connect(config.db.uri);
    done();
  });

  describe('Saving to database', function() {
    /*
      Mocha's default timeout for tests is 2000ms. To ensure that the tests do not fail
      prematurely, we can increase the timeout setting with the method this.timeout()
     */
    this.timeout(10000);

    it('saves properly when name, price, and vendor provided', function(done){
      new Item({
        name: item.name,
        price: item.price,
        vendor: item.vendor
      }).save(function(err, item){
        should.not.exist(err);
        id = item._id;
        done();
      });
    });

    it('throws an error when name not provided', function(done){
      new Item({
        price: item.price,
        vendor: item.vendor
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when vendor not provided', function(done){
      new Item({
        name: item.name,
        price: item.price
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when price not provided', function(done){
      new Item({
        name: item.name,
        vendor: item.vendor
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

  });

  afterEach(function(done) {
    if(id) {
      Item.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});
