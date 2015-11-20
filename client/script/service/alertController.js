/*

alertController.js
create a alert

*/

angular.module('App.alertController', [])

.controller('alertController', ['$scope','addAlertService', function ($scope,addAlertService) {

  $scope.alerts=addAlertService.alerts;
  
  $scope.addAlert = function() {
    addAlertService.alerts.push({msg: 'CHALLENGE CREATED'});
  };

  $scope.closeAlert = function(index) {
    addAlertService.alerts.splice(index, 1);
  };

}]);
