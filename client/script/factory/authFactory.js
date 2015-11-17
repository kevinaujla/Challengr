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

  var isAuth = function() {
    if(!window.localStorage.getItem('com.challengr')){
      return false;
    } else {
      return true;
    }
  };




  return {
    signup: signup,
    signin: signin,
    signout: signout,
    isAuth: isAuth
  };

}])

.factory('attachToken', function($window){
  console.lot('in attachToken...');
  return {
    request : function(object){
      var jwt = $window.localStorage.getItem('com.challengr');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
});

