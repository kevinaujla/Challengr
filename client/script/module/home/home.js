/*

launch.js
sets up launch controller

*/

angular.module('App.home', [])

.controller('homeCtrl', ['challengeFactory', '$scope', '$moment', function (challengeFactory, $scope, $moment) {

  var self = this;

  $scope.$on('$routeChangeSuccess', function() {
    // var path = $location.path();
    // console.log(path);
    // $scope.carsVisible = false;
    // $scope.bikesVisible = false;
    // if(path === '/cars') {
    //    $scope.carsVisible = true;
    // } else if(path === '/bikes') {
    //    $scope.bikesVisible = true;
    // }
    console.log('changing....');
  });
  

  self.notLoggedIn = true;

  self.challenges = [];

  // If you set asyncLoading to true then angular-momentjs 
  // will inject the script and return a promise 
  $moment.then(function(moment) {
    $scope.anotherTime = moment('20151118', 'YYYYMMDD').fromNow();
  });

  /* Load All Challenges from DB */
  self.read = function(){
    // console log
    console.log('load all challenges...');
    // factory function
    challengeFactory.readAllChallenge()
      .then(function(data){
        // console log
        console.log('all challenges : ', data);
        // save to local array
        self.challenges = data;
      })
      .catch(function(err){
        console.log('error : ', err);
      });
  };

}]);
