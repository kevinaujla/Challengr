/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl',['$window', '$state', 'authFactory', 'braintreeFactory', function ($window, $state, authFactory, braintreeFactory) {

  var self = this;

  self.signup = function () {
    // console log
    console.log('signup the user...');
    // factory function
    authFactory.signup(self)
      .then(function (data) {
        // check if successful        
        if (data.success === true) {
          // console log
          console.log('signed up successfully... : ', data);
          // set token
          $window.localStorage.setItem('com.challengr', data.token);
          // Call Braintree create customer function
          self.createBraintreeCustomer();
          // redirect
          $state.go('home');
        } else {
          // console log 
          console.log('sign up failure...');
          // show alert of failure with data.message
        }
      })
      .catch(function (err) {
        console.log('signup error:', err);
      });
  };

  self.signin = function () {
    // console log
    console.log('signin the user...');
    // factory function
    authFactory.signin(self)
      .then(function (data) {
        // check if successful
        if (data.success === true) {
          // console log
          console.log('signed in successfully... : ', data);
          // set token
          $window.localStorage.setItem('com.challengr', data.token);
          // Get Braintree token
          self.searchBraintreeCustomer();
          // redirect
          $state.go('home');
        } else {
          // console log 
          console.log('sign in failure...');
          // show alert of failure with data.message
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /*
    Braintree create customer account
  */
  self.createBraintreeCustomer = function(){
    braintreeFactory.createCustomer(self)
      .then(function(data){
        // console log
        console.log('created braintree customer... : ', data);
        // set token
        $window.localStorage.setItem('com.braintree', data.customer);
      })
      .catch(function(err){
        console.log('error creating braintree customer...', err);
      });
  };

  /*
    Braintree create customer account
  */
  self.searchBraintreeCustomer = function(){
    braintreeFactory.searchCustomer()
      .then(function(data){
        // console log
        console.log('got existing braintree customer...', data);
        // local storage
        $window.localStorage.setItem('com.braintree', data.braintreeUser.id);
      })
      .catch(function(err){
        console.log('error retreiving braintree customer...', err);
      });
  };

}]);
