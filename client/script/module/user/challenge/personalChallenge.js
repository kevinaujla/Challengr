/*

personalChallenge.js


*/

angular.module('App.personalChallenge', [])

.controller('personalChallengeCtrl', ['challengeFactory', 'userFactory', '$scope', '$state', function (challengeFactory, userFactory, $scope, $state) {

  var self = this;

  self.myChallenges = [];
  self.imposedChallenges = [];

  self.showDetail = function (challenge, event) {
    if (event.toElement.classList[0] !== "noViewChange") {
      $state.go('viewChallenge', {
        id: challenge.id
      });
    }
  };

  self.readMyChallenges = function () {
    challengeFactory.readMyChallenges()
      .then(function (myChallenges) {
        self.myChallenges = myChallenges;
        // go through each challenge and retrieve image belonging to challenger
        angular.forEach(myChallenges, function (challenge) {
          userFactory.getUserByID(challenge.ChallengedId)
            .then(function (image) {
              // add the image to the challenge
              challenge.challengerImg = image;
            })
            .catch(function (err) {
              console.log('error getting image : ', err);
            });
        });

      })
      .catch(function (err) {
        console.log('error getting myChallenges for current user');
      });

  };

  self.readImposedChallenges = function () {
    challengeFactory.readImposedChallenges()
      .then(function (imposedChallenges) {
        self.imposedChallenges = imposedChallenges;
        // go through each challenge and retrieve image belonging to challenges 
        angular.forEach(imposedChallenges, function (challenge) {
          userFactory.getUserByID(challenge.ChallengedId)
            .then(function (image) {
              // add image to the challenge
              challenge.challengerImg = image;
            })
            .catch(function (err) {
              console.log('error getting image for personalChallenge view: ', err);
            });
        });
      })
      .catch(function (err) {
        console.log('error getting imposedChallenges for current user');
      });
  };

  self.increaseLike = function (challenge) {
    // create object to update
    var updateObj = {
      id: challenge.id,
      likes: ++challenge.likes
    };
    // call factory function to update challenge values
    challengeFactory.updateChallenge(updateObj)
      .catch(function (err) {
        console.log('error increasing like : ', err);
      });
  };

}]);
