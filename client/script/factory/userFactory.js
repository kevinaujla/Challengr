/*

authFactory.js
handles http request for auth controller

*/

angular.module('App.userFactory', [])

.factory('userFactory', ['$http', '$state', '$window', function ($http, $state, $window) {

  var getAllUsers = function () {
    return $http({
        method: 'GET',
        url: '/api/user',
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var getUserByID = function (userID) {
    return $http({
        method: 'GET',
        url: '/api/user/one',
        params: {
          id: userID
        },
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  var updateProfilePhoto = function (photoURL) {
    return $http({
        method: 'PUT',
        url: '/api/user/',
        data: {
          photoURL: photoURL
        }
      })
      .then(function (resp) {
        return resp.data;
      })
  }

  return {
    getAllUsers: getAllUsers,
    getUserByID: getUserByID,
    updateProfilePhoto: updateProfilePhoto,
  };

}]);
