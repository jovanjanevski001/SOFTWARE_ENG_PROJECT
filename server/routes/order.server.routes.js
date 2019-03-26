/* Dependencies */
var orders = require('../controllers/order.server.controller.js'),
    express = require('express'),
    router = express.Router();


router.route('/')
  .get(orders.list)
  .post(orders.create);


router.route('/:orderId')
  .get(orders.read)
  .put(orders.update)
  .delete(orders.delete);


router.param('orderId', orders.orderByID);

module.exports = router;
