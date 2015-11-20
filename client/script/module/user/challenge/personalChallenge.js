/*

personalChallenge.js


*/

angular.module('App.personalChallenge', [])

.controller('personalChallengeCtrl', [ function() {

  var self = this;

  self.load = function(){
    console.log('load challenges for user...');
  };

}]);