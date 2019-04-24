angular.module('items').controller('ItemsController', ['$scope', 'Items', 'Auth', 'Orders',
  function($scope, Items, Auth, Orders) {
    /* Get all the listings, then bind it to the scope */
    Items.getAll().then(function (response) {
      $scope.items = response.data;
    }, function (error) {
      console.log('Unable to retrieve items:', error);
    });

    $scope.email = null;

    if (Auth.isLoggedIn()) {
      Auth.getInfo().then(function (data) {
        $scope.isLoggedIn = !data.data.failure;
        $scope.username = data.data.username;
        $scope.email = data.data.email;
      });
    }

    $scope.detailedInfo = undefined;
    $scope.cart = [];
    $scope.accountOrders = [];

    $scope.addItem = function () {
      /**TODO
       *Save the article using the Listings factory. If the object is successfully
       saved redirect back to the list page. Otherwise, display the error
       */
      var item = {
        name: $scope.newItem.name,
        price: $scope.newItem.price,
        vendor: $scope.username
      };

      $scope.items.push($scope.newItem);
      $scope.newItem = {};

      Items.create(item).then(function (response) {
        $scope.newItem.name = '';
        $scope.newItem.price = '';
        $scope.newItem.vendor = '';
      }, function (error) {
        console.log('Hi');
        $scope.error = 'item not saved\n' + error;
      });


    };
    /** DONE WITH addListing **/
    $scope.addToCart = function (index, item) {
      $scope.cart.push(item);
      $scope.items.splice(index, 1);
    };

    $scope.removeFromCart = function (index, item) {
      $scope.cart.splice(index, 1);
      $scope.items.push(item);
    };

    $scope.storeCart = function () {
      sessionStorage.setItem('cart', JSON.stringify($scope.cart));
      sessionStorage.setItem('user', JSON.stringify($scope.email))
    };

    $scope.getCart = function () {
      $scope.cart = JSON.parse(sessionStorage.getItem('cart'));
      sessionStorage.removeItem('cart');
    };


    /** DONE WITH deleteListing **/

    $scope.showDetails = function (index) {
		console.log('hi');
      $scope.detailedInfo = $scope.items[index];
    };

    $scope.showCartDetails = function (index) {
      $scope.detailedInfo = $scope.cart[index];
    };

    $scope.deleteItem = function (index, id) {
      $scope.items.splice(index, 1);
      Items.delete(id);
    };

    $scope.order = function () {
      angular.forEach($scope.cart, function (value, key) {
        Items.delete(value._id);
      });
      $scope.cart = [];
    };

    $scope.checkout = function () {
      var order = {
        user_email: $scope.email,
        vendor: [],
        item: [],
        price: 0
      };

      $scope.cart.forEach(function (value, i) {
        order.item[i] = value.name;
        order.vendor[i] = value.vendor;
        order.price += value.price;
      });

      Orders.create(order).then(function (error) {
          $scope.error = 'order not saved\n' + error;
        });

      $scope.cart.forEach(function (value) {
        Items.delete(value._id);
      });

      $scope.cart = [];
    };

    Orders.getAll().then(function(response){
      $scope.orders = response.data;

      $scope.orders.forEach(function(value){
        if (value.user_email === $scope.email){
          $scope.accountOrders.push(value);
        }
      });
      sessionStorage.setItem('orders',JSON.stringify($scope.accountOrders));

    }, function(error){
      console.log('Unable to retrieve orders:', error);
    });

    $scope.showOrderDetails = function (index) {
      $scope.detailedInfo = $scope.orders[index];
    };
  }
]);
