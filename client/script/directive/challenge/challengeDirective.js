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
      completeddate : '=',
      expiresdate : '=',
      issueddate : '=',
      completed : '=',
      notcompleted : '=',
      type : '=',
    },
    link : function(scope, element, attrs){
      // Need to fire an event when the issueDate moment difference passes the expiresdate
      // event should change the state of the challenge to become incomplete
      element.bind('click', function(){
        console.log('scope : ', scope.issueddate);
        console.log('attrs : ', attrs.expiresdate);  
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


