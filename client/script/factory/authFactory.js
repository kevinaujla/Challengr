/*

authFactory.js
handles http request for auth controller

*/

angular.module('App.authFactory', [])

.factory('AuthFactory', ['$http', '$state', '$window', function ($http, $state, $window) {
  var signup = function (user) {
    return $http({
        method: 'POST',
        url: '/api/auth/signup',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
      })
  };

  var signin = function (user) {
    return $http({
        method: 'POST',
        url: '/api/auth/signin',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
      });
  };

  var signout = function () {
    $window.localStorage.removeItem('com.challengr');
    $location.path('/signin');
  };

  return {
    signup: signup,
    signin: signin,
    signout: signout
  };

}])
