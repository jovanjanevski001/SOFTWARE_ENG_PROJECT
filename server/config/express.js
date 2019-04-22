var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    itemsRouter = require('../routes/item.server.routes.js'),
    ordersRouter = require('../routes/order.server.routes.js'),
    usersRouter= require('../routes/customer.server.routes.js');

module.exports.init = function() {
  //connect to database
mongoose.connect(config.db.uri, {useMongoClient: true});

  //initialize app
  var app = express();

  //enable request logging for development debugging
  app.use(morgan('dev'));

  //body parsing middleware
  app.use(bodyParser.json());


  /**TODO
  Serve static files */
  var options={index: "home_landing_page.html"};

  app.use('/', express.static(__dirname + '/../../client', options));

  app.use('/v', express.static(__dirname + '/../../client/vendor_landing_page.html'));

  app.use('/c', express.static(__dirname + '/../../client/customer_landing_page.html'));

  app.use('/cr', express.static(__dirname + '/../../client/customer_register_page.html'));

  app.use('/vr', express.static(__dirname + '/../../client/vendor_register_page.html'));

  app.use('/vl', express.static(__dirname + '/../../client/vendor_login_page.html'));

  app.use('/cl', express.static(__dirname + '/../../client/customer_login_page.html'));

  app.use('/ac', express.static(__dirname + '/../../client/account_page.html'));

  app.use('/ch', express.static(__dirname + '/../../client/checkout_page.html'));

  app.use('/al', express.static(__dirname + '/../../client/admin_login_page.html'));

  app.use('/a', express.static(__dirname + '/../../client/admin_landing_page.html'));

  app.use('/ar', express.static(__dirname + '/../../client/admin_register_page.html'));

  app.use('/o', express.static(__dirname + '/../../client/order_history.html'));
  /**TODO
  Use the listings router for requests to the api */
  app.use('/api/items', itemsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/orders', ordersRouter);

  /**TODO
  Go to homepage for all routes not specified */
  app.all('/*', function(req, res) {
    res.sendFile(path.resolve('client/home_landing_page.html'));
  });

  return app;
};
