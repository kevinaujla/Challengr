/*

server.js
express/node server 

*/

// load environment variables from .env file
require('dotenv').load();

// create express app
var express = require('express');
var app = express();

// logging requests to the server
var morgan = require('morgan');
// convenience method for making http requests
var request = require('request');
// module for transforming filepaths
var path = require('path');
// promise library to avoid callback hell
var Promise = require('bluebird');
// module for securely hashing passwords
var bcrypt = require('bcrypt-nodejs');
// parsing HTTP request bodys
var bodyParser = require('body-parser');
// module implementing authO jwt's
var jwt = require('jsonwebtoken');

// choose process port if applicable
var port = process.env.PORT || 3000;
// use dev settings for morgan
app.use(morgan('dev'));
// parses application/x-www-form-urlencoded from forms
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// serving static files from client folder
app.use(express.static(__dirname + '/../client'));

// API endpoint for signup requests
app.post('/api/user/signup', function (req, res) {
  console.log('/api/user/signup is being called with body: ' + req.body);
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
      where: {
        username: username
      }
    })
    .then(function (user) {
      console.log('user with username: ' + username + ' exists: ' + !!user);
      if (user) {
        // let the user know that the username is already taken
        res.json({
          success: false,
          message: 'Username ' + username + ' is already taken'
        });
      } else {
        var hashing = Promise.promisify(bcrypt.hash);

        // hash password and save user to the database
        hashing(password, null, null)
          .then(function (hash) {
            User.create({
                username: username,
                password: hash
              })
              .then(function (user) {
                console.log('user with username: ' + username + 'got created: ' + !!user);
                var token = jwt.sign(user, process.env.TOKEN_SECRET, {
                  expiresInMinutes: 60
                });

                res.json({
                  success: true,
                  message: 'Successfully signed up as ' + username,
                  token: token,
                  user: {
                    username: username
                  }
                });
              });
          });
      }
    });
});

// API endpoint for signin requests
app.post('/api/user/signin', function (req, res) {
  console.log('/api/user/signin is being called with body: ' + req.body);
  var username = req.body.username;
  var password = req.body.password;

  // check if the user exists in the database
  // if yes log the user in and return a token
  // else let the user know that he probably put in a wrong password or username
});

// start server to listen on localhost:port
app.listen(port);
console.log('Challengr is listening on port ', port);
