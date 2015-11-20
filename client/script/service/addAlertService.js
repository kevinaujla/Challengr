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

  this.addAlert = function() {
    console.log("in service add alert");
    this.alerts.push({type: 'success',msg: 'Challenge Created'});
  };

}]);
