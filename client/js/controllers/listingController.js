angular.module('items').controller('ListingsController', ['$scope', 'Items',
  function($scope, Items) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.items = response.data;
    }, function(error) {
      console.log('Unable to retrieve items:', error);
    });

    $scope.detailedInfo = undefined;
    $scope.cart = [];

    $scope.addItem = function() {
	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
      var item = {
        name: $scope.newItem.name,
        code: $scope.newItem.code,
        address: $scope.newItem.address
      };

      $scope.items.push($scope.newItem);
      $scope.newItem = {};

      Items.create(item).then(function(response){$scope.newItem.name =''; $scope.newItem.code=''; $scope.newItem.address='';
      }, function(error){
        $scope.error = 'item not saved\n' + error;
      });


    };
    /** DONE WITH addListing **/

    $scope.deleteItem = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */


      var id = $scope.items[index];
      console.log('item '+ id._id);

      Items.delete(id._id).then(function(response){console.log('Deleted')},
      function(error){console.log('error')}
    );
      $scope.items.splice(index, 1);

    };

    /** DONE WITH deleteListing **/

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.items[index];
    };

    $scope.addToCart = function(index) {
      /** TODO Cart function
       */
    }
  }
]);
