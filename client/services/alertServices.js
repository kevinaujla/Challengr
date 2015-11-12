/*

alertServices.js
file to share alert services between controllers

*/

angular.module('App.loadingService', [])

.factory("success", function(message) {

  '<div class="alert"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>')

})

.factory("failure", function(message) {

  '<div class="alert"><a class="close" data-dismiss="alert">×</a><span>' + message + '</span></div>')

})
