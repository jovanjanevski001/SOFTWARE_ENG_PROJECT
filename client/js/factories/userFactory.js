angular.module('user', []).factory('User', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/user');
    },

	create: function(user) {
	  return $http.post('/api/user', user);
    }

  };

  return methods;
});