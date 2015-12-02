/*

challengeFactory.js
handles http request for challenges

*/

angular.module('App.challengeFactory', [])

.factory('challengeFactory', ['$resource', '$http', function ($resource, $http) {

  var createChallenge = function (challenge) {
    return $http({
        method: 'POST',
        url: '/api/challenge',
        data: challenge
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var readAllChallenge = function () {
    return $http({
        method: 'GET',
        url: '/api/challenge'
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var updateChallenge = function (challenge) {
    return $http({
        method: 'PUT',
        url: '/api/challenge',
        data: challenge
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var readMyChallenges = function () {
    return $http({
        method: 'GET',
        url: '/api/challenge/my'
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var readImposedChallenges = function () {
    return $http({
        method: 'GET',
        url: '/api/challenge/imposed'
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var readChallengeByID = function (id) {
    return $http({
        method: 'GET',
        url: '/api/challenge/id',
        params: {
          id: id
        },
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  return {
    createChallenge: createChallenge,
    readAllChallenge: readAllChallenge,
    updateChallenge: updateChallenge,
    readMyChallenges: readMyChallenges,
    readImposedChallenges: readImposedChallenges,
    readChallengeByID: readChallengeByID,
  };

}]);
