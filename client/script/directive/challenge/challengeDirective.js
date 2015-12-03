/*

challengeDirective.js


*/

angular.module('App.challengeDirective', [])

.directive('challenge', ['challengeFactory', '$state', function (challengeFactory, $state) {

  var controller = ['$scope', function ($scope) {

    var issue = moment($scope.issueddate);
    var expire = moment($scope.expiresDate);

    var difference = issue.diff(expire);

    if (difference > 86400000) {

      if ($scope.notCompleted === false) {
        // set the challenge to be completed
        var updateObj = {
          id: $scope.challengeid,
          likes: $scope.likes,
          completed: $scope.completed,
          notCompleted: true,
        };
        // call factory function to update challenge values
        challengeFactory.updateChallenge(updateObj)
          .then(function () {
            console.log('succesfully changed challenges status to be completed');
          })
          .catch(function (err) {
            console.log('error changing status to completed : ', err);
          });
      }
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
