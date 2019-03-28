/* Dependencies */
var users = require('../controllers/user.server.controller.js'),
    express = require('express'),
    router = express.Router();

/*
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */

router.route('/')
  .get(users.list)
  .post(users.create);


/*
  The ':' specifies a URL parameter.
 */
router.route('/:userId')
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.

  Say we make an example request to '/listings/566372f4d11de3498e2941c9'

  The request handler will first find the specific listing using this 'listingsById'
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database,
  and bind this listing to the request object.

  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */
router.param('userId', users.userByID);

module.exports = router;





/* // User model
var users = require('../models/user.server.model');

const express = require('express');
const router = express.Router();


// Register Form
router.get('/cr', function(req, res){
  res.render('customer_register_page');
});

// Register Process
router.post('cr', function(req, res){
  var userName = req.body.userName;
  var email = req.body.email;
  //var userType = req.body.userType;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('userName', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  //req.checkBody('userType', 'User Type is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('customer_register_page', {
      errors:errors
    });
  } else {
    let newUser = new users({
      username:username,
      email:email,
	 // userType:userType,
      password:password
    });

	// once here, newUser is created but still need to hash the pw
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
          }
        });
      });
    });
  }
});


module.exports = router; */