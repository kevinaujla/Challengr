/*

socket.js
working with socket.io

 */

module.exports = function (server) {
  // app === express app injected from server.js
  console.log('configuring socket.io');

  var io = require('socket.io')(server);

  io.use(function (socket, next) {
    // check if user was provided by client
    if (socket.handshake.query.email) {
      return next();
    }
    next(new Error('You did not pass the user'));
  });

  var clients = [];
  io.on('connection', function (socket) {
    // console log
    console.log('new client connected: ', socket.handshake.query.name);
    // add connection to clients array
    clients.push({
      socket: socket,
      user: {
        firstName: socket.handshake.query.name,
        email: socket.handshake.query.email
      }
    });

    socket.on('newChallenge', function (challenge) {
      var challenged;
      var challenger;
      // find challenged and challenger
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].user.email === challenge.challenged.email) {
          challenged = clients[i];
        }
        if (clients[i].socket.id === socket.id) {
          challenger = clients[i];
        }
      }

      if (challenged) {
        var message = 'You have got a new Challenge: ' + challenge.title + ' from ' + challenger.user.firstName;
        socket.to(challenged.socket.id).emit('got challenged', message);
      } else {
        console.log('challenged user is not currently online');
      }
    });
    // on disconnect remove socketId from list
    socket.on('disconnect', function () {
      var socketIndex;
      for (var i = 0; i < clients.length; i++) {
        if (clients[i].socket.id === socket.id) {
          socketIndex = i;
        }
      }
      if (socketIndex !== undefined) {
        console.log('client disconnected: ' + clients[socketIndex].user.firstName);
        clients.splice(socketIndex, 1);
      }
    });
  });
};
