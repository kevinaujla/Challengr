/*

launch.js
sets up launch controller

*/

angular.module('App.home', [])

.controller('homeCtrl', ['challengeFactory', '$scope', '$moment', 'createChallengeService', 'braintreeFactory', function (challengeFactory, $scope, $moment, createChallengeService, braintreeFactory) {

  var self = this;

  self.challenges = [];

  // If you set asyncLoading to true then angular-momentjs 
  // will inject the script and return a promise 
  $moment.then(function(moment) {
    $scope.anotherTime = moment('20151118', 'YYYYMMDD').fromNow();
  });

  self.getBraintreeCustomers = function(){
    console.log('getting braintree customers...');
    braintreeFactory.getAllBraintreeCustomers()
      .then(function(data){
        console.log('all braintree customers : ', data);
      })
      .catch(function(err){
        console.log('error getting all braintree customers : ', err);
      });
  };

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
