/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
  'ui.router',
  'ui.bootstrap',
  'ngResource',
  'ngMessages',
  'App.auth',
  'App.profile',
  'App.charity',
  'App.challenge',
  'App.challengeDirective',
  'App.home',
  'App.authFactory',
  'App.userFactory',
  'App.challengeFactory',
  'App.braintreeFactory',
  'App.radio',
  'App.createChallengeService',
])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider
    .otherwise('/');

  $stateProvider
  // User
    .state('signin', {
      url: '/signin',
      templateUrl: 'script/module/user/auth/signin.html',
      controller: 'authCtrl',
      controllerAs: 'authCtrl',
      data: {
        authenticate: false
      }
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'script/module/user/auth/signup.html',
      controller: 'authCtrl',
      controllerAs: 'authCtrl',
      data: {
        authenticate: false
      }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'script/module/user/profile/profile.html',
      controller: 'profileCtrl',
      controllerAs: 'profileCtrl',
      data: {
        authenticate: true
      }
    })

  // Charities
  .state('charity', {
    url: '/charity',
    templateUrl: 'script/module/charity/charity.html',
    controller: 'charityCtrl',
    controllerAs: 'charityCtrl',
    data: {
      authenticate: true
    }
  })

  // Challenges
  .state('challenges', {
      url: '/challenges',
      templateUrl: 'script/module/challenge/challenges.html',
      controller: 'challengeListCtrl',
      controllerAs: 'challengeLC',
      data: {
        authenticate: true
      }
    })
    .state('newChallenge', {
      url: '/challenge/create',
      templateUrl: 'script/module/challenge/challenge-create.html',
      controller: 'challengeNewCtrl',
      controllerAs: 'challengeNC',
      data: {
        authenticate: true
      }
    })
    .state('viewChallenge', {
      url: '/challenge/:id/read',
      templateUrl: 'script/module/challenge/challenge-read.html',
      controller: 'challengeViewCtrl',
      controllerAs: 'challengeVC',
      data: {
        authenticate: true
      }
    })
    .state('editChallenge', {
      url: '/challenge/:id/edit',
      templateUrl: 'script/module/challenge/challenge-edit.html',
      controller: 'challengeEditCtrl',
      controllerAs: 'challengeEC',
      data: {
        authenticate: true
      }
    })

  // Home Page
  .state('home', {
    url: '/',
    templateUrl: 'script/module/home/home.html',
    controller: 'homeCtrl',
    controllerAs: 'homeCtrl',
    data: {
      authenticate: true
    }
  });

  $httpProvider.interceptors.push(function ($window) {
    return {
      request: function (config) {
        var jwt = $window.localStorage.getItem('com.challengr');
        if (jwt) {
          config.headers['x-access-token'] = jwt;
        }
        config.headers['Allow-Control-Allow-Origin'] = '*';
        return config;
      }
    };
  })
}])

.run(function ($rootScope, $state, authFactory, $window) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.data.authenticate && !authFactory.isAuth()) {
      console.log('not authenticated, redirecting to signin');
      $state.go('signin');
      event.preventDefault();
    }
  });
});
