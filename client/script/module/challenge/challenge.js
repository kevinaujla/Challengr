/*

challenges.js
CRUD for challenges

*/

angular.module('App.challenge', [])

.controller('challengeNewCtrl', ['createChallengeService', 'challengeFactory', 'braintreeFactory', '$state', function(createChallengeService, challengeFactory, braintreeFactory, $state, $scope) {

  var self = this;

  /***
    Utility Methods
  ***/

  /*
    Steps Tabs
  */
  self.tabs = [true, false, false];
  self.currentTab = 0;
  
  /* Next Step */
  self.nextTab = function(){
    if (self.currentTab < 2) {
      console.log('next tab');
      self.tabs[self.currentTab] = false;
      self.currentTab++;
      self.tabs[self.currentTab] = true;
    }
  };
  /* Previous Step */
  self.prevTab = function(){
    if (self.currentTab > 0) {
      self.tabs[self.currentTab] = false;
      self.currentTab--;
      self.tabs[self.currentTab] = true;
    }
  };

  /***
    Challenge Methods
  ***/

  /* Create challenge */
  self.save = function(){
    // console log
    console.log('create challenge... : ', createChallengeService.challenge);
    // factory function
    challengeFactory.createChallenge(createChallengeService.challenge)
      .then(function(data){
        console.log('created challenge : ', data);
      })
      .catch(function(err){
        console.log('error creating challenge... : ', err);
      });
  };

  /***
    Braintree Methods
  ***/

  /* Braintree get token from server to load drop-in UI */
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

  /* Braintree search if customer exists */
  self.searchCustomer = function(){
    console.log('search braintree customer...');
    braintreeFactory.searchCustomer()
      .then(function(data){
        console.log('data : ', data);
      })
      .catch(function(err){
        console.log('err : ', err);
      });
  }

}])


.controller('challengeStep1Ctrl', ['userFactory', 'createChallengeService', 'radioButtonService', function(userFactory, createChallengeService, radioButtonService){

  var self = this;

  self.title = null;
  self.description = null;
  self.challengeFriend = null;

  /*
    Load all friends from server for the user to filter and choose from for who they want to challenge
  */
  self.loadFriends = function(){
    // console log
    console.log('loading friends...');
    userFactory.getAllUsers()
      .then(function(users){
        console.log('users loaded : ', users);
        self.friends = users;
      })
      .catch(function(err){
        console.log('error loading user... ', err);
      });
  };

  /*
    Add selected friend to create challenge service
  */
  self.addFriend = function(friend){
    // console log
    console.log('friend to challenge chosen...');
    // argument to local variable
    self.challengeFriend = friend;
  };

  /*
    Add information to service object
  */
  self.save = function(){
    // console log
    console.log('add challenge information...');

    // Validate if challenge title has been put in
    if (self.title === null) {
      console.log('title not provided...');
      // display alert/message telling user to fix the problem
    }

    // Validate if challenge description has been put in
    if (self.description === null) {
      console.log('description not provided...');
      // display alert/message telling user to fix the problem
    }

    // Validate if challenge category has been selected
    if (radioButtonService.radio === null) {
      console.log('category not selected...');
      // display alert/message telling user to fix the problem
    }    

    // Validate if friend to challenge has been selected
    if (self.challengeFriend === null) {
      console.log('friend not selected...');
      // display alert/message telling user to fix the problem
    }

    // save to service object
    createChallengeService.challenge.title = self.title;
    createChallengeService.challenge.description = self.description;
    createChallengeService.challenge.type = radioButtonService.radio;
    createChallengeService.challenge.challenged = self.challengeFriend;

    // reset the radio back to empty string so that step3 can use it without interference
    // radioButtonService.radio
    radioButtonService.radio = null;

    // console log
    console.log('createChallengeService.challenge : ', createChallengeService.challenge);
  };

}])

.controller('challengeStep2Ctrl', ['createChallengeService', function(createChallengeService){

  var self = this;

  self.charity = null;

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
    Choose Charity to donate to
  */
  self.chooseCharity = function(charity){
    console.log('pick charity...');
    self.charity = charity;
  };

  /*
    Add information to service object
  */
  self.info = function(){
    // console log
    console.log('add challenge information...');
    if (self.charity === null) {
      console.log('charity not selected...');
    }
    createChallengeService.charity = self.charity;
  };

}])

.controller('challengeStep3Ctrl', ['createChallengeService', 'radioButtonService', function(createChallengeService, radioButtonService){

  var self = this;

  self.charityAmount = null;

  /*
    save info to challenge service object
  */
  self.info = function(){
    // console log
    console.log('add charity amount information...');
    // Validate if challenge category has been selected
    if (radioButtonService.radio === null) {
      console.log('charity amount not selected...');
      // display alert/message telling user to fix the problem
    } 
    // save locally
    self.charityAmount = radioButtonService.radio;
    // save to service object
    createChallengeService.challenge.charityAmount = self.charityAmount;
  };

}]);