/*

alertService.js
create a alert

*/

angular.module('App.alertService', [])

.service('alertService', ['socket', '$timeout', function (socket, $timeout) {

  var self = this;

  self.alerts = [
    // { type: 'danger', msg: 'Failed To Send Challenge', icon : 'icon-budicon-57' },
    // { type: 'success', msg: 'Challenge Created', icon : 'icon-checkbox' }
    // { type: 'notifcation', msg: 'Received Challenge', icon : 'icon-bell-o' }
  ];

  self.addAlert = function (type, msg, icon) {
    self.alerts.push({
      type: type,
      msg: msg,
      icon: icon,
    });
    if (type === 'danger' || type === 'success') {
      $timeout((function (index) {
        return function () {
          self.closeAlert(index);
        };
      })(this.alerts.length - 1), 3000);
    }
  };

  self.closeAlert = function (index) {
    self.alerts.splice(index, 1);
  };

}]);
