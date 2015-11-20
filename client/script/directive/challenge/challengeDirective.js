/*

challengeDirective.js


*/

angular.module('App.challengeDirective', [])

.directive('challenge', ['challengeFactory', function(challengeFactory){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challenge/challengeDirective.html',
    scope : { 
      challengeid : '=',
      challengechallenged : '=',
      challengechallenger : '=',
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
      
      scope.increaseLike = function(){
        // console log
        console.log('increase like...');
        // create object to update
        var updateObj = {
          id : scope.challengeid,
          likes : ++scope.likes,
          completed : scope.completed,
          notCompleted : scope.notcompleted,
        };
        console.log('obj : ', updateObj);
        // call factory function to update challenge values
        challengeFactory.updateChallenge(updateObj)
          .then(function(){
            console.log('succesfully increased like...');
          })
          .catch(function(err){
            console.log('error increasing like : ', err);
          });
      };

    }
  };

}])

.directive('incomplete', ['challengeFactory', function(challengeFactory){

  return {
    restrict : 'E',
    templateUrl: 'script/directive/challenge/challengeICDirective.html',
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

      scope.increaseLike = function(){
        // console log
        console.log('increase like...');
        // create object to update
        var updateObj = {
          id : scope.challengeid,
          likes : ++scope.likes,
          completed : scope.completed,
          notCompleted : scope.notcompleted,
        };
        console.log('obj : ', updateObj);
        // call factory function to update challenge values
        challengeFactory.updateChallenge(updateObj)
          .then(function(){
            console.log('succesfully increased like...');
          })
          .catch(function(err){
            console.log('error increasing like : ', err);
          });
      };
    }
  };

}]);


