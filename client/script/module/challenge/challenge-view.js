/*

challenges.js
Challenges in newsfeed view

*/

angular.module('App.challengeView', [])

.controller('challengeViewCtrl', ['challengeFactory', '$stateParams', 'challengeService', 'alertService', function (challengeFactory, $stateParams, challengeService, alertService) {

<<<<<<< 53b62c0afd9ee6284948855c837baafdbb4b9fec
  var self = this;
  self.challenge = null;
  self.isCurrentUserChallenge = false;
  var currentUserEmail = localStorage.getItem('com.challengr.email');

  // Read the challenge id from the service object to retreive the correct challenge by it's ID
  self.readChallenge = function () {
    for (var i = 0; i < challengeService.challenges.length; i++) {
      if (challengeService.challenges[i].id == $stateParams.id) {
        self.challenge = challengeService.challenges[i];
        if (currentUserEmail === self.challenge.Challenged.email && !self.challenge.notCompleted && !self.challenge.completed) {
          self.isCurrentUserChallenge = true;
        }
        return;
      }
    }
  };

  self.increaseLike = function () {
    var updateObj = {
      id: self.challenge.id,
      likes: ++self.challenge.likes
    };
    challengeFactory.updateChallenge(updateObj)
      .catch(function (err) {
        console.log('error increasing like : ', err);
      });
  };

  self.completed = function () {
    self.challenge.completed = true;
    alertService.addAlert('success', 'Successfuly marked challenge completed', 'icon-checkbox');
    var updateObj = {
      id: self.challenge.id,
      completed: true
    };
    challengeFactory.updateChallenge(updateObj)
      .catch(function (err) {
        console.log('error updating completion status');
      });
  };

}]);
=======
 var self = this;
 self.challenge = null;
 self.isCurrentUserChallenge = false;
 var currentUserEmail = localStorage.getItem('com.challengr.email');

 // Read the challenge id from the service object to retreive the correct challenge by it's ID
 self.readChallenge = function () {
   for (var i = 0; i < challengeService.challenges.length; i++) {
     if (challengeService.challenges[i].id == $stateParams.id) {
       self.challenge = challengeService.challenges[i];
       if (currentUserEmail === self.challenge.Challenged.email && !self.challenge.notCompleted && !self.challenge.completed) {
         self.isCurrentUserChallenge = true;
       }
       return;
     }
   }
 };

 self.increaseLike = function () {
   var updateObj = {
     id: self.challenge.id,
     likes: ++self.challenge.likes
   };
   challengeFactory.updateChallenge(updateObj)
     .catch(function (err) {
       console.log('error increasing like : ', err);
     });
 };

 self.completed = function () {
   self.challenge.completed = true;
   alertService.addAlert('success', 'Successfuly marked challenge completed', 'icon-checkbox');
   var updateObj = {
     id: self.challenge.id,
     completed: true
   };
   challengeFactory.updateChallenge(updateObj)
     .catch(function (err) {
       console.log('error updating completion status');
     });
 };

}]);
>>>>>>> [refactor]: styling newsfeed, user challenges, and detail challenges
