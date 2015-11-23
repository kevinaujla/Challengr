/*

alertController.js
create a alert

*/

angular.module('App.alertController', [])

.controller('alertController', ['$scope', 'alertService', 'socket', function ($scope, alertService, socket) {

  $scope.alerts = alertService.alerts;

  socket.on('got challenged', function (msg) {
    alertService.addAlert('success', msg);
  });
  
  $scope.addAlert = function (type, msg) {
    alertService.addAlert(type, msg);
  };

  $scope.closeAlert = function (index) {
    alertService.closeAlert(index);
  };

}]);