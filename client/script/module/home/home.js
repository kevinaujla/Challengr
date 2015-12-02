/*

home.js
home view controller

*/

angular.module('App.home', [])

.controller('homeCtrl', ['challengeFactory', '$scope', 'braintreeFactory', 'challengeService', function (challengeFactory, $scope, braintreeFactory, challengeService) {

  var self = this;

  self.notLoggedIn = true;
  self.challenges = [];

  /*
    Braintree Management
  */

  // only used for convenience purposes for deleting braintree customers
  // not actually integrated into application workflow
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
    challengeFactory.readAllChallenge()
      .then(function(data){
        // store challanges in challenges model
        self.challenges = data;
        // save to service object
        challengeService.challenges = data;
      })
      .catch(function(err){
        console.log('error : ', err);
      });
  };

}]);