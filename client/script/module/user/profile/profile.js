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
    var firstName = localStorage.getItem('com.challengr.firstName');
    var lastName = localStorage.getItem('com.challengr.lastName');
    var email = localStorage.getItem('com.challengr.email');
    var location = "San Francisco, CA"; // temp; to be replaced with database location in future
    self.firstName = firstName;
    self.lastName = lastName;
    self.email = email;
    self.location = location;
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
    localStorage.clear();
    authFactory.signout();
  };

}]);