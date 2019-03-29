/* Dependencies */
var mongoose = require('mongoose'),
    Customer = require('../models/user.server.model.js');
    const bcrypt = require('bcryptjs');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.
  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a listing */
exports.create = function(req, res) {

  /* Instantiate a Listing */

  var customer = new Customer(req.body);

  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(customer.pw, salt, function(err, hash){
      if(err){
        console.log(err);
      }
      customer.pw = hash;
      customer.save(function(err) {
        if(err) {
          console.log(err);
          res.status(400).send(err);
        } else {
          res.json(customer);
        }
      });
      });
    });
  };

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.customer);
};

/* Update a listing */
exports.update = function(req, res) {
  var customer = req.customer;

  // change the contents of listing to the req's body contents
  customer.name = req.body.name;
  customer.cardNumber = req.body.cardNumber;
  customer.pw = req.body.pw;

  /* Save the listing */
  customer.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(customer);
    }
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var customer = req.customer;

  /* Remove the specified contents */
  customer.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  })
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.list = function(req, res) {
  /* Your code here */

  // Grabs all the listings, and sorts them in alpabetical order based on code.
  Customer.find().sort('username').exec(function(err, customers) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(customers);
    }
  });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.
  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.customerByID = function(req, res, next, id) {
  Customer.findById(id).exec(function(err, customer) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.customer = customer;
      next();
    }
  });
};
