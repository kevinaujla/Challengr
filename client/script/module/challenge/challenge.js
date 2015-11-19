/*

challenges.js
CRUD for challenges

*/

angular.module('App.challenge', [])

.controller('challengeNewCtrl', ['createChallengeService', 'challengeFactory', 'braintreeFactory', 'addAlertService','$state', function(createChallengeService, challengeFactory, braintreeFactory, addAlertService, $state, $scope) {

  var self = this;

  /***
    Utility Methods
  ***/

  /* Steps Tabs */
  self.tabs = [true, false, false];
  self.currentTab = 0;
  /* Next Step */
  self.nextTab = function () {
    if (self.currentTab < 2) {
      self.tabs[self.currentTab] = false;
      self.currentTab++;
      self.tabs[self.currentTab] = true;
    }
  };
  /* Previous Step */
  self.prevTab = function () {
    if (self.currentTab > 0) {
      self.tabs[self.currentTab] = false;
      self.currentTab--;
      self.tabs[self.currentTab] = true;
    }
  };

  /***
<<<<<<< 1361b40e293d592277613c13c251068580e6ad44
    Challenge Methods
  ***/

  /* Create challenge */
  self.save = function () {
    // console log
    console.log('create challenge... : ', createChallengeService.challenge);
    addAlertService.addAlert("success","Challenge created");
    // factory function
    challengeFactory.createChallenge(createChallengeService.challenge)
      .then(function (data) {
        console.log('created challenge : ', data);
        //create alert
        // addAlertService.addAlert();
      })
      .catch(function (err) {
        console.log('error creating challenge... : ', err);
      });
  };

  /***
=======
>>>>>>> [refactor] : steps refactored and cleanup code
    Braintree Methods
  ***/

  /* Braintree search if customer exists */
  self.searchCustomer = function () {
    console.log('search braintree customer...');
    braintreeFactory.searchCustomer()
      .then(function (data) {
        console.log('data : ', data);
      })
      .catch(function (err) {
        console.log('err : ', err);
      });
  };

}])

.controller('challengeStep1Ctrl', ['userFactory', 'createChallengeService', '$scope', function (userFactory, createChallengeService, $scope) {

  var self = this;

  /*
    Load Users from DB
  */
  self.loadFriends = function () {
    // console log
    console.log('loading friends...');
    userFactory.getAllUsers()
      .then(function (users) {
        console.log('users loaded : ', users);
        self.friends = users;
      })
      .catch(function (err) {
        console.log('error loading user... ', err);
      });
  };

  $scope.$watch('type', function(val){
    createChallengeService.challenge.type = val;
  });

  $scope.$watch('title', function (val) {
    createChallengeService.challenge.title = val;
  });

  $scope.$watch('description', function (val) {
    createChallengeService.challenge.description = val;
  });

  /*
    Add selected friend to create challenge service
  */
  self.addFriend = function (friend) {
    console.log('friend to challenge added to service object...');
    createChallengeService.challenge.challenged = friend;
  };

}])

.controller('challengeStep2Ctrl', ['createChallengeService', 'charityFactory', function (createChallengeService, charityFactory) {

  var self = this;

  self.charities = [];

  /* Choose Charity to donate to */
  self.chooseCharity = function (charity) {
    console.log('picked charity to add to service object...');
    createChallengeService.challenge.charity = charity;
  };

  /* Get all charities from DB */
  self.getCharity = function(){
    console.log('load all charities...');
    charityFactory.load()
      .then(function(charities){
        console.log('loaded all charities... : ', charities);
        self.charities = charities;
      })
      .catch(function(err){
        console.log('error loading charities : ', err);
      });
  };

}])

.controller('challengeStep3Ctrl', ['challengeFactory', 'createChallengeService', '$state', '$scope', 'braintreeFactory', function (challengeFactory, createChallengeService, $state, $scope, braintreeFactory) {

  var self = this;

  $scope.$watch('amount', function(val){
    createChallengeService.challenge.charityAmount = val;
  });

  /* Create challenge */
  self.save = function () {
    // console log
    console.log('create challenge... : ', createChallengeService.challenge);
    // factory function
    challengeFactory.createChallenge(createChallengeService.challenge)
      .then(function (data) {
        console.log('created challenge : ', data);
      })
      .catch(function (err) {
        console.log('error creating challenge... : ', err);
      });
  };

  /* Braintree get token from server to load drop-in UI */
  self.getToken = function () {
    // console log
    console.log('get braintree client token...');
    braintreeFactory.getToken()
      .then(function (token) {
        // console log
        console.log('successfully received braintree token...');
        // initialize braintree dropin with client token
        braintree.setup(token, 'dropin', {
          container: 'payment-form',
          onPaymentMethodReceived: function (payload) {
            // attach the payment button amount to object
            payload.charityAmount = createChallengeService.challenge.charityAmount;
            // call checkout function
            braintreeFactory.checkout(payload)
              .then(function(){
                console.log('completed checkout...');
                // show success confirmation
                
                // call the save/create challenge function
                self.save();

                // redirect to home page
                $state.go('home');
              })
              .catch(function(err){
                console.log('error making payment... ', err);
              });
          },
        });
      })
      .catch(function (err) {
        console.log('error : ', err);
      });
  };

}]);