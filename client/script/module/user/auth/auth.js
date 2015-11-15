/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl', ['AuthFactory', function (AuthFactory) {

  var self = this;

  self.signin = function () {
    AuthFactory.signIn();
  };

}]);
