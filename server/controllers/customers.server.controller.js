/* Dependencies */
var mongoose = require('mongoose'),
    jwt= require('jsonwebtoken'),
    secret='ryangoslingdrive',
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
customer.save(function(err){
  if(err) {
    console.log(err);
    res.status(400).send(err);
  }
  else{
    res.json(customer);
  }
});
  /*bcrypt.genSalt(10, function(err, salt){
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
          res.json(item);
        }
      });
      });
    });*/
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
  customer.username = req.body.username;
  customer.email=req.body.email;
  customer.pw = req.body.pw;


  customer.creditCardName = req.body.creditCardName;
  customer.creditCardNumber = req.body.creditCardNumber;
  customer.creditCardExpYear = req.body.creditCardExpYear;
  customer.creditCardExpMonth = req.body.creditCardExpMonth;
  customer.creditCardSecurityNum = req.body.creditCardSecurityNum;
  customer.creditCardType = req.body.creditCardType;


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
  Customer.find().sort('code').exec(function(err, customers) {
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

exports.validate= function(req, res){
  Customer.findOne({username: req.body.username}).select('username userType email pw').exec(function(err,user){
    if(err) throw err;

    if(!user){
      res.json({success: false, message: 'Could not find user'});
    } else if(user) {
      if(user.userType!==req.body.userType)
      {
        res.json({success:false, message: 'Wrong login type'});
      } else {
        if(req.body.pw){
          var validPassword= user.pw==req.body.pw;
        } else{
          res.json({success:false, message: 'No password provided'});
        }
        if(!validPassword){
          res.json({success:false, message: 'Incorrect password'});
        } else {
          var token=jwt.sign({ username: user.username, userType: user.userType, email: user.email }, secret, {expiresIn: '30m'} );
          res.json({success:true, message: 'Login successful!', token: token});
        }
    }
  }
  });
};

exports.returnToken= function(req, res){
  var token= req.body.token || req.body.query || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, function(err, decoded){
      if(err){
        res.json({failure: true, message: 'Token invalid'});
      } else {
        req.decoded= decoded;
        res.send(req.decoded);
      }
    });
  }
};
