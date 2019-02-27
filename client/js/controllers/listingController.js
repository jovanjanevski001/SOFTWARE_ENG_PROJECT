angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
      var listing = {
        name: $scope.newListing.name,
        code: $scope.newListing.code,
        address: $scope.newListing.address
      };

      $scope.listings.push($scope.newListing);
      $scope.newListing = {};

      Listings.create(listing).then(function(response){$scope.newListing.name =''; $scope.newListing.code=''; $scope.newListing.address='';
      }, function(error){
        $scope.error = 'listing not saved\n' + error;
      });


    };
    /** DONE WITH addListing **/

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */


      var id = $scope.listings[index];
      console.log('listing '+ id._id);

      Listings.delete(id._id).then(function(response){console.log('Deleted')},
      function(error){console.log('error')}
    );
      $scope.listings.splice(index, 1);

    };

    /** DONE WITH deleteListing **/

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
