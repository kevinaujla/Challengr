/*

radioButton.js
shares radio button functionality 

*/

angular.module('App.radio', [])

.controller('buttonsCtrl', ['$scope', 'radioButtonService', function ($scope, radioButtonService) {

  $scope.radioModel = null;

  $scope.$watch('radioModel', function(){
    radioButtonService.radio = $scope.radioModel;
  });

  $scope.checkModel = {
    left: false,
    middle: true,
    right: false
  };

  $scope.checkResults = [];

  $scope.$watchCollection('checkModel', function () {
    $scope.checkResults = [];
    angular.forEach($scope.checkModel, function (value, key) {
      if (value) {
        $scope.checkResults.push(key);
      }
    });
  });
}])

.service('radioButtonService', function(){
  this.radio = '';
});