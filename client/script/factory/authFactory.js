/*

authFactory.js
handles http request for auth controller

*/

angular.module('App.authFactory', [])

.factory('authFactory', ['$http', '$state', '$window', function ($http, $state, $window) {

  var signup = function (user) {
    return $http({
        method: 'POST',
        url: '/api/auth/signup',
        data: user,
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var signin = function (user) {
    return $http({
        method: 'POST',
        url: '/api/auth/signin',
        data: user
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var signout = function () {
    $window.localStorage.removeItem('com.challengr');
    $state.go('signin');
  };

  return {
    signup: signup,
    signin: signin,
    signout: signout
  };

}]);
