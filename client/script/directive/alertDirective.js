/*

alertDirective.js
Show different types of alerts to user

*/

angular.module('App.alertDirective', [])

.directive('alert', function(){

  return {
    restrict : 'E',
    // templateUrl: './alertDirective.html',
    require : '^ngModel',
    scope : { 
      alertMsg : '=',
      alertMessage: '@'
    },
    template : '<div class="alert alert-success fade in" ng><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Success!</strong> Your message has been sent {{alertMsg}} successfully.</div>',
    link : function($scope, element, attrs){
      element.bind('click', function(){
        console.log('CLICKED ME....');
        console.log('$scope : ', $scope);
        console.log('element : ', element);
        console.log('attrs : ', attrs);
        console.log('from me : ', attrs.alertMessage);
        console.log('from me : ', alertMsg);

      });
    }
  };

});


