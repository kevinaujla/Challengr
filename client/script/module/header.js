/*

personalChallenge.js


*/

angular.module('App.header', [])

.controller('headerCtrl', ['$rootScope', '$state', function ($rootScope, $state) {

  var self = this;

  // Set Globals back to true
  self.homeSetDetail = function(){
   $rootScope.globalLeftDetailView = true;
   $rootScope.globalRightDetailView = true;
   $rootScope.leftDetailViewRoute = false;
   $state.transitionTo('home');
  };

}]);
