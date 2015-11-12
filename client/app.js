/*

app.js
module dependency injections and route configurations

*/


angular.module('App', [
  'ngRoute',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
