/*

braintreeFactory.js
handles http request for braintree controller

*/

angular.module('App.braintreeFactory', [] )

.factory('braintreeFactory', ['$http', '$window', function($http, $window) {

  var getToken = function(){
    // // get braintree token to get customer id
    var brainTreeUserID = $window.localStorage.getItem('com.braintree');
    console.log('get token with braintree user : ', brainTreeUserID);
    return $http({
      method : 'POST',
      url : '/api/braintree/clientToken',
      data : {id : brainTreeUserID},
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var createCustomer = function(user){
    console.log('create braintree customer...', user);
    return $http({
      method : 'POST',
      url : '/api/braintree/createCustomer',
      data : {user : user},
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var searchCustomer = function(){
    return $http({
      method : 'GET',
      url : '/api/braintree/searchCustomer',
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var checkout = function(payment){
    return $http({
      method : 'POST',
      url : '/api/braintree/checkout',
      data : payment,
    })
    .then(function(resp){
      console.log('transaction : ', resp.data.transaction);
      // store transaction in database
      return $http({
        method : 'POST',
        url : '/api/braintree/transaction',
        data : resp.transaction
      })
      .then(function(resp){
        return resp.data;  
      });

    });
  };

  return {
    getToken : getToken,
    createCustomer : createCustomer,
    searchCustomer : searchCustomer,
    checkout : checkout,
  };

}]);