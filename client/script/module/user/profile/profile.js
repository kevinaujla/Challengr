/*

auth.js
sets up authorization controller

*/

angular.module('App.profile', [])

.controller('profileCtrl', ['authFactory', 'braintreeFactory', function(authFactory, braintreeFactory) {

  var self = this;
  var transactions = [];

  // on sign in, to get user name and photo
  self.getUserInfo = function(){
    self.username = localStorage.getItem('com.challengr.firstName');
    self.photoURL = localStorage.getItem('com.challengr.photoURL');
  };

  // Retreive user's information and display
  self.getUser = function () {
    self.firstName = localStorage.getItem('com.challengr.firstName');
    self.lastName = localStorage.getItem('com.challengr.lastName');
    self.email = localStorage.getItem('com.challengr.email');
    self.photoURL = localStorage.getItem('com.challengr.photoURL');
    self.location = 'San Francisco'; // temp; to be replaced with database location in future
  };

  // Update user information
  self.updateUser = function(){

  };

  // Get all transaction history for user
  self.getBilling = function(){
    braintreeFactory.getTransactions()
      .then(function(data){
        console.log('users billing transactions : ', data.transactions);
        self.transactions = data.transactions;
      })
      .catch(function(err){
        console.log('error retreiving users billing transactions...', err);
      });
  };

  // Sign user out
  self.signout = function(){
    authFactory.signout();
  };

}]);