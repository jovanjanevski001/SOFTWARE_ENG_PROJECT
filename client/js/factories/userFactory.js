angular.module('users', []).factory('Users', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/users');
    },

	create: function(user) {
	  return $http.post('/api/users', user);
    },
	
	delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
		return $http.delete('/api/users/'+ id);

    }

  };

  return methods;
});