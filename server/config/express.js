var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    itemsRouter = require('../routes/item.server.routes'),
    ordersRouter = require('../routes/order.server.routes');

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

  //app.use('/h', express.static(__dirname + '/../../client/home_landing_page.html'))

  app.use('/c', express.static(__dirname + '/../../client/customer_register_page.html'));
  /**TODO
  Use the listings router for requests to the api */
  app.use('/api/items', itemsRouter);
  app.use('/api/orders', ordersRouter);

  /**TODO
  Go to homepage for all routes not specified */
  app.all('/*', function(req, res) {
    res.sendFile(path.resolve('client/customer_landing_page.html'));
  });

  return app;
};
