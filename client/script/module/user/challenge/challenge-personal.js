/*

personalChallenge.js


*/

angular.module('App.personalChallenge', [])

.controller('personalChallengeCtrl', ['challengeFactory', 'userFactory', '$scope', '$state', '$rootScope', '$timeout', 'authFactory', '$anchorScroll', '$location', function (challengeFactory, userFactory, $scope, $state, $rootScope, $timeout, authFactory, $anchorScroll, $location) {

  var self = this;

  self.myChallenges = [];
  self.imposedChallenges = [];
  self.getMyChallengeTimer;
  self.getImposedChallangeTimer;
  self.remaining;
  var countdownTimeout;

  $scope.$on('$destroy', function (event) {
    $timeout.cancel(countdownTimeout);
  });

  $scope.$on('$destroy',
    function (event) {
      $timeout.cancel(self.getMyChallengeTimer);
      $timeout.cancel(self.getImposedChallangeTimer);
    });

  self.showDetail = function (challenge, event) {
    if (event.toElement.classList[0] !== 'noViewChange') {

      // scroll to top
      $location.hash('seg');
      $anchorScroll();

      $rootScope.globalLeftDetailView = false;
      $state.go('home.viewChallengePersonal', {
        id: challenge.id
      });
    }
  };

  self.readMyChallenges = function () {
    if (authFactory.isAuth()) {
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
    }
  };

  self.readImposedChallenges = function () {
    if (authFactory.isAuth()) {
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
    }
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

  self.initializeChallenge = function (challenge) {
    createCountdown(challenge);
    checkCompletedStatus(challenge);
  };

  function checkCompletedStatus(challenge) {
    var issue = moment(challenge.issuedDate);
    var now = moment();
    var difference = now.diff(issue, 'hours');

    if (difference >= 1) {
      if (challenge.notCompleted === false && challenge.completed === false) {
        // set the challenge to be completed
        challenge.notCompleted = true;

        var updateObj = {
          id: challenge.id,
          notCompleted: true
        };
        // call factory function to update challenge values
        challengeFactory.updateChallenge(updateObj)
          .catch(function (err) {
            console.log('error changing status to completed : ', err);
          });
      }
    }
  }

  function createCountdown(challenge) {
    var expire = moment(challenge.expiresDate);
    var now = moment();
    var interval = -1;
    var counter = moment.duration(expire.diff(now), 'ms');

    (function tick() {
      counter = moment.duration(counter.asMinutes() + interval, 'minutes');
      if (Math.floor(counter.minutes()) === 0) {
        checkCompletedStatus(challenge);
      } else {
        var minutes = counter.minutes();
        minutes = minutes < 10 ? '0' + minutes : minutes;
        challenge.remaining = counter.hours() + ' h ' + minutes + ' m remaining';
        countdownTimeout = $timeout(tick, 60000);
      }
    })();
  }

}]);
