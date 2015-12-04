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
      $timeout.cancel(self.getMyChallengeTimer);
      $timeout.cancel(self.getImposedChallangeTimer);
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
          self.getMyChallengeTimer = $timeout(tick, 5000);
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
          self.getImposedChallangeTimer = $timeout(tick, 5000);
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
