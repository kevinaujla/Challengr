/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl',['$window', '$state', 'authFactory', 'braintreeFactory', 'alertService', function ($window, $state, authFactory, braintreeFactory, alertService) {

  var self = this;

  self.signup = function () {
    // factory function
    authFactory.signup(self)
      .then(function (data) {
        // check if successful
        if (data.success === true) {
          // console log
          console.log('signed up successfully...');
          // set token
          $window.localStorage.setItem('com.challengr', data.token);
          // add basic user info to localStorage
          self.saveToLocalStorage(data.user);
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

  self.saveToLocalStorage = function(user) {
    // add basic user info to localStorage
    console.log('saving basic user info to localStorage:', user);
    $window.localStorage.setItem('com.challengr.firstName', user.firstName);
    $window.localStorage.setItem('com.challengr.lastName', user.lastName);
    $window.localStorage.setItem('com.challengr.email', user.email);
  };

  self.signin = function () {
    // factory function
    authFactory.signin(self)
      .then(function (data) {
        // check if successful
        if (data.success === true) {
          // console log
          console.log('signed in successfully...');
          // set token
          $window.localStorage.setItem('com.challengr', data.token);
          // add basic user info to localStorage
          self.saveToLocalStorage(data.user);
          // Get Braintree token
          self.searchBraintreeCustomer();
          // redirect
          $state.go('home');
        } else {
          // show alert of failure with data.message
          console.log('signin failure : ', data.message);
          addAlertService.addAlert('danger', data.message);
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
    console.log('create braintree customer...');
    braintreeFactory.createCustomer(self)
      .then(function(data){
        // console log
        console.log('created braintree customer... : ', data);
        // set token
        $window.localStorage.setItem('com.braintree', data.customer.id);
      })
      .catch(function(err){
        console.log('error creating braintree customer...', err);
      });
  };

  /*
    Braintree create customer account
  */
  self.searchBraintreeCustomer = function(){
    console.log('search for existing braintree customer.......');
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
