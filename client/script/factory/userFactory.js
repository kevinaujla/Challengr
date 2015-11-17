/*

authFactory.js
handles http request for auth controller

*/

angular.module('App.userFactory', [])

.factory('userFactory', ['$http', '$state', '$window', function ($http, $state, $window) {

  var getAllUsers = function(){
    return $http({
        method: 'GET',
        url: '/api/user',
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  return {
    getAllUsers : getAllUsers,
  };

}]);