/*

alertService.js
create a alert

*/

angular.module('App.alertService', [])

.service('alertService', [function () {

  this.alerts = [
    // { type: 'danger', msg: 'Failed To Send Challenge' },
    // { type: 'success', msg: 'Challenge Created' }
  ];
  var firstName = window.localStorage.getItem('com.challengr.firstName');
  var email = window.localStorage.getItem('com.challengr.email');
  var socket = io.connect({
    query: 'name='+firstName+'&email='+email
  });
  this.alertUser = function (challenge) {
    socket.emit('newChallenge', challenge);
  };

  socket.on('gotChallanged', function (msg) {
    this.addAlert('success', msg);
  });

  this.addAlert = function (type, msg) {
    this.alerts.push({
      type: type,
      msg: msg
    });
  };

  this.closeAlert = function (index) {
    this.alerts.splice(index, 1);
  };

}]);
