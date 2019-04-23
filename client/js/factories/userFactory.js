angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/users');
    },

    create: function(user) {
      return $http.post('/api/users', user);
    },

    delete: function(id) {
      return $http.delete('/api/users/'+id);
    },

    update: function(user, id) {
      return $http.put('/api/users/'+id, user);
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

    authorization.getInfo=function(){
      var token=AuthToken.getToken();
      if(token){
        return $http.post('/api/users/user');
        }
        else{
          return {success:false, message:'user has no token'};
        }
      };
    return authorization;
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
})

.factory('AuthInterception', function(AuthToken){
  var authInterception={};

  authInterception.request=function(config){
    var token = AuthToken.getToken();

    if(token){
      config.headers['x-access-token']=token;
    }
    return config;
  };
  return authInterception;
});
