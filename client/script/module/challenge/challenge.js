/*

challenges.js
CRUD for challenges

*/

angular.module('App.challenge', ['ui.bootstrap'])

.controller('challengeNewCtrl', ['createChallengeService', 'challengeFactory', 'braintreeFactory', '$state', function(createChallengeService, challengeFactory, braintreeFactory, $state, $scope) {

  var self = this;

  /*
    Steps Tabs
  */
  self.tabs = [true, false, false];
  self.currentTab = 0;
  /*
    Next Step
  */
  self.nextTab = function(){
    if (self.currentTab < 2) {
      console.log('next tab');
      self.tabs[self.currentTab] = false;
      self.currentTab++;
      self.tabs[self.currentTab] = true;
    }
  };
  /*
    Previous Step
  */
  self.prevTab = function(){
    if (self.currentTab > 0) {
      self.tabs[self.currentTab] = false;
      self.currentTab--;
      self.tabs[self.currentTab] = true;
    }
  };

  /*
    Braintree get token from server to load drop-in UI
  */
  self.getToken = function(){
    // console log
    console.log('get braintree client token...');
    braintreeFactory.getToken()
      .then(function (token) {
        // console log
        console.log('received braintree token...');
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


.controller('challengeStep1Ctrl', ['createChallengeService', function(createChallengeService){

  var self = this;

  self.challengeDescription = '';

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

  /*
    Load all friends from server for the user to filter and choose from for who they want to challenge
  */
  self.loadFriends = function(){
    console.log('loading friends...');
  };

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
    // createChallengeService.challenge.description = self.challengeDescription;
  };

}])

.controller('challengeStep2Ctrl', ['createChallengeService', function(createChallengeService){

  var self = this;

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

  /*
    
  */
  self.saveChallengeInfo = function(){
    // console log
    console.log('add challenge information...');

  };

  self.doSomething = function(){
    console.log('doing something...');
  };

}])

.controller('challengeStep3Ctrl', ['createChallengeService', function(createChallengeService){

  var self = this;

  self.payment = {};

  /*
    
  */
  self.saveChallengeInfo = function(){
    // console log
    console.log('add challenge information...');

  }

}])




.controller('challengeListCtrl', ['challengeFactory', function (challengeFactory) {

  var self = this;

}])

.controller('challengeViewCtrl', ['challengeFactory', function(challengeFactory) {

  var self = this;

}])

.controller('challengeEditCtrl', ['challengeFactory', function (challengeFactory) {

  var self = this;

}]);