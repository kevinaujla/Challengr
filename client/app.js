/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
    'ngRoute',
    'App.newsFeed',
    'App.charity',
    'App.challenge',
    'App.alertService',
    'App.loadingService'
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
      .when('/challenge', {
        templateUrl: 'challenge/challenge.html',
        controller: 'challengeCtrl'
      })
      .otherwise({
        redirectTo: '/home'
      });
  }]);
