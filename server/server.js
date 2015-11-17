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

// setup and configure database
var db = require(__dirname + '/../database/database.js');

// configure middleware
require(__dirname + '/config/middlewareConfig.js')(app, express);
// configure routes
require(__dirname + '/config/routeConfig.js')(app, express, db);

// choose process port if applicable
var port = process.env.PORT || 3000;

// start server to listen on localhost:port
app.listen(port);
console.log('Challengr is listening on port ', port);
