/*

personalChallenge.js


*/

angular.module('App.personalChallenge', [])

.controller('personalChallengeCtrl', ['challengeFactory', 'userFactory', '$scope', '$interval', '$state', 'braintreeFactory', function(challengeFactory, userFactory, $scope, $interval, $state, braintreeFactory) {

  var self = this;

  $scope.date = null;

  $scope.$watch('date | json', function(date) {
    // console.log('date : ', $scope.date);
    // every minute do a check if the date has reached the expired date
    
  });
  
  $interval(function() {
    $scope.date = moment(new Date());
    // console.log('date : ', $scope.date);
  }, 1000);

  self.challenges = [];

  self.showDetail = function(challenge){
    console.log('show detail view of challenge: ', challenge);
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