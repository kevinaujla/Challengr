/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl', function($scope, $window, $location, AuthFactory){

  var self = this;
  self.failedAttempt = false;
  self.failedLogin = false;
  self.Loginorout = AuthFactory;


  self.signup = function() {
    console.log('user object is:', self);
    AuthFactory.signup(self)
      .then(function(token) {
        $window.localStorage.setItem('com.challengr', token);
      })
      .catch(function(err) {
        self.failedAttempt = true;
        console.log('signup error:', err);
      });
  };

  self.signin = function() {
    console.log('user signing in:', self);
      AuthFactory.signin(self)
        .then(function(token) {
          AuthFactory.loginorout = "Logout"
        })
        .catch(function(err) {
          self.failedLogin = true;
          console.log(err);
        });
  }




});
