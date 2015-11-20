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

  var getUserByID = function(userID){
    console.log('get user by id : ', userID);
    return $http({
        method: 'GET',
        url: '/api/user/one',
        params: {id : userID},
      })
      .then(function (resp) {
        // return the image
        return resp.data.photoURL;
      });
  };

  return {
    getAllUsers : getAllUsers,
    getUserByID : getUserByID,
  };

}]);