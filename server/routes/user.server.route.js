const express = require('express');
const router = express.Router();

// User model
var user = require('../models/user.server.model');

// Register Form
router.get('/api/user', function(req, res){
  res.render('customer_register_page');
});

// Register Process
router.post('/api/user', function(req, res){
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
    let newUser = new user({
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
            req.flash('success','You are now a registered user and can log in!');
            //res.redirect('/cl');
          }
        });
      });
    });
  }
});


router.param('userId', user.userByID);


module.exports = router;