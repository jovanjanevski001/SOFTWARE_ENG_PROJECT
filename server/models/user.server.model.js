/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
// Creating the Schema that will model our data from listings
var userSchema = new Schema({
  /* your code here */

  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  userType:{type: String, required: true},
  pw:	{type: String, required: true},

  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
userSchema.pre('save', function(next) {
  /* your code here */

  //get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at date doesnt exist, add to that field
  if(!this.created_at)
  this.created_at = currentDate;

  next();
});

/* Use your schema to instantiate a Mongoose model */
// Instantiates a new mongoose model of listingSchema
var User = mongoose.model('User', userSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = User;	// Now we can use the newly created model in our other files
