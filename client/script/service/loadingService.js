/*

loadingServices.js
file to share loading alert services between controllers

*/

angular.module('App.loadingService', [])

.factory('start', function() {
  // Console Log
  console.log('start spinner');
})

.factory('stop', function() {
  // Console Log
  console.log('stop spinner');
});
