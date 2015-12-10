/*

challenges.js
CRUD for challenges

*/

angular.module('App.newChallenge', [])

.controller('challengeNewCtrl', ['userFactory', 'challengeFactory', 'loadingService', 'alertService', 'challengeService', 'charityFactory', 'braintreeFactory', '$window', '$state', 'socket', function (userFactory, challengeFactory, loadingService, alertService, challengeService, charityFactory, braintreeFactory, $window, $state, socket) {

  var self = this;

  /* Braintree search if customer exists */
  self.searchCustomer = function () {
    braintreeFactory.searchCustomer()
      .catch(function (err) {
        console.log('err searching for braintree customer: ', err);
      });
  };

  /*** Step1 Choose Friend ***/

  /* Load Users from DB */
  self.loadFriends = function () {
    userFactory.getAllUsers()
      .then(function (users) {
        self.friends = users;
      })
      .catch(function (err) {
        console.log('error loading your friends... ', err);
      });
  };

  /* Add selected friend to create challenge service */
  self.addFriend = function (friend, index) {
    challengeService.challenge.challenged = friend;
  };

  /*** Step 2 Create Challenge Details ***/
  self.info = {}

  self.submitChallengeDetail = function(){
    // check if everything has been filled out and go to pick a charity step
    challengeService.challenge.info = self.info;
    $state.go('createChallengeCharity');
  }

  /*** Step 3 Choose Charity ***/
  self.charities = [];

  /* Choose Charity to donate to */
  self.chooseCharity = function (charity, index) {
    challengeService.challenge.charity = charity;
    $state.go('createChallengePayment');
  };

  /* Get all charities from DB */
  self.getCharity = function () {
    charityFactory.load()
      .then(function (charities) {
        self.charities = charities;
      })
      .catch(function (err) {
        console.log('error loading charities...');
        alertService.addAlert('danger', 'error loading charities', 'icon-budicon-57');
      });
  };

  /*** Step 4 Payment and Overview ***/

  self.loadFromServiceObj = function(){
    self.info = challengeService.challenge;
  };

  /* Create challenge */
  self.save = function () {
    loadingService.startSpin();
    // factory function
    console.log('before creating challenge : ', challengeService.challenge);
    challengeFactory.createChallenge(challengeService.challenge)
      .then(function (data) {
        console.log('data : ', data);
        var challenge = {
          title: challengeService.challenge.title,
          challenged: challengeService.challenge.challenged
        };
        socket.emit('newChallenge', challenge);
        loadingService.stopSpin();
        alertService.addAlert('success', 'Challenge created', 'icon-checkbox');
      })
      .catch(function (err) {
        console.log('error creating challenge... : ', err);
        alertService.addAlert('danger', err, 'icon-budicon-57');
      });
  };

  /* Braintree get token from server to load drop-in UI */
  self.getToken = function () {
    var brainTreeUserID = $window.localStorage.getItem('com.braintree');
    if (brainTreeUserID) {
      braintreeFactory.getToken(brainTreeUserID)
        .then(function (token) {
          // console.log('successfully received braintree token');
          // initialize braintree dropin with client token
          braintree.setup(token, 'dropin', {
            container: 'payment-form',
            onPaymentMethodReceived: function (payload) {

              console.log('self.info : ', self.info);

              payload.charityAmount = self.info.info.charityAmount;
              challengeService.challenge.info.charityAmount = self.info.info.charityAmount;
              console.log('charity amount : ', payload.charityAmount);
              // call checkout function
              braintreeFactory.checkout(payload)
                .then(function(){
                  // console.log('completed braintree checkout');
                  // call the save/create challenge function
                  self.save();
                  // redirect to home page
                  $state.go('home');
                })
                .catch(function (err) {
                  console.log('error making payment... ', err);
                  alertService.addAlert('danger', 'error making payment', 'icon-budicon-57');
                });
            },
          });
        })
        .catch(function (err) {
          console.log('error getting braintree token: ', err);
          alertService.addAlert('danger', err, 'icon-budicon-57');
        });
    } else {
      console.log('error getting braintree token from local storage...');
      alertService.addAlert('danger', 'error getting braintree token from local storage', 'icon-budicon-57');
    }
  };

}]);
