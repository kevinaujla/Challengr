/*

challengeFactory.js
handles http request for challenges

*/

angular.module('App.challengeFactory', [] )

.factory('challengeFactory', ['$resource', function($resource) {

  // $resource returns an object with get(), query(), save(), remove(), delete()
  return $resource('/api/challenge/:id', {id : '@_id'}, 
    { update : 
      { method : 'PUT' } 
    });

}]);