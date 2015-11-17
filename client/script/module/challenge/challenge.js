/*

challenges.js
CRUD for challenges

*/

angular.module('App.challenge', [])

.controller('challengeListCtrl', ['challengeFactory', function (challengeFactory) {

  var self = this;

}])

.controller('challengeNewCtrl', ['createChallengeService', 'challengeFactory', 'braintreeFactory', '$state', function(createChallengeService, challengeFactory, braintreeFactory, $state, $scope) {

  var self = this;

  // This is dummy data and needs to be removed once server function works
  self.friends = [
    {
      name : 'Jordan Winkelman',
      img : 'image/profileImg.jpg'
    },
    {
      name : 'Kevin Aujla',
      img : 'image/profileImg2.jpg'
    },
    {
      name : 'Faisal Aujla',
      img : 'image/profileImg2.jpg'
    },
    {
      name : 'Jordan Winkelman',
      img : 'image/profileImg.jpg'
    },
    {
      name : 'Kevin Aujla',
      img : 'image/profileImg2.jpg'
    },
    {
      name : 'Faisal Aujla',
      img : 'image/profileImg2.jpg'
    }
  ];

  self.charities = [
    {
      name : 'Charity Name',
      description : 'Charity description and cause',
      website : 'salvationarmy.com',
      img : 'image/charity/salvationArmy.png'
    },
    {
      name : 'Charity Name',
      description : 'Charity description and cause',
      website : 'salvationarmy.com',
      img : 'image/charity/salvationArmy.png'
    },
    {
      name : 'Charity Name',
      description : 'Charity description and cause',
      website : 'salvationarmy.com',
      img : 'image/charity/salvationArmy.png'
    }
  ];

  self.challengeDescription = '';

  self.payment = {};

  /*
    Add selected friend to create challenge service
  */
  self.addFriend = function(friend){
    // console log
    console.log('add friend to create challenge service : ', friend);
    // argument to service object
    createChallengeService.challenge.friendToChallenge = friend;
    // console log
    console.log('self.challengeDescription : ', self.challengeDescription);
  };

  /*
    Add challenge description, challenge category
  */
  self.saveChallengeInfo = function(){
    // console log
    console.log('add challenge information...');
    // 
    createChallengeService.challenge.description = self.challengeDescription;
  };

  /*
    Load all friends from server for the user to filter and choose from for who they want to challenge
  */
  self.loadFriends = function(){
    console.log('loading friends...');
  };

  /*
    Braintree get token from server to load drop-in UI
  */
  self.getToken = function(){
    // console log
    console.log('get client token...');
    braintreeFactory.getToken()
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

.controller('challengeViewCtrl', ['challengeFactory', function(challengeFactory) {

  var self = this;

}])

.controller('challengeEditCtrl', ['challengeFactory', function (challengeFactory) {

  var self = this;

}]);