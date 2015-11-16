/*

challengeDirective.js


*/

angular.module('App.challengeDirective', [])

.directive('challenge', function(){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challengeDirective.html',
    scope : { 

    },
    link : function($scope, element, attrs){
      element.bind('click', function(){
        console.log('CLICKED ME....');
      });
    }
  };

})

.directive('completed', function(){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challengeCDirective.html',
    scope : { 

    },
    link : function($scope, element, attrs){
      element.bind('click', function(){
        console.log('CLICKED ME....');
      });
    }
  };

})

.directive('incomplete', function(){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challengeICDirective.html',
    scope : { 

    },
    link : function($scope, element, attrs){
      element.bind('click', function(){
        console.log('CLICKED ME....');
      });
    }
  };

})


