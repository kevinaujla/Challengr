/*

newsfeed.js
newsfeed controller

*/

angular.module('App.newsfeed', [])

.controller('newsfeedCtrl', ['challengeFactory', '$scope', 'braintreeFactory', 'challengeService', '$timeout', function (challengeFactory, $scope, braintreeFactory, challengeService, $timeout) {

  var self = this;

  self.notLoggedIn = true;
  self.challenges = [];
  self.getChallengeTimer;

  // when changing views cancel the timer to reload challenges
  // $scope.$on('$destroy', function (event) {
  //   $timeout.cancel(self.getChallengeTimer);
  // });

  /*
    Braintree Management
  */

  // only used for convenience purposes for deleting braintree customers
  // not actually integrated into application workflow
  self.braintreeCustomers = [];

  self.getBraintreeCustomers = function () {
    braintreeFactory.getAllBraintreeCustomers()
      .then(function (data) {
        console.log('all braintree customers : ', data);
        self.braintreeCustomers = data;
      })
      .catch(function (err) {
        console.log('error getting all braintree customers : ', err);
      });
  };

  self.deleteAllBraintreeCustomers = function () {
    angular.forEach(self.braintreeCustomers, function (customer) {
      console.log('deleting customer : ', customer);
      braintreeFactory.deleteBraintreeCustomer(customer)
        .then(function () {
          console.log('deleted braintree customer successfully...');
        })
        .catch(function (err) {
          console.log('error : ', err);
        });
    });
  };

  /* Load All Challenges from DB */

  self.read = function () {
    (function tick() {
      challengeFactory.readAllChallenge()
        .then(function (challenges) {
          self.challenges = challenges;
          console.log('read all challenges : ', challenges);
          challengeService.challenges = challenges;
          getChallengeTimer = $timeout(tick, 90000000);
        })
        .catch(function (err) {
          console.log('error : ', err);
        });
    })();
  };

}]);
