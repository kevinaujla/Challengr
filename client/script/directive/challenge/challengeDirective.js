/*

challengeDirective.js


*/

angular.module('App.challengeDirective', [])

.directive('challenge', function(){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challenge/challengeDirective.html',
    scope : { 
      title : '=',
      description : '=',
      challenged : '=',
      likes : '=',
      expiresDate : '=',
      type : '=',
    },
    link : function(scope, element, attrs){
      element.bind('click', function(){
        console.log('title : ', scope.title);
        console.log('description : ', scope.description);
        console.log('challenged : ', scope.challenged);
        console.log('likes : ', scope.likes);
        console.log('expiresDate : ', scope.expiresDate);
        console.log('type : ', scope.type);
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


