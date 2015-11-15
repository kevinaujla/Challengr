/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
  'ui.router',
  'ngResource',
  'ui.bootstrap',
  'App.auth',
  'App.profile',
  'App.charity',
  'App.challenge',
  'App.alertService',
  'App.loadingService',
  'App.alertDirective',
  'App.launch',
  'App.authFactory',
  'App.challengeFactory',
  ])

.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider
    .otherwise('/'); 

  $stateProvider
    // User
    .state('signin', {
      url : '/signin',
      templateUrl: 'script/module/user/auth/signin.html',
      controller: 'authCtrl',
      controllerAs: 'authCtrl',
      data: { authenticate: false }
    })
    .state('signup', {
      url : '/signup',
      templateUrl: 'script/module/user/auth/signup.html',
      controller: 'authCtrl',
      controllerAs: 'authCtrl',
      data: { authenticate: false }
    })
    .state('profile', {
      url : '/profile',
      templateUrl: 'script/module/user/auth/profile.html',
      controller: 'profileCtrl',
      controllerAs: 'profileCtrl',
      data: { authenticate: true }
    }) 

    // Charities
    .state('charity', {
      url : '/charity',
      templateUrl: 'script/module/charity/charity.html',
      controller: 'charityCtrl',
      controllerAs: 'charityCtrl',
      data: { authenticate: true }
    })

    // Challenges
    .state('challenges', {
      url : '/challenges',
      templateUrl: 'script/module/challenge/challenges.html',
      controller: 'challengeListCtrl',
      controllerAs: 'challengeLC',
      data: { authenticate: true }
    })
    .state('newChallenge', {
      url : '/challenge/create',
      templateUrl: 'script/module/challenge/challenge-create.html',
      controller: 'challengeNewCtrl',
      controllerAs: 'challengeNC',
      data: { authenticate: true }
    })
    .state('viewChallenge', {
      url : '/challenge/:id/read',
      templateUrl: 'script/module/challenge/challenge-read.html',
      controller: 'challengeViewCtrl',
      controllerAs: 'challengeVC',
      data: { authenticate: true }
    })
    .state('editChallenge', {
      url : '/challenge/:id/edit',
      templateUrl: 'script/module/challenge/challenge-edit.html',
      controller: 'challengeEditCtrl',
      controllerAs: 'challengeEC',
      data: { authenticate: true }
    })

    // Home Page
    .state('launch', {
      url : '/',
      templateUrl: 'script/module/launch/launch.html',
      controller: 'launchCtrl',
      controllerAs: 'launchCtrl',
      data: { authenticate: true }
    });

}]);