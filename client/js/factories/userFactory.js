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
});
