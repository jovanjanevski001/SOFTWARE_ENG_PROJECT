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
