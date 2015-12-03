/*

challenges.js
Challenges in newsfeed view

*/

angular.module('App.challengeView', [])

.controller('challengeViewCtrl', ['challengeFactory', '$stateParams', 'challengeService', function (challengeFactory, $stateParams, challengeService) {

  var self = this;

  self.challenge = null;

  // Read the challenge id from the service object to retreive the correct challenge by it's ID
  self.readChallenge = function () {
    angular.forEach(challengeService.challenges, function (challenge) {
      if (challenge.id == $stateParams.id) {
        self.challenge = challenge;
      }
    });
  };

  self.increaseLike = function () {
    // create object to update
    var updateObj = {
      id: self.challenge.id,
      likes: ++self.challenge.likes
    };
    // call factory function to update challenge values
    challengeFactory.updateChallenge(updateObj)
      .then(function () {
        console.log('succesfully increased like...');
      })
      .catch(function (err) {
        console.log('error increasing like : ', err);
      });
  };

}]);
