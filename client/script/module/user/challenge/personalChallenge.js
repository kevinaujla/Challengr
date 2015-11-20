/*

personalChallenge.js


*/

angular.module('App.personalChallenge', [])

.controller('personalChallengeCtrl', ['challengeFactory', '$scope', '$interval', function(challengeFactory, $scope, $interval) {

  var self = this;

  $scope.date = null;

  $scope.$watch('date | json', function() {
    console.log('date : ', $scope.date);
    // every minute do a check if the date has reached the expired date
    
  });
  
  $interval(function() {
    $scope.date = moment(new Date());
  }, 60000);

  self.challenges = [];

  self.load = function(){
    console.log('load challenges for user...');
    challengeFactory.readAllChallengeForUser()
      .then(function(data){
        self.challenges = data;
      })
      .catch(function(err){
        console.log('error getting challenges for user... : ', err);
      });

  };

}]);