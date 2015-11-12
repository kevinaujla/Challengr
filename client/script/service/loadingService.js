/*

loadingServices.js
file to share loading alert services between controllers

*/

angular.module('App.loadingService', [])

.factory('start', function(message) {
  // Console Log
  console.log('start spinner');
})

.factory('stop', function(message) {
  // Console Log
  console.log('stop spinner');
});
