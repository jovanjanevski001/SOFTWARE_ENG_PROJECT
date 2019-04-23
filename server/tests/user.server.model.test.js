var should = require('should'),
    mongoose = require('mongoose'),
    User = require('../models/user.server.model'),
    config = require('../config/config');

var listing, id;

user =  {
  username: "testVendor",
  email: 'test@test.com',
  userType: "vendor",
  pw: "1234"
}

describe('User Schema Unit Tests', function() {

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

    it('saves properly when username, email, user type and password provided', function(done){
      new User({
        username: user.username,
        email: user.email,
        userType: user.userType,
        pw: user.pw
      }).save(function(err, user){
        should.not.exist(err);
        id = user._id;
        done();
      });
    });

    it('throws an error when password not provided', function(done){
      new User({
        username: user.username,
        email: user.email,
        userType: user.userType
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when usertype not provided', function(done){
      new User({
        username: user.username,
        email: user.email,
        pw: user.pw
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

    it('throws an error when email not provided', function(done){
      new User({
        username: user.username,
        userType: user.userType,
        pw: user.pw
      }).save(function(err){
        should.exist(err);
        done();
      })
    });
    it('throws an error when username not provided', function(done){
      new User({
        email: user.email,
        userType: user.userType,
        pw: user.pw
      }).save(function(err){
        should.exist(err);
        done();
      })
    });

  });

  afterEach(function(done) {
    if(id) {
      User.remove({ _id: id }).exec(function() {
        id = null;
        done();
      });
    } else {
      done();
    }
  });
});
