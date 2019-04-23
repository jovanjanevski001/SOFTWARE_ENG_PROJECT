var should = require('should'),
    request = require('supertest'),
    express = require('../config/express'),
    Item = require('../models/item.server.model.js');

/* Global variables */
var app, agent, item, id;

/* Unit tests for testing server side routes for the listings API */
describe('Item CRUD tests', function() {

  this.timeout(10000);

  before(function(done) {
    app = express.init();
    agent = request.agent(app);

    done();
  });

  it('should it able to retrieve all items', function(done) {
    agent.get('/api/items')
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        done();
      });
  });
  it('should be able to retrieve a single item', function(done) {
    Item.findOne({name: 'rice'}, function(err, item) {
      if(err) {
        console.log(err);
      } else {
        agent.get('/api/items/' + item._id)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            should.exist(res);
            res.body.name.should.equal('rice');
            res.body.price.should.equal(5);
            res.body.vendor.should.equal('testV');
            res.body._id.should.equal(item._id.toString());
            done();
          });
      }
    });
  });

  it('should be able to save a item', function(done) {
    var item = {
      name: 'Alvins hot juicebox',
      price: 7,
      vendor: 'andrew'
    };
    agent.post('/api/items')
      .send(item)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.name.should.equal('Alvins hot juicebox');
        res.body.price.should.equal(7);
        res.body.vendor.should.equal('andrew');
        id = res.body._id;
        done();
      });
  });

  it('should be able to update a item', function(done) {
    var updatedListing = {
      name: 'Cooler Alvin',
      price: 9,
      vendor: 'jon'
    };

    agent.put('/api/items/' + id)
      .send(updatedListing)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res.body._id);
        res.body.name.should.equal('Cooler Alvin');
        res.body.price.should.equal(9);
        res.body.vendor.should.equal('jon');
        done();
      });
  });

  it('should be able to delete a item', function(done) {
    agent.delete('/api/items/' + id)
      .expect(200)
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);

        agent.get('/api/items/' + id)
          .expect(400)
          .end(function(err, res) {
            id = undefined;
            done();
          });
      })
  });

  after(function(done) {
    if(id) {
      Item.remove({_id: id}, function(err){
        if(err) throw err;
        done();
      })
    }
    else {
        done();
    }
  });
});
