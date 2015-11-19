/*

authFactory.js
handles http request for auth controller

*/

angular.module('App.charityFactory', [])

.factory('charityFactory', ['$http', '$state', '$window', function ($http, $state, $window) {

  var load = function(){
    return $http({
        method: 'GET',
        url: '/api/charity',
      })
      .then(function (resp) {
        return resp.data;
      });
  };

  return {
    load: load,
  };

}]);