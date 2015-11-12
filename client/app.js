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
    'App.loadingService',
    'App.alertDirective',
    'App.launch'
  ])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/signin', {
        templateUrl: 'user/signin.html',
        controller: 'authCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/signup', {
        templateUrl: 'user/signup.html',
        controller: 'authCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/profile', {
        templateUrl: 'user/profile.html',
        controller: 'authCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/newsFeed', {
        templateUrl: 'script/module/newsFeed/newsFeed.html',
        controller: 'newsFeedCtrl',
        controllerAs: 'newsFeedCtrl',
        data: {
          authenticate: true
        }
      })
      .when('/charity', {
        templateUrl: 'script/module/charity/charity.html',
        controller: 'charityCtrl',
        controllerAs: 'charityCtrl',
        data: {
          authenticate: true
        }
      })
      .when('/challenge', {
        templateUrl: 'script/module/challenge/challenge.html',
        controller: 'challengeCtrl',
        controllerAs: 'challengeCtrl',
        data: {
          authenticate: true
        }
      })
      .when('/launch', {
        templateUrl: 'script/module/challenge/launch.html',
        controller: 'launchCtrl',
        controllerAs: 'launchCtrl',
        data: {
          authenticate: true
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
