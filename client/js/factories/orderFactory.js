angular.module('orders', []).factory('Orders', function($http) {
    var methods = {
        getAll: function() {
            return $http.get('/api/orders');
        },

        create: function(order) {
            return $http.post('/api/orders', order);
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
