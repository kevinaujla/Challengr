/*

alertService.js
create a alert

*/

angular.module('App.alertService', [])

.service('alertService', ['socket', function (socket) {

  this.alerts = [
    // { type: 'danger', msg: 'Failed To Send Challenge', icon : 'icon-budicon-57' },
    // { type: 'success', msg: 'Challenge Created', icon : 'icon-checkbox' }
    // { type: 'success', msg: 'Received Challenge', icon : 'icon-bell-o' }
  ];

  this.addAlert = function (type, msg, icon) {
    this.alerts.push({
      type: type,
      msg: msg,
      icon: icon,
    });
  };

  this.closeAlert = function (index) {
    this.alerts.splice(index, 1);
  };

}]);
