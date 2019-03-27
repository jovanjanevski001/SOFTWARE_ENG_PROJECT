const express = require('express');
const router = express.Router();

// Bring in User Model
let User = require('../models/user.server.model');

// Register Form
router.get('/cr', function(req, res){
  res.render('cr');
});

// Register Process
router.post('/cr', function(req, res){
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
    res.render('cr', {
      errors:errors
    });
  } else {
    let newUser = new User({
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
            res.redirect('/cl');
          }
        });
      });
    });
  }
});

module.exports = router;