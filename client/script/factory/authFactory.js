/*

authFactory.js
handles http request for auth controller

*/

angular.module('App.authFactory', [])

.factory('AuthFactory', ['$http', '$state', '$window', '$timeout', function ($http, $state, $window) {
  var loginorout = "Sign in";
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

  var signout = function() {
    $window.localStorage.removeItem('com.challengr');
    $window.localStorage.removeItem('com.challengr.name');
    $window.localStorage.removeItem('com.challengr.date')
      $location.path('/signin');
  };

  var isAuth = function() {
    if(!window.localStorage.getItem('com.challengr')){
      return false;
    }
    loginorout = "Logout"
    if(new Date() - Date.parse($window.localStorage.getItem('com.challengr.date'))>1800000){
      $window.localStorage.removeItem('com.challengr');
      $window.localStorage.removeItem('com.challengr.name');
      $window.localStorage.removeItem('com.challengr.date');
      return false;
    }else{
      $window.localStorage.setItem('com.challengr.date', new Date());
      return true;
    }
  };

  return {
    signup: signup,
    signin: signin,
    signout: signout,
    isAuth: isAuth,
    loginorout: loginorout
  };

}])
