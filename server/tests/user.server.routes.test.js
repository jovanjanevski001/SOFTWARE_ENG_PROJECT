var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    User = require('../models/user.server.model.js');

/* Global variables */
var app, agent, user, id;

/* Unit tests for testing server side routes for the listings API */
describe('User CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init();
    agent = request.agent(app);

    done();
  });

  it('should it able to retrieve all users', function(done) {
    agent.get('/api/users')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });
  it('should be able to retrieve a single user', function(done) {
    User.findOne({username: 'andrew'}, function(err, user) {
      if(err) {
        console.log(err);
      } else {
        agent.get('/api/users/' + user._id)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.username.should.equal('andrew');
            res.body.email.should.equal('andrewf@gmail.com');
            res.body.userType.should.equal('customer');
            res.body._id.should.equal(user._id.toString());
            done();
          });
      }
    });
  });

  it('should be able to save a user', function(done) {
    var user = {
      username: 'Alvins hot juicebox',
      email: '333',
      userType: 'customer',
      pw:'1234'
    };
    agent.post('/api/users')
      .send(user)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.username.should.equal('Alvins hot juicebox');
        res.body.email.should.equal('333');
        res.body.userType.should.equal('customer');
        res.body.pw.should.equal('1234');
        id = res.body._id;
        done();
      });
  });

  it('should be able to update a user', function(done) {
    var updatedListing = {
      username: 'Cooler Alvin',
      email: 'notasfake@fake.com',
      pw: '4321'
    };

    agent.put('/api/users/' + id)
      .send(updatedListing)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.username.should.equal('Cooler Alvin');
        res.body.email.should.equal('notasfake@fake.com');
        res.body.pw.should.equal('4321');
        done();
      });
  });

  it('should be able to delete a user', function(done) {
    agent.delete('/api/users/' + id)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);

        agent.get('/api/users/' + id)
          .expect(400)
          .end(function(err, res) {
            id = undefined;
            done();
          });
      })
  });

  after(function(done) {
    if(id) {
      User.remove({_id: id}, function(err){
        if(err) throw err;
        done();
      })
    }
    else {
        done();
    }
  });
});
