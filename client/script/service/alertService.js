/*

alertService.js
create a alert

*/

angular.module('App.alertService', [])

.service('alertService', ['socket', function (socket) {

  this.alerts = [
    // { type: 'danger', msg: 'Failed To Send Challenge' },
    // { type: 'success', msg: 'Challenge Created' }
  ];

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
