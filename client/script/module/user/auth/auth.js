/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl', ['Auth', function(Auth) {

  var self = this;

  self.signin = function(){
    Auth.signIn();
  };

}]);