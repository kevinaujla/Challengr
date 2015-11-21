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
<<<<<<< 51e19294697dbb820ad33bd24b0a9afd64065b00
    Challenge Methods
  ***/

  /* Create challenge */
  self.save = function () {
    // console log
    console.log('create challenge... : ', createChallengeService.challenge);
    // factory function
    challengeFactory.createChallenge(createChallengeService.challenge)
      .then(function (data) {
        console.log('created challenge : ', data);
        // create alert
        alertService.addAlert('success', 'Challenge created');
      })
      .catch(function (err) {
        console.log('error creating challenge... : ', err);
      });
  };

  /***
=======
>>>>>>> [refactor] : take out console logs and add alert service to login
    Braintree Methods
  ***/

  /* Braintree search if customer exists */
  self.searchCustomer = function () {
    braintreeFactory.searchCustomer()
      .then(function (data) {
        console.log('found braintree customer : ', data);
      })
      .catch(function (err) {
        console.log('err searching for braintree customer: ', err);
      });
  };

}])

.controller('challengeStep1Ctrl', ['userFactory', 'createChallengeService', '$scope', function (userFactory, createChallengeService, $scope) {

  var self = this;

  /*
    Load Users from DB
  */
  self.loadFriends = function () {
    userFactory.getAllUsers()
      .then(function (users) {
        console.log('users friends loaded : ', users);
        self.friends = users;
      })
      .catch(function (err) {
        console.log('error loading your friends... ', err);
      });
  };

  $scope.$watch('type', function (val) {
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
    createChallengeService.challenge.challenged = friend;
  };

}])

.controller('challengeStep2Ctrl', ['createChallengeService', 'charityFactory', function (createChallengeService, charityFactory) {

  var self = this;

  self.charities = [];

  /* Choose Charity to donate to */
  self.chooseCharity = function (charity) {
    createChallengeService.challenge.charity = charity;
  };

  /* Get all charities from DB */
  self.getCharity = function(){
    charityFactory.load()
      .then(function(charities){
        console.log('loaded all charities : ', charities);
        self.charities = charities;
      })
      .catch(function(err){
        console.log('error loading charities...');
      });
  };

}])

.controller('challengeStep3Ctrl', ['challengeFactory', 'createChallengeService', '$state', '$scope', '$window', 'braintreeFactory', function (challengeFactory, createChallengeService, $state, $scope, $window, braintreeFactory) {

  var self = this;

  $scope.$watch('amount', function (val) {
    createChallengeService.challenge.charityAmount = val;
  });

  /* Create challenge */
  self.save = function () {
    loadingService.startSpin();
    // factory function
    challengeFactory.createChallenge(createChallengeService.challenge)
      .then(function (data) {
        console.log('created challenge : ', data);
        alertService.addAlert('success', 'Challenge created');
        var challenge = {
          title: createChallengeService.challenge.title,
          challenged: createChallengeService.challenge.challenged
        };
        socket.emit('newChallenge', challenge);
        loadingService.stopSpin();
      })
      .catch(function (err) {
        console.log('error creating challenge... : ', err);
      });
  };

  /* Braintree get token from server to load drop-in UI */
  self.getToken = function () {

    var brainTreeUserID = $window.localStorage.getItem('com.braintree');

    if (brainTreeUserID) {
      braintreeFactory.getToken(brainTreeUserID)
        .then(function (token) {
          console.log('successfully received braintree token');
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
          console.log('error getting braintree token: ', err);
        });
    } else{
      console.log('error getting braintree token from local storage...');
    }

  };

}]);
