/*

personalChallenge.js


*/

angular.module('App.personalChallenge', [])

.controller('personalChallengeCtrl', ['challengeFactory', function(challengeFactory) {

  var self = this;

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