/*

auth.js
sets up authorization controller

*/

angular.module('App.profile', [])

.controller('profileCtrl', ['authFactory', 'braintreeFactory', function(authFactory, braintreeFactory) {

  var self = this;

  // Retreive user's information and display
  self.getUser = function(){

  };

  // Update user information
  self.updateUser = function(){
    
  };

  // Get all transaction history for user
  self.getBilling = function(){
    braintreeFactory.searchCustomer()
      .then(function(data){
        console.log('data : ', data);

      })
      .catch(function(err){
        console.log('error : ', err);
      });
  };

  // Sign user out
  self.signout = function(){
    authFactory.signout();
  };

}]);