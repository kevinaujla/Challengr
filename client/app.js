/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
  'ngRoute',
  'App.newsFeed'
  ]).
config(['$routeProvider', function($routeProvider) {
 $routeProvider
  .when('/newsFeed', {
    templateUrl: 'newsFeed/newsFeed.html',
    controller: 'newsFeedCtrl'
  })
  .otherwise({redirectTo: '/home'});
}]);
