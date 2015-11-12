/*

server.js
express/node server 

*/

var express = require('express');
// logging requests to the server
var morgan = require('morgan');
// convenience method for making http requests
var request = require('request');
// module for transforming filepaths
var path = require('path');
// promise library to avoid callback hell
var Promise = require('bluebird');

// create express app
var app = express();
// choose process port if applicable
var port = process.env.PORT || 3000;

// use dev settings for morgan
app.use(morgan('dev'));

// serving static files from client folder
app.use(express.static(__dirname + "/../client"));


// API endpoint for signup requests
app.post("/api/signup", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // check if the user exists in the database
  // if yes let the user know that the username already exists
  // else hash the password store the user to the database and return a token 
});

// API endpoint for signin requests
app.post("/api/signin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // check if the user exists in the database
  // if yes log the user in and return a token
  // else let the user know that he probably put in a wrong password or username
});

// start server to listen on localhost:port
app.listen(port);
console.log('Challengr is listening on port ', port);
