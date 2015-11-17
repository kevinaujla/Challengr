/*

challenges.js
CRUD for challenges

*/

angular.module('App.challenge', ['ui.bootstrap'])

.controller('challengeListCtrl', ['ChallengeFactory', function (ChallengeFactory) {

  var self = this;

}])

.controller('challengeNewCtrl', ['ChallengeFactory', 'BraintreeFactory', '$state', function (ChallengeFactory, BraintreeFactory, $state) {

  var self = this;

  self.payment = {};

  // get token
  self.getToken = function () {
    // console log
    console.log('get client token...');
    BraintreeFactory.getToken()
      .then(function (token) {
        // console log
        console.log('received token...');
        // initialize braintree dropin with client token
        braintree.setup(token, 'dropin', {
          container: 'payment-form',
          // onPaymentMethodReceived: function (payload) {
          //   // retrieve nonce from payload.nonce
          //   console.log('payment method received...', payload);
          //   // show success confirmation

          //   // redirect to home page
          //   $state.go('home');
          // },
        });
      })
      .catch(function (err) {
        console.log('error : ', err);
      });
  };

}])

.controller('challengeViewCtrl', ['ChallengeFactory', function (ChallengeFactory) {

  var self = this;

}])

.controller('ButtonsCtrl',['$scope', function ($scope) {

  $scope.radioModel = 'Middle';

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

.controller('challengeEditCtrl', ['ChallengeFactory', function (ChallengeFactory) {

  var self = this;

}]);
