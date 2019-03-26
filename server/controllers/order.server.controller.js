/* Dependencies */
var mongoose = require('mongoose'),
    Order = require('../models/order.server.model.js');

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
  var order = new Order(req.body);


  /* Then save the listing */
  order.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(order);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.order);
};

/* Update a listing */
exports.update = function(req, res) {
  var order = req.order;

  // change the contents of listing to the req's body contents
  order.name = req.body.name;
  order.price= req.body.price;
  order.vendor= req.body.vendor;

  /* Save the listing */
  order.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(order);
    }
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var order = req.order;

  /* Remove the specified contents */
  order.remove(function(err) {
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
  Order.find().sort('useremail').exec(function(err, orders) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(orders);
    }
  });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.
  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.orderByID = function(req, res, next, id) {
  Order.findById(id).exec(function(err, order) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.order = order;
      next();
    }
  });
};
