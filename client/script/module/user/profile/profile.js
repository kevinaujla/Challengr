/*

auth.js
sets up authorization controller

*/

angular.module('App.profile', [])

.controller('profileCtrl', ['authFactory', 'braintreeFactory', function(authFactory, braintreeFactory) {

  var self = this;
  var transactions = [];

  // Retreive user's information and display
  self.getUser = function () {
    self.firstName = localStorage.getItem('com.challengr.firstName');
    self.lastName = localStorage.getItem('com.challengr.lastName');
    self.email = localStorage.getItem('com.challengr.email');
    self.location = "San Francisco"; // temp; to be replaced with database location in future
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