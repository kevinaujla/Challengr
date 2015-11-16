/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl', function ($scope, $window, $location, AuthFactory) {

  var self = this;

  self.signup = function () {
    console.log('user object is:', self);
    AuthFactory.signup(self)
      .then(function (token) {
        $window.localStorage.setItem('com.challengr', token);
      })
      .catch(function (err) {
        console.log('signup error:', err);
      });
  };

  self.signin = function () {
    console.log('user signing in:', self);
    AuthFactory.signin(self)
      .then(function (token) {
        $location.path('/home');
      })
      .catch(function (err) {
        console.log(err);
      });
  }



});
