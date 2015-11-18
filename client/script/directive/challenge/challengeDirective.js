/*

challengeDirective.js


*/

angular.module('App.challengeDirective', [])

.directive('challenge', ['$moment', 'challengeFactory', function(challengeFactory, $moment){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challenge/challengeDirective.html',
    scope : { 
      challengeid : '=',
      charityamount : '=',
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
  
      // element.bind('click', function(){
      //   console.log('scope : ', scope.issueddate);
      //   console.log('attrs : ', attrs.expiresdate);  
      //   console.log('element : ', element);
      // });

      scope.increaseLike = function(){
        // console log
        console.log('increase like...');
        // create object to update
        var updateObj = {
          id : scope.challengeid,
          likes : ++scope.likes,
          completed : scope.completed,
          notCompleted : scope.notcompleted,
        }
        console.log('obj : ', updateObj);
        // call factory function to update challenge values
        challengeFactory.updateChallenge(updateObj)
          .then(function(data){
            console.log('succesfully increased like...');
          })
          .catch(function(err){
            console.log('error increasing like : ', err);
          });
      };

    }
  };

}])

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


