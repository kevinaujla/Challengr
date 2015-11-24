/*

launch.js
sets up launch controller

*/

angular.module('App.home', [])

.controller('homeCtrl', ['challengeFactory', '$scope', 'braintreeFactory', 'challengeService', function (challengeFactory, $scope, braintreeFactory, challengeService) {

  var self = this;

  self.notLoggedIn = true;
  self.challenges = [];

  /*
    Braintree Management
  */

  self.braintreeCustomers = [];

  self.getBraintreeCustomers = function(){
    braintreeFactory.getAllBraintreeCustomers()
      .then(function(data){
        console.log('all braintree customers : ', data);
        self.braintreeCustomers = data;
      })
      .catch(function(err){
        console.log('error getting all braintree customers : ', err);
      });
  };

  self.deleteAllBraintreeCustomers = function(){
    angular.forEach(self.braintreeCustomers, function(customer){
      console.log('deleting customer : ', customer);
      braintreeFactory.deleteBraintreeCustomer(customer)
        .then(function(){
          console.log('deleted braintree customer successfully...');
        })
        .catch(function(err){
          console.log('error : ', err);
        });
    });
  };

  /* Load All Challenges from DB */
  self.read = function(){
    // factory function
    challengeFactory.readAllChallenge()
      .then(function(data){
        // console log
        console.log('all challenges : ', data);
        // save to local array
        self.challenges = data;
        // save to service object
        challengeService.challenges = data;
      })
      .catch(function(err){
        console.log('error : ', err);
      });
  };

}]);