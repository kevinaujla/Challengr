/*

personalChallenge.js


*/

angular.module('App.personalChallenge', [])

.controller('personalChallengeCtrl', ['challengeFactory', 'userFactory', '$scope', '$state', 'braintreeFactory', function(challengeFactory, userFactory, $scope, $state, braintreeFactory) {

  var self = this;

  self.challenges = [];

  self.showDetail = function(challenge){
    // open the detail view of the challenge...
    $state.go('viewChallenge', {id : challenge.id});
  };

  self.load = function(){
    challengeFactory.readAllChallengeForUser()
      .then(function(data){
        console.log('challenges for user : ', data);
        self.challenges = data;

        // go through each challenge and call factory function to retreive the image 
        angular.forEach(data, function(challenge){
          userFactory.getUserByID(challenge.ChallengedId)
            .then(function(image){
              // add the image to the challenge
              challenge.challengerImg = image;
            })
            .catch(function(err){
              console.log('error getting image : ', err);
            });
        });

      })
      .catch(function(err){
        console.log('error getting personal challenges for user...');
      });

  };

}]);