angular.module('items', []).factory('Orders', function($http) {
    var methods = {
        getAll: function() {
            return $http.get('/api/orders');
        },

        create: function(item) {
            return $http.post('/api/orders', item);
        },

        delete: function(id) {
            /**TODO
             return result of HTTP delete method
             */
            return $http.delete('/api/orders/'+ id);

        }
    };

    return methods;
});
