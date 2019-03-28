angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/users');
    },

	create: function(user) {
	  return $http.post('/users', user);
    }

  };

  return methods;
});