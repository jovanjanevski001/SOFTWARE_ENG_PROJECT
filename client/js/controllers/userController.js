angular.module('users').controller('UsersController', ['$scope', '$timeout', '$window', 'Users', 'Auth', 'Items',
    function($scope, $timeout, $window, Users, Auth, Items) {
        /* Get all the listings, then bind it to the scope */
        Users.getAll().then(function(response) {
            $scope.users = response.data;
        }, function(error) {
            console.log('Unable to retrieve users:', error);
        });

        $scope.adminItems =[];
        $scope.loginFailed = true;

        Items.getAll().then(function(response){
            $scope.adminItems = response.data;
        }, function(error) {
            console.log('Unable to retrieve users:', error);
        });


        $scope.isLoggedIn=Auth.isLoggedIn();

        if(Auth.isLoggedIn()){
            Auth.getInfo().then(function(data){
                $scope.isLoggedIn=!data.data.failure;
                $scope.username=data.data.username;
                $scope.email=data.data.email;
			    $scope.userType=data.data.userType;
				$scope._id=data.data._id;
            });
        }


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

	$scope.updateUser = function(id) {
		console.log(id);
	    var check=$scope.pw;
        var check2=$scope.pw2;
	    if(check===check2){
		var user = {
            username: $scope.change.username,
            email: $scope.change.email,
            pw: $scope.change.pw,
			//pw2: $scope.pw2,
			userType: $scope.userType,
		//if (userType == 'customer') {
		    /*creditCardName: $scope.creditCardName,
  		    creditCardNumber: $scope.creditCardNumber,
  		    creditCardExpYear: '2020',
  	        creditCardExpMonth: $scope.creditCardExpMonth,
  	        creditCardSecurityNum: $scope.creditCardSecurityNum,
  		    creditCardType: $scope.creditCardType*/
		//}
                };
				console.log(user);
				$scope.user = {};
		Users.update(user, id).then(function(response){$scope.username =user.username; $scope.email=user.email; $scope.pw=''; $scope.pw2='';
                }, function(error){
                    $scope.error = 'user not updated\n' + error;
                });
		console.log(user);

	    }
	    
	};

        $scope.addVendor = function() {
            var check=$scope.newUser.password;
            var check2=$scope.newUser.password2;

            if(check === check2){

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

                $window.location.href='/a';

            }
            else {
                Users.then(function(response){$scope.newUser.password=''; $scope.newUser.password2='';});
            }
        };

        $scope.addAdmin = function() {
            var check=$scope.newUser.password;
            var check2=$scope.newUser.password2;

            if(check===check2){
                var user = {
                    username: $scope.newUser.username,
                    email: $scope.newUser.email,
                    userType: 'admin',
                    pw: $scope.newUser.password
                };
                $scope.users.push($scope.user);
                $scope.newUser = {};

                Users.create(user).then(function(response){$scope.newUser.username =''; $scope.newUser.email=''; $scope.newUser.password=''; $scope.newUser.password2='';
                }, function(error){
                    $scope.error = 'user not registered\n' + error;
                });

                $window.location.href='/a';

            }
            else {
                Users.then(function(response){$scope.newUser.password=''; $scope.newUser.password2='';});
            }
        };

        $scope.deleteVendor = function(index, id, vendor){
            Users.delete(id);
            $scope.users.splice(index,1);

            $scope.adminItems.forEach(function(value, i){
                if(value.vendor === vendor){
                    Items.delete(value._id);
                }
            });

            location.reload();
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
                else
                {
                    $scope.loginFailed = false;
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
                else {
                    $scope.loginFailed = false;
                }
            });
        };

        $scope.adminLogin=function(){
            var loginData={
                username:$scope.login.username,
                userType:'admin',
                pw:$scope.login.password
            };


            Auth.login(loginData).then(function(data){
                if(data.data.success){
                    app.loading=false;
                    app.successMsg= data.data.message +'...Redirecting';


                    $timeout(function(){
                        $window.location.href='/a';
                    }, 2000);
                }
                else {
                    $scope.loginFailed = false;
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
