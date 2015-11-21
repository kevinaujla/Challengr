/*

loadingService.js
create loading

*/

angular.module('App.loadingService', [])

.service('loadingService', ['usSpinnerService', function (usSpinnerService) {

  this.startSpin = function () {
    if (!this.spinneractive) {
      usSpinnerService.spin('spinner-1');
    }
    this.spinneractive = true;
  };

  this.stopSpin = function () {
    if (this.spinneractive) {
      usSpinnerService.stop('spinner-1');
    }
    this.spinneractive = false;
  };

  this.spinneractive = false;


}]);
