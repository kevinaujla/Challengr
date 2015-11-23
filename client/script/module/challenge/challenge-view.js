/*

challenges.js
CRUD for challenges

*/

angular.module('App.challengeView', [])

.controller('challengeViewCtrl', ['challengeFactory', '$stateParams', 'challengeService', function(challengeFactory, $stateParams, challengeService) {

  var self = this;

  self.challenge = {};

  self.readChallenge = function(){

    angular.forEach(challengeService.challenges, function(challenge){
      console.log('going through challenge : ', challenge);
      console.log('challenge id : ', challenge.id, ' stateparams id : ', $stateParams.id);
      if (challenge.id == $stateParams.id) {
        self.challenge = challenge;
        console.log('FOUND CHALLENGE : ', self.challenge);
      }
    });

  };

}]);