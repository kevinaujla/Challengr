/*

app.js
module dependency injections and route configurations

*/

angular.module('App', [
  'ui.router',
  'ui.bootstrap',
  'ngMessages',
  'ngAnimate',
  'angularMoment',
  'App.auth',
  'App.socket',
  'App.profile',
  'App.personalChallenge',
  'App.newChallenge',
  'App.challengeView',
  'App.challengeDirective',
  'App.challengeService',
  'App.header',
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
  'App.s3Factory',
  'App.customFilter',
])

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

  $urlRouterProvider
    .otherwise('/');

  $stateProvider
    .state('signin', {
      url: '/signin',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/user/auth/signin.html',
          controller: 'authCtrl',
          controllerAs: 'authCtrl',
        },
        'rightPane': { 
          templateUrl: 'partial/signinPane.html', 
        }
      },
      data: {
        authenticate: false
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/user/auth/signup.html',
          controller: 'authCtrl',
          controllerAs: 'authCtrl', 
        },
        'rightPane': { 
          templateUrl: 'partial/signinPane.html', 
        }
      },
      data: {
        authenticate: false
      }
    })
    .state('profile', {
      url: '/profile',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/user/profile/profile.html',
          controller: 'profileCtrl',
          controllerAs: 'profileCtrl',
        },
        'rightPane': { 
          templateUrl: 'script/module/user/profile/billing.html',
          controller: 'profileCtrl',
          controllerAs: 'profileCtrl',
        }
      },
      data: {
        authenticate: true
      }
    })

    .state('newChallenge', {
      url: '/challenge/create/friend',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/challenge/steps/friend.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',

        },
        'rightPane': { 
          templateUrl: 'partial/challengePane.html' 
        }
      },
      data: {
        authenticate: true
      }
    })
    .state('createChallengeDetail', {
      url: '/challenge/create/detail',
      views: {
        'leftPane': { 
          templateUrl: 'partial/friendDetail.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        },
        'rightPane': { 
          templateUrl: 'script/module/challenge/steps/detail.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        }
      },
      data: {
        authenticate: true
      }
    })
    .state('createChallengeCharity', {
      url: '/challenge/create/charity',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/challenge/steps/charity1.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        },
        'rightPane': { 
          templateUrl: 'script/module/challenge/steps/charity2.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        }
      },
      data: {
        authenticate: true
      }
    })
    .state('createChallengePayment', {
      url: '/challenge/create/payment',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/challenge/steps/payment.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        },
        'rightPane': { 
          templateUrl: 'partial/reviewDetail.html',
          controller: 'challengeNewCtrl',
          controllerAs: 'challengeNC',
        }
      },
      data: {
        authenticate: true
      }
    })

    .state('home', {
      url: '/',
      views: {
        'leftPane': { 
          templateUrl: 'script/module/newsfeed/newsfeed.html',
          controller: 'newsfeedCtrl',
          controllerAs: 'newsfeedCtrl',
          data : { 
            showNewsFeed : true 
          }
        }, 
        'rightPane': { 
          templateUrl: 'script/module/user/challenge/challenge-personal.html',
          controller: 'personalChallengeCtrl',
          controllerAs: 'personalChallengeC',
          data : { 
            globalDetailView: true,
            showUserChallenges : false
          }
        }, 
      },
      data: { authenticate: true }
    })

      .state('home.viewChallenge', {
        url: 'challenge/:id',
        views: {
          'challengeDetail': { 
            templateUrl: 'script/module/challenge/challenge-view.html',
            controller: 'challengeViewCtrl',
            controllerAs: 'challengeViewCtrl', 
            data: {
              showUserChallenges : true
            }
          }
        },
        data: { authenticate: true }
      })

      .state('home.viewChallengePersonal', {
        url: 'challenge/detail/:id',
        views: {
          'challengeDetailPersonal': { 
            templateUrl: 'script/module/challenge/challenge-view.html',
            controller: 'challengeViewCtrl',
            controllerAs: 'challengeViewCtrl', 
          }
        },
        data: { authenticate: true }
      })

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
  // only configure socket when the user is already logged in otherwise the needed
  // data to identify him on the server does not exist
  if (authFactory.isAuth()) {
    socket.configureSocket();
  }

  // Initial Value 
  $rootScope.globalLeftDetailView = true;
  $rootScope.globalRightDetailView = true;

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    // Justify Content Center Left Bar
    if (toState.url === '/challenge/create/detail' ||
        toState.url === '/challenge/create/payment' ||
        toState.url === '/profile')
    {
      $rootScope.justifyCenterLeftBar = true;
    } else {
      $rootScope.justifyCenterLeftBar = false;
    }

    // Justify Content Center Right Bar
    if (toState.url === '/challenge/create/payment' ||
        toState.url === '/challenge/:id'){
      $rootScope.justifyCenterRightBar = true;
    } else {
      $rootScope.justifyCenterRightBar = false;
    }

    // Dark Background Left Bar
    if (toState.url === '/challenge/create/detail' ||
        toState.url === '/challenge/create/payment' ||
        toState.url === '/profile')
    {
      $rootScope.darkThemeLeftBar = true;
    } else {
      $rootScope.darkThemeLeftBar = false;
    }

    // Dark Background Right Bar
    if (toState.url === '/' ||
      toState.url === 'challenge/detail/:id')
    {
      $rootScope.darkThemeRightBar = true;
    } else {
      $rootScope.darkThemeRightBar = false;
    }

    // Menu Bar Light and Dark Style
    if (toState.url === '/profile' ||
        toState.url === '/challenge/create/charity' ||
        toState.url === '/challenge/create/detail' ||
        toState.url === '/challenge/create/payment' ||
        toState.url === '/challenge/create/detail/:id') 
    {
      $rootScope.lightStyle = true;
    } else {
      $rootScope.lightStyle = false;
    }

    // Signin and Signup
    if (toState.url === '/signin' || toState.url === '/signup') {
      $rootScope.signupOrLoginPage = true;
    }
    if (toState.url !== '/signup' && toState.url !== '/signin') {
      $rootScope.signupOrLoginPage = false;
    }

    // On Refresh of steps of creating a challenge or being in the detail view of a challenge, go back home
    if (toState.url === '/challenge/create/detail' && fromState.abstract === true || 
        toState.url === '/challenge/create/charity' && fromState.abstract === true || 
        toState.url === '/challenge/create/payment' && fromState.abstract === true || 
        toState.url === 'challenge/:id' && fromState.abstract === true ||
        toState.url === 'challenge/detail/:id' && fromState.abstract === true) 
    {
      $state.go('home');
      event.preventDefault();
    }

    // Right Detail View of Challenge
    if (toState.url === 'challenge/:id'){
      $rootScope.leftDetailViewRoute = true;
    }

    if (toState.data.authenticate && !authFactory.isAuth()) {
      $state.transitionTo('signin');
      event.preventDefault();
    }
  });
});