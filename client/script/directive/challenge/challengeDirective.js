/*

challengeDirective.js


*/

angular.module('App.challengeDirective', [])

.directive('challenge', ['challengeFactory', '$state', function (challengeFactory, $state) {

  var controller = ['$scope', '$timeout', function ($scope, $timeout) {

    var countdownTimeout;
    $scope.remaining;

    $scope.$on('$destroy', function (event) {
      $timeout.cancel(countdownTimeout);
    });

    $scope.configureDirective = function () {
      createCountdown();
      checkCompletedStatus();
    };

    function checkCompletedStatus() {
      var issue = moment($scope.issueddate);
      var now = moment();
      var difference = now.diff(issue, 'hours');

      if (difference > 24) {
        if ($scope.notcompleted === false && $scope.completed === false) {
          // set the challenge to be completed
          $scope.notcompleted = true;

          var updateObj = {
            id: $scope.challengeid,
            notCompleted: true
          };
          // call factory function to update challenge values
          challengeFactory.updateChallenge(updateObj)
            // .then(function () {
            //   console.log('succesfully changed challenges status to be completed');
            // })
            .catch(function (err) {
              console.log('error changing status to completed : ', err);
            });
        }
      }
    }

    function createCountdown() {  
      var expire = moment($scope.expiresdate);
      var now = moment();
      var interval = -1;
      var counter = moment.duration(expire.diff(now), 'ms');
      
      (function tick() {
        counter = moment.duration(counter.asMinutes() + interval, 'minutes');
        if (Math.floor(counter.minutes()) === 0) {
          checkCompletedStatus();
        } else {
          var minutes = counter.minutes();
          minutes = minutes < 10 ? '0' + minutes : minutes;
          $scope.remaining = counter.hours() + ' h ' + minutes + ' m remaining';
          countdownTimeout = $timeout(tick, 60000);
        }
      })();
    }

  }];

  return {
    restrict: 'E',
    templateUrl: 'script/directive/challenge/challengeDirective.html',
    scope: {
      challengeid: '=',
      challengechallenged: '=',
      challengechallenger: '=',
      charityamount: '=',
      title: '=',
      description: '=',
      likes: '=',
      completeddate: '=',
      expiresdate: '=',
      issueddate: '=',
      completed: '=',
      notcompleted: '=',
      type: '=',
    },

    controller: controller,

    link: function (scope, element, attrs) {
      element.on('click', function (event) {
        if (event.toElement.classList[0] !== 'noViewChange') {
          // open the detail view of the challenge...
          $state.go('viewChallenge', {
            id: scope.challengeid
          });
        }
      });

      scope.increaseLike = function () {
        // create object to update
        var updateObj = {
          id: scope.challengeid,
          likes: ++scope.likes,
          completed: scope.completed,
          notCompleted: scope.notcompleted,
        };
        // call factory function to update challenge values
        challengeFactory.updateChallenge(updateObj)
          .then(function () {
            console.log('succesfully increased like');
          })
          .catch(function (err) {
            console.log('error increasing like : ', err);
          });
      };
    }
  };
}]);
