/*

server.js
express/node server 

*/

// load environment variables from .env file
require('dotenv').config({
  path: __dirname + '/../.env'
});

var express = require('express');
var app = express();
var server = require('http').createServer(app);

// setup and configure database
var db = require(__dirname + '/../database/database.js');

// configure middleware
require(__dirname + '/config/middlewareConfig.js')(app, express);
// configure routes
require(__dirname + '/config/routeConfig.js')(app, express, db);
// configure socket.io
require(__dirname + '/socket/socket.js')(server);

// choose process port if applicable
var port = process.env.PORT || 3000;

// start server to listen on localhost:port
server.listen(port);
console.log('Listening on port ', port);
