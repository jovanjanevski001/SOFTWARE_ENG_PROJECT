angular.module('items', []).factory('Items', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/items');
    },
	
	create: function(item) {
	  return $http.post('http://localhost:8080/api/items', item);
    }, 

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
		return $http.delete('http://localhost:8080/api/items/'+ id);

    }
  };

  return methods;
});
