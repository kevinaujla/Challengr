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

.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider
    .otherwise({
      redirectTo: '/'
    });

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
    });

  }]);

/*

alertDirective.js
Show different types of alerts to user

*/

angular.module('App.alertDirective', [])

.directive('alert', function(){

  return {
    restrict : 'E',
    // templateUrl: './alertDirective.html',
    require : '^ngModel',
    scope : { 
      alertMsg : '=',
      alertMessage: '@'
    },
    template : '<div class="alert alert-success fade in" ng><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Success!</strong> Your message has been sent {{alertMsg}} successfully.</div>',
    link : function($scope, element, attrs){
      element.bind('click', function(){
        console.log('CLICKED ME....');
        console.log('$scope : ', $scope);
        console.log('element : ', element);
        console.log('attrs : ', attrs);
        console.log('from me : ', attrs.alertMessage);
        console.log('from me : ', alertMsg);

      });
    }
  };

});



/*

alertServices.js
file to share alert services between controllers

*/

angular.module('App.alertService', [])

.factory('success', function(message) {
  // Console Log
  console.log('success alert : ', message);
})

.factory('failure', function(message) {
  // Console Log
  console.log('failure alert : ', message);
});

/*

loadingServices.js
file to share loading alert services between controllers

*/

angular.module('App.loadingService', [])

.factory('start', function() {
  // Console Log
  console.log('start spinner');
})

.factory('stop', function() {
  // Console Log
  console.log('stop spinner');
});

/*

challenge.js
sets up challenge controller

*/

angular.module('App.challenge', [])

.controller('challengeCtrl', [function() {

}]);
/*

charity.js
sets up charity controller

*/

angular.module('App.charity', [])

.controller('charityCtrl', [function() {

}]);
/*

launch.js
sets up launch controller

*/

angular.module('App.launch', [])

.controller('launchCtrl', [function () {

}]);

/*

newsFeed.js
sets up newsFeed controller

*/

angular.module('App.newsFeed', [])

.controller('newsFeedCtrl', [function() {

}]);
/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl', [function() {

  var self = this;

}]);
/*

auth.js
sets up authorization controller

*/

angular.module('App.profile', [])

.controller('profileCtrl', [function() {

}]);