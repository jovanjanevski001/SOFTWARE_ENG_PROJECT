angular.module('users').controller('UserController', ['$scope', 'Users',
  function($scope, Users) {
    /* Get all the listings, then bind it to the scope */
    User.getAll().then(function(response) {
      $scope.user = response.data;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.addUser = function() {
	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
      //if($scope.newUser.password == $scope.newUser.password2){
	  
	  console.log("ERROR");
	  
      var user = {
        userName: $scope.newUser.userName
        email: $scope.newUser.email,
        //userType: 'customer',
        password: $scope.newUser.password
      };

	  $scope.users.push($scope.newUser);
	  $scope.newUser = {};

      Users.create(user).then(function(response){$scope.newUser.userName =''; $scope.newUser.email=''; $scope.newUser.password=''; $scope.newUser.password2='';}, function(error){
        $scope.error = 'user not registered\n' + error;
      });

    }
    //else {
     // function(response){$scope.newUser.password=''; $scope.newUser.password2='';}
    //}
    };
]);
