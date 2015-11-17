/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl',['$window', '$state', 'AuthFactory', function ($window, $state, AuthFactory) {

  var self = this;

  self.signup = function () {
    // console log
    console.log('signup the user...');
    // factory function
    AuthFactory.signup()
      .then(function (data) {
        // console log
        console.log('received data from server : ', data);
        // set token
        $window.localStorage.setItem('com.challengr', data.token);
      })
      .catch(function (err) {
        console.log('signup error:', err);
      });
  };

  self.signin = function () {
    // console log
    console.log('signin the user...');
    // factory function
    AuthFactory.signin()
      .then(function (data) {
        // console log
        console.log('signed in successfully... : ', data);
        // if (data.token) {
          
        // }
        // set token
        $window.localStorage.setItem('com.challengr', data.token);
        // redirect
        $state.go('home');
      })
      .catch(function (err) {
        console.log(err);
      });

  };

}]);
