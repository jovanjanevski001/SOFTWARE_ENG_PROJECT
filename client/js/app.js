/* register the modules the application depends upon here*/
angular.module('items', []);
angular.module('users', []);
angular.module('orders', []);

var app = angular.module('directoryApp', ['items', 'users', 'orders'])
.config(function($httpProvider){
  $httpProvider.interceptors.push('AuthInterception');
});
/* register the application and inject all the necessary dependencies */
