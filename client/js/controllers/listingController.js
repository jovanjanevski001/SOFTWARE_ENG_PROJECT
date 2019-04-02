angular.module('items').controller('ItemsController', ['$scope', 'Items', 'Auth',
  function($scope, Items, Auth) {
    /* Get all the listings, then bind it to the scope */
    Items.getAll().then(function (response) {
      $scope.items = response.data;
    }, function (error) {
      console.log('Unable to retrieve items:', error);
    });

    if(Auth.isLoggedIn()){
      Auth.getInfo().then(function(data){
        $scope.isLoggedIn=!data.data.failure;
        $scope.username=data.data.username;
      });
    }

    $scope.detailedInfo = undefined;
    $scope.cart = [];

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

      Items.create(item).then(function(response){$scope.newItem.name =''; $scope.newItem.price=''; $scope.newItem.vendor='';
      }, function(error){
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

    $scope.order = function() {

      angular.forEach($scope.cart, function(value, key){
        Items.delete(value._id);
      });
      $scope.cart=[];


    };

    /** DONE WITH deleteListing **/

    $scope.showDetails = function (index) {
      $scope.detailedInfo = $scope.items[index];
    };

    $scope.deleteItem=function(index, id)
    {
      $scope.items.splice(index,1);
      Items.delete(id);
    }
    $scope.checkout = function () {
      var order = {
        useremail: undefined,
        order: $scope.cart
      };
      Items.createOrder(order).then(function (error) {
        $scope.error = 'order not saved\n' + error;
      });

      for (let i = 0; i < $scope.cart.length; i++) {
        Items.delete($scope.cart[i]._id).then(function (response) {
          $scope.cart = [];
        }, function (error) {
          $scope.error = 'item not deleted\n' + error;
        });
      }
    };

}
]);
