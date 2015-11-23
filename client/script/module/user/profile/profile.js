/*

auth.js
sets up authorization controller

*/

angular.module('App.profile', [])

.controller('profileCtrl', ['authFactory', 'braintreeFactory', '$scope', 's3Factory', function(authFactory, braintreeFactory, $scope, s3Factory) {

  var self = this;
  var transactions = [];

  // on sign in, to get user name and photo
  self.getUserInfo = function(){
    self.username = localStorage.getItem('com.challengr.firstName');
    self.photoURL = localStorage.getItem('com.challengr.photoURL');
  };

  // Retreive user's information and display
  self.getUser = function () {
    self.firstName = localStorage.getItem('com.challengr.firstName');
    self.lastName = localStorage.getItem('com.challengr.lastName');
    self.email = localStorage.getItem('com.challengr.email');
    self.photoURL = localStorage.getItem('com.challengr.photoURL');
    self.location = 'San Francisco'; // temp; to be replaced with database location in future
  };

  // Update user information
  // self.updateUser = function(){

  // };

  $scope.changeProfileImg = function(element){
    console.log('choose new profile image asdf...');
    $scope.$apply(function(scope) {
        var reader = new FileReader();
        reader.readAsDataURL(element.files[0]);

        reader.onload = function(e) {
           // Factory Function
           s3Factory.updatePicture(reader.result, 'profileImg')
             .then(function(imgUrl){
               // Console Log
               console.log('successfully saved to S3...');
               // Show Success
             })
             .catch(function(err){
               console.log('error uploading image : ', err);
             });
        };
        

    });
  };

  // Get all transaction history for user
  self.getBilling = function(){
    braintreeFactory.getTransactions()
      .then(function(data){
        console.log('users billing transactions : ', data.transactions);
        self.transactions = data.transactions;
      })
      .catch(function(err){
        console.log('error retreiving users billing transactions...', err);
      });
  };

  // Sign user out
  self.signout = function(){
    authFactory.signout();
  };

}]);