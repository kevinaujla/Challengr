/*

challenge.js
sets up challenge controller

*/

angular.module('App.challenge', ['ui.bootstrap'])

.controller('challengeCtrl', ['$scope', '$window', function($scope, $window) {
  console.log($scope);
  console.log($window);
   $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];

  $scope.alertMe = function() {
    setTimeout(function() {
      $window.alert('You\'ve selected the alert tab!');
    });
  };

}]);