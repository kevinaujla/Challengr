/*

challenges.js
CRUD for challenges

*/

angular.module('App.newChallenge', [])

.controller('challengeNewCtrl', ['userFactory', 'challengeFactory', 'loadingService', 'alertService', 'charityFactory', 'braintreeFactory', '$window', '$state', 'socket', function (userFactory, challengeFactory, loadingService, alertService, charityFactory, braintreeFactory, $window, $state, socket) {

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

  /* Create challenge */
  self.save = function () {
    loadingService.startSpin();
    // factory function
    challengeFactory.createChallenge(self.info)
      .then(function (data) {
        var challenge = {
          title: self.info.title,
          challenged: self.info.challenged
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

              payload.charityAmount = self.info.charityAmount;

              // call checkout function
              braintreeFactory.checkout(payload)
<<<<<<< d990b4822bc39c914755d4d9ea87852b4eef5841
                .then(function () {
                  console.log('completed braintree checkout');
=======
                .then(function(){
                  // console.log('completed braintree checkout');
>>>>>>> [fix]: braintree customer id gets set into local storage properly
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
