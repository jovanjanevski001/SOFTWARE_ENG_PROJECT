/* Dependencies */
var mongoose = require('mongoose'),
    User = require('../models/user.server.model.js');

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
  var user = new User(req.body);


  /* Then save the listing */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Show the current listing */
exports.read = function(req, res) {
  /* send back the listing as json from the request */
  res.json(req.user);
};

/* Update a listing */
exports.update = function(req, res) {
  var user = req.user;

  // change the contents of listing to the req's body contents
  user.userName = req.body.userName;
  user.email= req.body.email;
  user.password= req.body.password;

  /* Save the listing */
  user.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(user);
    }
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var user = req.user;

  /* Remove the specified contents */
  user.remove(function(err) {
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
  User.find().sort('userName').exec(function(err, users) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(users);
    }
  });
};

/*
  Middleware: find a listing by its ID, then pass it to the next request handler.
  HINT: Find the listing using a mongoose query,
        bind it to the request object as the property 'listing',
        then finally call next
 */
exports.userByID = function(req, res, next, id) {
  User.findById(id).exec(function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.user = user;
      next();
    }
  });
};
