/*

personalChallenge.js


*/

angular.module('App.personalChallenge', [])

.controller('personalChallengeCtrl', ['challengeFactory', 'userFactory', '$scope', '$state', '$timeout', function (challengeFactory, userFactory, $scope, $state, $timeout) {

  var self = this;

  self.myChallenges = [];
  self.imposedChallenges = [];
  self.getMyChallengeTimer;
  self.getImposedChallangeTimer;

  $scope.$on('$destroy',
    function (event) {
      $timeout.cancel(getMyChallengeTimer);
      $timeout.cancel(getImposedChallangeTimer);
    });

  self.showDetail = function (challenge, event) {
    if (event.toElement.classList[0] !== 'noViewChange') {
      $state.go('viewChallenge', {
        id: challenge.id
      });
    }
  };

  self.readMyChallenges = function () {
    (function tick() {
      challengeFactory.readMyChallenges()
        .then(function (myChallenges) {
          self.myChallenges = myChallenges;
          // go through each challenge and retrieve image belonging to challenger
          angular.forEach(myChallenges, function (challenge) {
            userFactory.getUserByID(challenge.ChallengerId)
              .then(function (challenger) {
                challenge.challengerImg = challenger.photoURL;
              })
              .catch(function (err) {
                console.log('error getting image : ', err);
              });
          });
          self.getMyChallengeTimer = $timeout(tick, 20000);
        })
        .catch(function (err) {
          console.log('error getting myChallenges for current user');
        });
    })();
  };

  self.readImposedChallenges = function () {
    (function tick() {
      challengeFactory.readImposedChallenges()
        .then(function (imposedChallenges) {
          self.imposedChallenges = imposedChallenges;
          // go through each challenge and retrieve image belonging to challenges 
          angular.forEach(imposedChallenges, function (challenge) {
            userFactory.getUserByID(challenge.ChallengedId)
              .then(function (challenged) {
                challenge.challengerImg = challenged.photoURL;
              })
              .catch(function (err) {
                console.log('error getting image for personalChallenge view: ', err);
              });
          });
          self.getImposedChallangeTimer = $timeout(tick, 20000);
        })
        .catch(function (err) {
          console.log('error getting imposedChallenges for current user');
        });
    })();
  };

  self.increaseLike = function (challenge) {
    var updateObj = {
      id: challenge.id,
      likes: ++challenge.likes
    };
    challengeFactory.updateChallenge(updateObj)
      .catch(function (err) {
        console.log('error increasing like : ', err);
      });
  };

}]);
