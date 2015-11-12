/*

server.js
express/node server 

*/

var express = require('express');
var morgan = require('morgan');
var request = require('request');

var path = require('path');

var Promise = require('bluebird');
var app = express();
var port = process.env.PORT || 3000;

app.use(morgan('dev')); 

app.use(express.static(__dirname + "/../client"));



app.listen(port);
console.log('Challengr is listening on port ', port);

app.post("/api/signup", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // check if the user exists in the database
  // if yes let the user know that the username already exists
  // else hash the password store the user to the database and return a token 

});


app.post("/api/signin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // check if the user exists in the database
  // if yes log the user in and return a token
  // else let the user know that he probably put in a wrong password or username
});
