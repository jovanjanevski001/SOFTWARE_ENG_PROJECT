angular.module('items', []).factory('Items', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('/api/items');
    },

	create: function(item) {
	  return $http.post('/api/items', item);
    },

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
		return $http.delete('/api/items/'+ id);

  },
    createOrder: function(order){
      return $http.post('/api/orders/'+order);
    }
  };

  return methods;
});
