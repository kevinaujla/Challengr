/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
  'ui.router',
  'App.auth',
  'App.profile',
  'App.newsFeed',
  'App.charity',
  'App.challenge',
  'App.alertService',
  'App.loadingService',
  'App.alertDirective',
  'App.launch',
  'App.authFactory'
  ])

.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider
    .otherwise('/'); 

  $stateProvider
    .state('signin', {
      url : '/signin',
      templateUrl: 'script/module/user/auth/signin.html',
      controller: 'authCtrl',
      controllerAs: 'authCtrl',
      data: {
        authenticate: false
      }
    })
    .state('signup', {
      url : '/signup',
      templateUrl: 'script/module/user/auth/signup.html',
      controller: 'authCtrl',
      controllerAs: 'authCtrl',
      data: {
        authenticate: false
      }
    })
    .state('profile', {
      url : '/profile',
      templateUrl: 'script/module/user/auth/profile.html',
      controller: 'profileCtrl',
      controllerAs: 'profileCtrl',
      data: {
        authenticate: true
      }
    }) 
    .state('newsFeed', {
      url : '/newsFeed',
      templateUrl: 'script/module/newsFeed/newsFeed.html',
      controller: 'newsFeedCtrl',
      controllerAs: 'newsFeedCtrl',
      data: {
        authenticate: true
      }
    })
    .state('charity', {
      url : '/charity',
      templateUrl: 'script/module/charity/charity.html',
      controller: 'charityCtrl',
      controllerAs: 'charityCtrl',
      data: {
        authenticate: true
      }
    })
    .state('challenge', {
      url : '/challenge',
      templateUrl: 'script/module/challenge/challenge.html',
      controller: 'challengeCtrl',
      controllerAs: 'challengeCtrl',
      data: {
        authenticate: true
      }
    })
    .state('launch', {
      url : '/',
      templateUrl: 'script/module/launch/launch.html',
      controller: 'launchCtrl',
      controllerAs: 'launchCtrl',
      data: {
        authenticate: true
      }
    });

}]);