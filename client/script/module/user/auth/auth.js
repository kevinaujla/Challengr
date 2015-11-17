/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl',['$window', '$state', 'authFactory', function ($window, $state, authFactory) {

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

}]);
