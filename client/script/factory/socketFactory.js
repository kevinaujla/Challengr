/*

socketFactory.js
wraps used socket functionalities for global access

*/

angular.module('App.socket', [])
  .factory('socket', function ($rootScope) {
    // socket instance
    var socket;
    var configureSocket = function () {
      var firstName = localStorage.getItem('com.challengr.firstName');
      var email = localStorage.getItem('com.challengr.email');
      socket = io.connect({
        query: 'name=' + firstName + '&email=' + email
      });
    };
    return {
      configureSocket: configureSocket,
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  });
