angular.module('users').controller('UsersController', ['$scope', '$timeout', '$window', 'Users', 'Auth',
  function($scope, $timeout, $window, Users, Auth) {
    /* Get all the listings, then bind it to the scope */
    Users.getAll().then(function(response) {
      $scope.users = response.data;
    }, function(error) {
      console.log('Unable to retrieve users:', error);
    });

    $scope.isLoggedIn=Auth.isLoggedIn();

    if(Auth.isLoggedIn()){
      Auth.getInfo().then(function(data){
        $scope.isLoggedIn=!data.data.failure;
        $scope.username=data.data.username;
	$scope.email=data.data.email;
	$scope.pw=data.data.password;
      });
    }
    //$scope.username='andrew'



  $scope.addCustomer = function() {
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
        $window.location.href='/cl';
    }
    else {
      Users.then(function(response){$scope.newUser.password=''; $scope.newUser.password2='';});
    }
    };

    $scope.addVendor = function() {
      var check=$scope.newUser.password;
      var check2=$scope.newUser.password2;

     if(check===check2){

        var user = {
          username: $scope.newUser.username,
          email: $scope.newUser.email,
          userType: 'vendor',
          pw: $scope.newUser.password
        };
        $scope.users.push($scope.user);
        $scope.newUser = {};

        Users.create(user).then(function(response){$scope.newUser.username =''; $scope.newUser.email=''; $scope.newUser.password=''; $scope.newUser.password2='';
        }, function(error){
          $scope.error = 'user not registered\n' + error;
        });

        $window.location.href='/vl';

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
        userType:'customer',
        pw:$scope.login.password
      };


      Auth.login(loginData).then(function(data){
        if(data.data.success){
          app.loading=false;
          app.successMsg= data.data.message +'...Redirecting';


          $timeout(function(){
            $window.location.href='/c';
          }, 2000);
        }
      });
    };

    $scope.vendorLogin=function(){
      var loginData={
        username:$scope.login.username,
        userType:'vendor',
        pw:$scope.login.password
      };


      Auth.login(loginData).then(function(data){
        if(data.data.success){
          app.loading=false;
          app.successMsg= data.data.message +'...Redirecting';


          $timeout(function(){
            $window.location.href='/v';
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
      if(Auth.isLoggedIn()){
      Auth.getInfo().then(function(data){
        console.log(data);
      });
    }
    };


  }
]);
