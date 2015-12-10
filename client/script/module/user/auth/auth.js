/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl', ['$window', '$state', 'authFactory', 'braintreeFactory', 'alertService', 'socket', function ($window, $state, authFactory, braintreeFactory, alertService, socket) {

  var self = this;

  self.signup = function () {
    authFactory.signup(self)
      .then(function (data) {
        if (data.success === true) {
          $window.localStorage.setItem('com.challengr', data.token);
          self.saveToLocalStorage(data.user);
          self.createBraintreeCustomer();
          // connect socket on signup
          socket.configureSocket();
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
    authFactory.signin(self)
      .then(function (data) {
        if (data.success === true) {
          $window.localStorage.setItem('com.challengr', data.token);
          self.saveToLocalStorage(data.user);
          self.searchBraintreeCustomer();
          // connect socket on signin
          socket.configureSocket();
          $state.go('home');
        } else {
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
        // console.log('braintree customer : ', data.braintreeUser);
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
        console.log('got existing braintree customer', data);
        $window.localStorage.setItem('com.braintree', data.braintreeUser.id);
      })
      .catch(function (err) {
        console.log('error retreiving braintree customer...');
      });
  };

}]);
