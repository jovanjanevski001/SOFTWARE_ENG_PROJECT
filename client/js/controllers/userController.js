angular.module('users').controller('UsersController', ['$scope', '$timeout', '$location', 'Users', 'Auth',
  function($scope, $timeout, $location, Users, Auth) {
    /* Get all the listings, then bind it to the scope */
    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.isLoggedIn=false;
    if(Auth.getInfo().success)
    {$scope.isLoggedIn=true;}
    console.log($scope.isLoggedIn);

    $scope.addUser = function() {
   var check=$scope.newUser.password;
   var check2=$scope.newUser.password2;
   var app={};





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


      Auth.login(loginData).then(function(data){
        if(data.data.success){
          app.loading=false;
          app.successMsg= data.data.message +'...Redirecting';

          $timeout(function(){
            $location.path('/c');
          }, 2000);
        }
      });
    };

    $scope.logout=function(){
      Auth.logout();
      $location.path('/logout');
      $timeout(function(){
        $location.path('/');
      }, 2000);
    };

    $scope.getInfo=function(){
      Auth.getInfo().then(function(data){

        console.log(data);
      });
    };


  }
]);
