/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
  'ngRoute',
  'App.newsFeed',
  'App.charity'
  ])
.config(['$routeProvider', function($routeProvider) {
 $routeProvider
  .when('/newsFeed', {
    templateUrl: 'newsFeed/newsFeed.html',
    controller: 'newsFeedCtrl'
  })
   .when('/charity', {
    templateUrl: 'charity/charity.html',
    controller: 'charityCtrl'
  })
  .otherwise({redirectTo: '/home'});
}]);
