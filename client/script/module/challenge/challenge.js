/*

challenges.js
CRUD for challenges

*/

angular.module('App.challenge', [])

.controller('challengeNewCtrl', ['userFactory', 'challengeFactory', 'loadingService', 'alertService', 'charityFactory', 'braintreeFactory', '$window', '$state', 'socket', function(userFactory, challengeFactory, loadingService, alertService, charityFactory, braintreeFactory, $window, $state, socket) {

  var self = this;

  self.info = {};

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

  /*** Step1 ***/
  self.selectedFriend = null;

  /* Load Users from DB */
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

  /* Add selected friend to create challenge service */
  self.addFriend = function (friend, index) {
    self.info.challenged = friend;
    self.selectedFriend = index;
  };

  /*** Step 2 ***/
  self.charities = [];
  self.selectedIndex = null;

  /* Choose Charity to donate to */
  self.chooseCharity = function (charity, index) {
    self.info.charity = charity;
    self.selectedIndex = index;
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

  /* Create challenge */
  self.save = function () {
    loadingService.startSpin();
    // factory function
    challengeFactory.createChallenge(self.info)
      .then(function (data) {
        console.log('created challenge...');
        alertService.addAlert('success', 'Challenge created');
        var challenge = {
          title: self.info.title,
          challenged: self.info.challenged
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

              console.log('self.info : ', self.info);
              payload.charityAmount = self.info.charityAmount;

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