/*

socket.js
working with socket.io

 */

module.exports = function (server) {
  // app === express app injected from server.js
  console.log('configuring socket.io');
  var io = require('socket.io')(server);

  var clients = [];
  io.on('connection', function (socket) {
    console.log('new client connected: ' + socket.id);
    clients.push(socket.id);

    // on disconnect remove socketId from list
    socket.on('disconnect', function () {
      var index = clients.indexOf(socket.id);
      if (index != -1) {
        clients.splice(index, 1);
        console.info('remove client with id: ' + socket.id);
      }
    });
  });
};
