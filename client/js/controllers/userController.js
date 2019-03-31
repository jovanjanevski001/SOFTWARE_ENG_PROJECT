angular.module('users').controller('UsersController', ['$scope', 'Users',
  function($scope, Users) {
    /* Get all the listings, then bind it to the scope */
    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.addUser = function() {
	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
   var check=$scope.newUser.password;
   var check2=$scope.newUser.password2;

   if(check===check2){

      var user = {
        username: $scope.newUser.username,
        email: $scope.newUser.email,
        userType: 'customer',
        pw: $scope.newUser.password
      };
      $scope.users.push($scope.user);
      $scope.newUser = {};

      Users.create(user).then(function(response){$scope.newUser.username =''; $scope.newUser.email=''; $scope.newUser.password=''; $scope.newUser.password2='';
      }, function(error){
        $scope.error = 'user not registered\n' + error;
      });

    }
    else {
      Users.then(function(response){$scope.newUser.password=''; $scope.newUser.password2='';});
    }
    };
    /** DONE WITH addListing **/

  }
]);
