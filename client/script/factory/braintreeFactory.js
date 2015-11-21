/*

braintreeFactory.js
handles http request for braintree controller

*/

angular.module('App.braintreeFactory', [] )

.factory('braintreeFactory', ['$http', '$window', function($http, $window) {

  var getToken = function(brainTreeUserID){
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
      var transactionData = resp.data.transaction;
      console.log('TRansaction : ', transactionData);
      // store transaction in database
      return $http({
        method : 'POST',
        url : '/api/braintree/transaction',
        data : {transaction : transactionData}
      })
      .then(function(resp){
        return resp.data;  
      });

    });
  };

  var getTransactions = function(){
    return $http({
      method : 'GET',
      url : '/api/braintree/transactions',
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var getAllBraintreeCustomers = function(){
    return $http({
      method : 'GET',
      url : '/api/braintree/customersAll',
    })
    .then(function(resp){
      return resp.data;
    });
  };

  var deleteBraintreeCustomer = function(id){
    console.log('id : ', id);
    return $http({
      method : 'POST',
      url : '/api/braintree/customerDelete',
      data : {user_id: id}
    })
    .then(function(resp){
      return resp.data;
    });
  };

  return {
    getToken : getToken,
    createCustomer : createCustomer,
    searchCustomer : searchCustomer,
    checkout : checkout,
    getTransactions : getTransactions,
    getAllBraintreeCustomers : getAllBraintreeCustomers,
    deleteBraintreeCustomer : deleteBraintreeCustomer,
  };

}]);