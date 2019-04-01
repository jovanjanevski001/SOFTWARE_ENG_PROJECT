angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/users');
    },

	create: function(user) {
	  return $http.post('/api/users', user);
    }

  };

  return methods;
})


.factory('Auth', function($http, AuthToken){


    var authorization={};

    authorization.login = function(loginData){
      return $http.post('/api/users/login', loginData).then(function(data) {
        AuthToken.setToken(data.data.token);
        return data;
      });
    };

    authorization.logout=function(){
      AuthToken.setToken();
    };

    authorization.isLoggedIn=function(){
      if(AuthToken.getToken())
        {return true;}
      else {
        {return false;}
      }
    };

    return authorization
})

.factory('AuthToken', function($window) {
  var authToken={};

  authToken.setToken=function(token) {
    if(token){
      $window.localStorage.setItem('token', token);
    }
    else {
      $window.localStorage.removeItem('token');
    }
  };

  authToken.getToken=function(){
    return $window.localStorage.getItem('token');
  };
  return authToken;
});
