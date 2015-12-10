/*

filter.js
custom filters

*/

angular.module('App.customFilter', [])

.filter('capitalize', [function () {

  return function(input, scope){
    if (input !== null) {
      input = input.toLowerCase();
      return input.substring(0,1).toUpperCase() + input.substring(1);
    }
  }

}]);
