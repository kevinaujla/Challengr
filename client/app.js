/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
    'ngRoute',
    'App.auth',
    'App.profile',
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
        templateUrl: 'script/module/user/auth/signin.html',
        controller: 'authCtrl',
        controllerAs: 'authCtrl',
        data: {
          authenticate: false
        }
      })
      .when('/signup', {
        templateUrl: 'script/module/user/auth/signup.html',
        controller: 'authCtrl',
        controllerAs: 'authCtrl',
        data: {
          authenticate: false
        }
      })
      .when('/profile', {
        templateUrl: 'script/module/user/auth/profile.html',
        controller: 'profileCtrl',
        controllerAs: 'profileCtrl',
        data: {
          authenticate: true
        }
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
