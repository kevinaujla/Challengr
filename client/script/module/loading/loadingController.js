/*

loadingController.js
create loading feature

*/

angular.module('App.loadingController', [])

.controller('loadingController', ['$scope', 'loadingService', function ($scope, loadingService) {

  $scope.startSpin = function () {
    loadingService.startSpin();
  };

  $scope.stopSpin = function () {
    loadingService.stopSpin();
  };

  $scope.spinneractive = loadingService.spinneractive;

}]);
