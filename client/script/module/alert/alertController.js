/*

alertController.js
create a alert

*/

angular.module('App.alertController', [])

.controller('alertController', ['$scope', 'alertService', 'socket', function ($scope, alertService, socket) {

  $scope.alerts = alertService.alerts;

  socket.on('got challenged', function (msg) {
    $scope.addAlert('notification', msg, 'icon-bell-o');
  });

  $scope.addAlert = function (type, msg, icon) {
    alertService.addAlert(type, msg, icon);
  };

  $scope.closeAlert = function (index) {
    alertService.closeAlert(index);
  };

}]);
