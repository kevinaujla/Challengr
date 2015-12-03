/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
  'ui.router',
  'ui.bootstrap',
  'ngMessages',
  'angularMoment',
  'App.auth',
  'App.socket',
  'App.profile',
  'App.personalChallenge',
  'App.newChallenge',
  'App.challengeView',
  'App.challengeDirective',
  'App.challengeService',
  'App.newsfeed',
  'App.authFactory',
  'App.userFactory',
  'App.challengeFactory',
  'App.braintreeFactory',
  'App.charityFactory',
  'App.alertService',
  'App.alertController',
  'angularSpinner',
  'App.loadingService',
  'App.loadingController',
  'App.s3Factory'
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
      url: '/challenge/:id',
      templateUrl: 'script/module/challenge/challenge-view.html',
      controller: 'challengeViewCtrl',
      controllerAs: 'challengeViewCtrl',
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
    templateUrl: 'script/module/newsfeed/newsfeed.html',
    controller: 'newsfeedCtrl',
    controllerAs: 'newsfeedCtrl',
    data: {
      authenticate: true
    }
  });

  $httpProvider.interceptors.push(function ($window) {
    return {
      request: function (config) {
        var jwt = $window.localStorage.getItem('com.challengr');
        var braintree = $window.localStorage.getItem('com.braintree');
        if (jwt) {
          config.headers['x-access-token'] = jwt;
        }
        if (braintree) {
          config.headers['x-braintree-token'] = braintree;
        }
        config.headers['Allow-Control-Allow-Origin'] = '*';
        return config;
      }
    };
  });
}])

.run(function ($rootScope, $state, authFactory, $window, socket) {
  socket.configureSocket();
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    if (toState.url === '/signin' || toState.url === '/signup') {
      $rootScope.signupOrLoginPage = true;
    }
    if (toState.url !== '/signup' && toState.url !== '/signin') {
      $rootScope.signupOrLoginPage = false;
    }

    if (toState.data.authenticate && !authFactory.isAuth()) {
      $state.go('signin');
      event.preventDefault();
    }
  });
});
