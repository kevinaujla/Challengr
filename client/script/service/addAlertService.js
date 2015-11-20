/*

addAlertService.js
create a alert

*/

angular.module('App.addAlertService', [])

.service('addAlertService', [function () {

  this.alerts = [
    // { type: 'danger', msg: 'Failed To Send Challenge' },
    // { type: 'success', msg: 'Challenge Created' }
  ];

  this.addAlert = function(type, msg) {
    this.alerts.push({type:type ,msg: msg});
  };

}]);
