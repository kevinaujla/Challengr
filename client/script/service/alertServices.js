/*

alertServices.js
file to share alert services between controllers

*/

angular.module('App.alertService', [])

.factory("success", function(message) {
  // Console Log
  console.log('success alert : ', message);
})

.factory("failure", function(message) {
  // Console Log
  console.log('failure alert : ', message);
});
