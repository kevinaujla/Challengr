/*

auth.js
sets up authorization controller

*/

angular.module('App.profile', [])

.controller('profileCtrl', ['authFactory', 'braintreeFactory', function(authFactory, braintreeFactory) {

  var self = this;
  var transactions = [];

  // Retreive user's information and display
  self.getUser = function(){

  };

  // Update user information
  self.updateUser = function(){
    
  };

  // Get all transaction history for user
  self.getBilling = function(){
    braintreeFactory.getTransactions()
      .then(function(data){
        console.log('Transactions : ', data.transactions);
        self.transactions = data.transactions;
      })
      .catch(function(err){
        console.log('error retreiving transactions...', err);
      });
  };

  // Sign user out
  self.signout = function(){
    authFactory.signout();
  };

}]);