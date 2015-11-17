/*

launch.js
sets up launch controller

*/

angular.module('App.home', [])

.controller('homeCtrl', ['challengeFactory', function (challengeFactory) {

  var self = this;

  self.challenges = [];

  /* Load All Challenges from DB */
  self.read = function(){
    // console log
    console.log('load all challenges...');
    // factory function
    challengeFactory.readAllChallenge()
      .then(function(data){
        // console log
        console.log('all challenges : ', data);
        // save to local array
        self.challenges = data;
      })
      .catch(function(err){
        console.log('error : ', err);
      });
  };

}]);
