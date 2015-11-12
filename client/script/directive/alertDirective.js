/*

alertDirective.js
Show different types of alerts to user

*/

angular.module('App.alertDirective', [])

.directive('alert', function(){

  return {
    restrict : 'E',
    template : '<div class="alert alert-success fade in" ng><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Success!</strong> Your message has been sent successfully.</div>'
  };

});


