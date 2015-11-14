/*

auth.js
sets up authorization controller

*/

angular.module('App.auth', [])

.controller('authCtrl', ['Auth', function() {

  var self = this;

  self.signin = function(){
    Auth.signIn();
  };

}]);