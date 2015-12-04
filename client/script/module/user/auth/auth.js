/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl', ['$window', '$state', 'authFactory', 'braintreeFactory', 'alertService', function ($window, $state, authFactory, braintreeFactory, alertService) {

  var self = this;

  self.signup = function () {
    authFactory.signup(self)
      .then(function (data) {
        if (data.success === true) {
          console.log('signed up successfully...');
          $window.localStorage.setItem('com.challengr', data.token);
          // add basic user info to localStorage
          self.saveToLocalStorage(data.user);
          self.createBraintreeCustomer();
          $state.go('home');
        } else {
          alertService.addAlert('danger', data.message, 'icon-budicon-57');
        }
      })
      .catch(function (err) {
        console.log('signup error:', err);
      });
  };

  // add basic user info to localStorage
  self.saveToLocalStorage = function (user) {
    $window.localStorage.setItem('com.challengr.firstName', user.firstName);
    $window.localStorage.setItem('com.challengr.lastName', user.lastName);
    $window.localStorage.setItem('com.challengr.email', user.email);
    $window.localStorage.setItem('com.challengr.photoURL', user.photoURL);
  };

  self.signin = function () {
    // factory function
    authFactory.signin(self)
      .then(function (data) {
        // check if successful
        if (data.success === true) {
          // console.log('signed in successfully');
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
          alertService.addAlert('danger', data.message, 'icon-budicon-57');
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  /* Braintree create customer account */
  self.createBraintreeCustomer = function () {
    braintreeFactory.createCustomer(self)
      .then(function (data) {
        // console log
        console.log('BRAINTr customer : ', data.braintreeUser);
        // set token
        $window.localStorage.setItem('com.braintree', data.braintreeUser.id);
      })
      .catch(function (err) {
        console.log('error creating new braintree customer...');
      });
  };

  /* Braintree search customer account */
  self.searchBraintreeCustomer = function () {
    braintreeFactory.searchCustomer()
      .then(function (data) {
        // console log
        console.log('got existing braintree customer', data.braintreeUser.id);
        // local storage
        $window.localStorage.setItem('com.braintree', data.braintreeUser.id);
      })
      .catch(function (err) {
        console.log('error retreiving braintree customer...');
      });
  };

}]);
