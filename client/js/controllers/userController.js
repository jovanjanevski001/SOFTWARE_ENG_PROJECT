angular.module('users').controller('UsersController', ['$scope', 'Users', 'Auth',
  function($scope, Users, Auth) {
    /* Get all the listings, then bind it to the scope */
    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.addUser = function() {
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


//quick check to see if they're logged in.
    if(Auth.isLoggedIn())
    {
      console.log('Success: user is logged in.');
    }
    else{
      console.log('Failure: user not logged in.');
    }

    $scope.customerLogin=function(){
      var loginData={
        username:$scope.login.username,
        pw:$scope.login.password
      };


      Auth.login(loginData);
    };

    $scope.logout=function(){
      Auth.logout();
    };


  }
]);
