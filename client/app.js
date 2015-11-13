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
  'App.launch'
  ])

.config(['$stateProvider', function ($stateProvider) {

  $stateProvider
    .state('/signin', {
      templateUrl: 'script/module/user/auth/signin.html',
      controller: 'authCtrl',
      controllerAs: 'authCtrl',
      data: {
        authenticate: false
      }
    })
    .state('/signup', {
      templateUrl: 'script/module/user/auth/signup.html',
      controller: 'authCtrl',
      controllerAs: 'authCtrl',
      data: {
        authenticate: false
      }
    })
    .state('/profile', {
      templateUrl: 'script/module/user/auth/profile.html',
      controller: 'profileCtrl',
      controllerAs: 'profileCtrl',
      data: {
        authenticate: true
      }
    }) 
    .state('/newsFeed', {
      templateUrl: 'script/module/newsFeed/newsFeed.html',
      controller: 'newsFeedCtrl',
      controllerAs: 'newsFeedCtrl',
      data: {
        authenticate: true
      }
    })
    .state('/charity', {
      templateUrl: 'script/module/charity/charity.html',
      controller: 'charityCtrl',
      controllerAs: 'charityCtrl',
      data: {
        authenticate: true
      }
    })
    .state('/challenge', {
      templateUrl: 'script/module/challenge/challenge.html',
      controller: 'challengeCtrl',
      controllerAs: 'challengeCtrl',
      data: {
        authenticate: true
      }
    })
    .state('/launch', {
      templateUrl: 'script/module/challenge/launch.html',
      controller: 'launchCtrl',
      controllerAs: 'launchCtrl',
      data: {
        authenticate: true
      }
    })
    .state('otherwise', {
      url : '/'
    });

}]);