/*

challengeDirective.js


*/

angular.module('App.challengeDirective', [])

.directive('challenge', function(){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challenge/challengeDirective.html',
    scope : { 
      user : '=',
      challenge : '='
    },
    link : function(scope, element, attrs){
      element.bind('click', function(){
        console.log('active challenge...');
        console.log('user : ', scope.user);
        console.log('user : ', scope.challenge);
      });
    }
  };

})

.directive('completed', function(){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challenge/challengeCDirective.html',
    scope : { 

    },
    link : function($scope, element, attrs){
      element.bind('click', function(){
        console.log('completed challenge...');
      });
    }
  };

})

.directive('incomplete', function(){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challenge/challengeICDirective.html',
    scope : { 

    },
    link : function($scope, element, attrs){
      element.bind('click', function(){
        console.log('incomplete challenge...');
      });
    }
  };

})


