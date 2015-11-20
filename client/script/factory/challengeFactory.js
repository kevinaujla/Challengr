/*

challengeFactory.js
handles http request for challenges

*/

angular.module('App.challengeFactory', [] )

.factory('challengeFactory', ['$resource', '$http', function($resource, $http) {

  // $resource returns an object with get(), query(), save(), remove(), delete()
  // return $resource('/api/challenge/:id', {id : '@_id'}, 
  //   { update : 
  //     { method : 'PUT' } 
  //   });
  
  var createChallenge = function(challenge){
    return $http({
      method : 'POST',
      url : '/api/challenge',
      data : challenge
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var readAllChallenge = function(){
    return $http({
      method : 'GET',
      url : '/api/challenge'
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var updateChallenge = function(challenge){
    return $http({
      method : 'PUT',
      url : '/api/challenge',
      data : challenge
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var readAllChallengeForUser = function(){
    return $http({
      method : 'GET',
      url : '/api/challenge/user'
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    createChallenge : createChallenge,
    readAllChallenge : readAllChallenge,
    updateChallenge : updateChallenge,
    readAllChallengeForUser : readAllChallengeForUser,
  };

}]);